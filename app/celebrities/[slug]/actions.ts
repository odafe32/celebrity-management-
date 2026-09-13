"use server";

import { z } from "zod";
import { db } from "@/src/prisma/db";
import { getCelebrityBySlug } from "@/lib/celebrities";
import { actionsLogger, dbLogger } from "@/lib/logger";

const commentSchema = z.object({
  celebritySlug: z.string().min(1),
  authorName: z.string().min(2, "Name must be at least 2 characters").max(100),
  authorEmail: z.string().min(1, "Email is required").email("Please enter a valid email"),
  authorWebsite: z
    .string()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^https?:\/\/.+/i.test(val),
      "Website must be a valid URL starting with http:// or https://"
    ),
  body: z.string().min(5, "Comment must be at least 5 characters").max(2000, "Comment is too long"),
});

export type CommentInput = z.infer<typeof commentSchema>;

export type SubmitCommentResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Ensures an Educator row exists for the given celebrity slug (upserting
 * from the static roster data), then creates a Comment linked to it with
 * `status: "pending"`. Pending comments are never shown publicly until an
 * admin approves them.
 */
export async function submitComment(input: CommentInput): Promise<SubmitCommentResult> {
  actionsLogger.info({ celebritySlug: input.celebritySlug, authorName: input.authorName }, "Comment submission received");

  const parsed = commentSchema.safeParse(input);
  if (!parsed.success) {
    actionsLogger.warn({ issues: parsed.error.issues }, "Comment validation failed");
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { celebritySlug, authorName, authorEmail, authorWebsite, body } = parsed.data;

  const celeb = getCelebrityBySlug(celebritySlug);
  if (!celeb) {
    actionsLogger.warn({ celebritySlug }, "Celebrity not found in static roster");
    return { success: false, error: "Celebrity not found" };
  }

  try {
    dbLogger.debug({ slug: celeb.slug }, "Upserting Educator row");
    const educator = await db.orm.public.Educator.select("id").upsert({
      create: {
        name: celeb.name,
        slug: celeb.slug,
        profession: celeb.profession,
        photoUrl: celeb.photoUrl || null,
        bio: celeb.bio,
        extLink: celeb.wikiUrl,
        status: "published",
        featured: celeb.featured,
        sortOrder: celeb.sortOrder,
        currency: celeb.currency,
      },
      update: {},
    });

    dbLogger.debug({ educatorId: educator.id }, "Creating pending Comment");
    await db.orm.public.Comment.create({
      educatorId: educator.id,
      authorName,
      authorEmail,
      authorWebsite: authorWebsite || null,
      body,
      status: "pending",
    });

    actionsLogger.info({ educatorId: educator.id, celebritySlug }, "Comment submitted successfully (pending review)");
    return { success: true };
  } catch (err) {
    actionsLogger.error({ err, celebritySlug }, "submitComment failed");
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export type ApprovedComment = {
  id: number;
  authorName: string;
  authorWebsite: string | null;
  body: string;
  createdAt: string;
};

/**
 * Fetches only admin-approved comments for a celebrity, newest first.
 * Pending and spam comments are never returned by this function.
 */
export async function getApprovedComments(celebritySlug: string): Promise<ApprovedComment[]> {
  actionsLogger.debug({ celebritySlug }, "Fetching approved comments");

  const celeb = getCelebrityBySlug(celebritySlug);
  if (!celeb) {
    actionsLogger.warn({ celebritySlug }, "getApprovedComments: celebrity not found");
    return [];
  }

  const educatorRow = await db.orm.public.Educator.select("id")
    .where((e) => e.slug.eq(celeb.slug))
    .first();

  if (!educatorRow) {
    actionsLogger.debug({ celebritySlug }, "No Educator row found (no comments yet)");
    return [];
  }

  const comments = await db.orm.public.Comment.select("id", "authorName", "authorWebsite", "body", "createdAt")
    .where((c) => c.educatorId.eq(educatorRow.id))
    .where((c) => c.status.eq("approved"))
    .orderBy((c) => c.createdAt.desc())
    .all();

  actionsLogger.info({ celebritySlug, count: comments.length }, "Approved comments fetched");
  return comments.map((c) => ({
    id: c.id,
    authorName: c.authorName,
    authorWebsite: c.authorWebsite,
    body: c.body,
    createdAt: String(c.createdAt),
  }));
}
