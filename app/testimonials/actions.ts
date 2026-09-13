"use server";

import { z } from "zod";
import { db } from "@/src/prisma/db";
import { actionsLogger, dbLogger } from "@/lib/logger";

const testimonialSchema = z.object({
  authorName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  authorEmail: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  rating: z.number().int().min(1, "Please select a rating").max(5, "Rating must be 1–5"),
  body: z.string().min(10, "Please write at least 10 characters").max(2000, "Testimonial is too long (max 2000 characters)"),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type SubmitTestimonialResult =
  | { success: true }
  | { success: false; error: string };

export type ApprovedTestimonial = {
  id: number;
  authorName: string;
  body: string;
  rating: number;
  createdAt: string;
};

/**
 * Submit a new testimonial. Stored with `status: "pending"` — never shown
 * publicly until an admin approves it.
 */
export async function submitTestimonial(input: TestimonialInput): Promise<SubmitTestimonialResult> {
  actionsLogger.info({ authorName: input.authorName, rating: input.rating }, "Testimonial submission received");

  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) {
    actionsLogger.warn({ issues: parsed.error.issues }, "Testimonial validation failed");
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { authorName, authorEmail, rating, body } = parsed.data;

  try {
    dbLogger.debug({ email: authorEmail }, "Upserting Customer row");
    const customer = await db.orm.public.Customer.select("id").upsert({
      create: {
        name: authorName,
        email: authorEmail,
      },
      update: {},
    });

    let educator = await db.orm.public.Educator.select("id")
      .where((e) => e.slug.eq("ashencrest-platform"))
      .first();

    if (!educator) {
      dbLogger.debug("Creating platform Educator row");
      educator = await db.orm.public.Educator.create({
        name: "Ashencrest Platform",
        slug: "ashencrest-platform",
        profession: "Platform",
        status: "published",
        featured: false,
        sortOrder: 0,
        currency: "USD",
      });
    }

    dbLogger.debug({ educatorId: educator.id, customerId: customer.id }, "Creating pending Review");
    await db.orm.public.Review.create({
      educatorId: educator.id,
      customerId: customer.id,
      rating,
      body,
      status: "pending",
    });

    actionsLogger.info({ educatorId: educator.id, customerId: customer.id, rating }, "Testimonial submitted successfully (pending review)");
    return { success: true };
  } catch (err) {
    actionsLogger.error({ err, authorName }, "submitTestimonial failed");
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

/**
 * Fetches only admin-approved testimonials, newest first.
 */
export async function getApprovedTestimonials(): Promise<ApprovedTestimonial[]> {
  try {
    actionsLogger.debug("Fetching approved testimonials");

    const educator = await db.orm.public.Educator.select("id")
      .where((e) => e.slug.eq("ashencrest-platform"))
      .first();

    if (!educator) {
      actionsLogger.debug("No platform Educator row found (no testimonials yet)");
      return [];
    }

    const reviews = await db.orm.public.Review.select("id", "rating", "body", "createdAt", "customerId")
      .where((r) => r.educatorId.eq(educator.id))
      .where((r) => r.status.eq("approved"))
      .orderBy((r) => r.createdAt.desc())
      .all();

    const result: ApprovedTestimonial[] = [];
    for (const review of reviews) {
      const customer = await db.orm.public.Customer.select("name")
        .where((c) => c.id.eq(review.customerId))
        .first();
      result.push({
        id: review.id,
        authorName: customer?.name ?? "Verified Client",
        body: review.body ?? "",
        rating: review.rating,
        createdAt: String(review.createdAt),
      });
    }

    actionsLogger.info({ count: result.length }, "Approved testimonials fetched");
    return result;
  } catch (err) {
    actionsLogger.error({ err }, "getApprovedTestimonials failed");
    return [];
  }
}
