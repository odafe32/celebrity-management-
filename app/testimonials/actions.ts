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
    const customer = await db.customer.upsert({
      where: { email: authorEmail },
      create: { name: authorName, email: authorEmail },
      update: {},
    });

    let educator = await db.educator.findFirst({
      where: { slug: "ashencrest-platform" },
    });

    if (!educator) {
      dbLogger.debug("Creating platform Educator row");
      educator = await db.educator.create({
        data: {
          name: "Ashencrest Platform",
          slug: "ashencrest-platform",
          profession: "Platform",
          status: "published",
          featured: false,
          sortOrder: 0,
          currency: "USD",
        },
      });
    }

    dbLogger.debug({ educatorId: educator.id, customerId: customer.id }, "Creating pending Review");
    await db.review.create({
      data: {
        educatorId: educator.id,
        customerId: customer.id,
        rating,
        body,
        status: "pending",
      },
    });

    actionsLogger.info({ educatorId: educator.id, customerId: customer.id, rating }, "Testimonial submitted successfully (pending review)");
    return { success: true };
  } catch (err) {
    actionsLogger.error({ err, authorName }, "submitTestimonial failed");
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function getApprovedTestimonials(): Promise<ApprovedTestimonial[]> {
  try {
    actionsLogger.debug("Fetching approved testimonials");

    const educator = await db.educator.findFirst({
      where: { slug: "ashencrest-platform" },
    });

    if (!educator) {
      actionsLogger.debug("No platform Educator row found (no testimonials yet)");
      return [];
    }

    const reviews = await db.review.findMany({
      where: { educatorId: educator.id, status: "approved" },
      orderBy: { createdAt: "desc" },
      include: { customer: { select: { name: true } } },
    });

    const result: ApprovedTestimonial[] = reviews.map((review) => ({
      id: review.id,
      authorName: review.customer?.name ?? "Verified Client",
      body: review.body ?? "",
      rating: review.rating,
      createdAt: String(review.createdAt),
    }));

    actionsLogger.info({ count: result.length }, "Approved testimonials fetched");
    return result;
  } catch (err) {
    actionsLogger.error({ err }, "getApprovedTestimonials failed");
    return [];
  }
}
