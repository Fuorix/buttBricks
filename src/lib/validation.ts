import { z } from 'zod';

/** Zod schemas shared by the admin forms (client hints) and server actions (authoritative). */

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  width: z.number().optional(),
  height: z.number().optional(),
});

const featureSchema = z.object({
  icon: z.string().trim().min(1, 'Icon is required'),
  label: z.string().trim().min(1, 'Label is required'),
  text: z.string().trim().min(1, 'Text is required'),
});

const specSchema = z.object({
  spec: z.string().trim().min(1, 'Specification is required'),
  detail: z.string().trim().min(1, 'Detail is required'),
  unit: z.string().trim().default(''),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  slug: z.string().trim().regex(slugRegex, 'Use lowercase letters, numbers and hyphens only'),
  description: z.string().trim().max(500).default(''),
  order: z.coerce.number().int().min(0).default(0),
});

export const productSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(120),
  slug: z.string().trim().regex(slugRegex, 'Use lowercase letters, numbers and hyphens only'),
  sku: z.string().trim().max(40).default(''),
  categoryId: z.string().trim().min(1, 'Choose a category'),
  tagline: z.string().trim().max(200).default(''),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(1000),
  badge: z
    .string()
    .trim()
    .max(30)
    .transform((v) => (v ? v : null)),
  isFeatured: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),
  coverImage: imageSchema.nullable(),
  images: z.array(imageSchema).default([]),
  features: z.array(featureSchema).max(6).default([]),
  narrative: z.array(z.string().trim().min(1)).max(10).default([]),
  specs: z.array(specSchema).max(20).default([]),
  relatedIds: z.array(z.string().min(1)).max(6).default([]),
});

export type ProductFormValues = z.input<typeof productSchema>;
export type CategoryFormValues = z.input<typeof categorySchema>;

/** Flatten a Zod error into { fieldPath: firstMessage }. */
export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_form';
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
