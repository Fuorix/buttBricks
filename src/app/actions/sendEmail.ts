"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "fa-2023-bscs-261@lgu.edu.pk";
const FROM_EMAIL = "onboarding@resend.dev";

export async function sendInquiry(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("sendInquiry error:", error);
    return { success: false };
  }
}

// ── Contact page form (name, company, projectType, message) ────────────────
export async function sendProjectBrief(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const projectType = formData.get("projectType") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Project Brief from ${name} — ${projectType}`,
      html: `
        <h2>New Project Brief</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("sendProjectBrief error:", error);
    return { success: false };
  }
}