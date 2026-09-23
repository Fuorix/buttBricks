"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

/**
 * Contact form handlers.
 *
 * Addresses come from the environment so the site can be handed over without
 * a code change. CONTACT_TO_EMAIL is where inquiries land; CONTACT_FROM_EMAIL
 * must be an address on a domain verified in Resend, otherwise Resend will
 * only deliver to the account owner's own inbox.
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

export interface ContactResult {
  success: boolean;
  /** Present on failure; safe to show to the visitor. */
  error?: string;
}

const GENERIC_ERROR =
  "We could not send your message. Please try again, or call us directly.";

/* ── Input hardening ──────────────────────────────────────────────────── */

const LIMITS = { name: 120, phone: 40, company: 160, projectType: 80, message: 4000 };

/** Escape user input before it goes into the email HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(formData: FormData, key: keyof typeof LIMITS): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim().slice(0, LIMITS[key]) : "";
}

/** Strip CR/LF so user input cannot inject extra email headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 150);
}

/**
 * Bots fill in every field they find. A field hidden from humans that comes
 * back populated is a bot, so the submission is dropped and reported as sent.
 */
function isBot(formData: FormData): boolean {
  const honeypot = formData.get("company_website");
  return typeof honeypot === "string" && honeypot.trim() !== "";
}

/**
 * Per-IP throttle. This is in-process memory, so on serverless it only covers
 * one warm instance. It blunts casual flooding; a WAF or Turnstile is the
 * answer if the form is ever targeted properly.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

async function clientIp(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return store.get("x-real-ip") ?? "unknown";
}

async function rateLimited(): Promise<boolean> {
  const ip = await clientIp();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key || !TO_EMAIL) {
    console.error(
      "Contact form is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL."
    );
    return null;
  }
  return new Resend(key);
}

async function deliver(subject: string, html: string): Promise<ContactResult> {
  const resend = resendClient();
  if (!resend) return { success: false, error: GENERIC_ERROR };

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL as string,
      subject: headerSafe(subject),
      html,
    });
    if (error) {
      console.error("Resend rejected the message:", error);
      return { success: false, error: GENERIC_ERROR };
    }
    return { success: true };
  } catch (error) {
    console.error("sendEmail error:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

/* ── Home page quote form (name, phone, message) ──────────────────────── */

export async function sendInquiry(formData: FormData): Promise<ContactResult> {
  if (isBot(formData)) return { success: true };
  if (await rateLimited()) {
    return { success: false, error: "Too many messages. Please try again shortly." };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const message = field(formData, "message");

  if (!name || !phone || !message) {
    return { success: false, error: "Please complete every required field." };
  }

  return deliver(
    `New Inquiry from ${name}`,
    `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `
  );
}

/* ── Contact page form (name, company, projectType, message) ──────────── */

export async function sendProjectBrief(formData: FormData): Promise<ContactResult> {
  if (isBot(formData)) return { success: true };
  if (await rateLimited()) {
    return { success: false, error: "Too many messages. Please try again shortly." };
  }

  const name = field(formData, "name");
  const company = field(formData, "company");
  const projectType = field(formData, "projectType");
  const message = field(formData, "message");

  if (!name || !message) {
    return { success: false, error: "Please complete every required field." };
  }

  return deliver(
    `Project Brief from ${name}${projectType ? ` — ${projectType}` : ""}`,
    `
      <h2>New Project Brief</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `
  );
}
