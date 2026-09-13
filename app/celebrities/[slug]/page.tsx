"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star, ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/sidebar";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { CELEBRITIES, getCelebrityBySlug } from "@/lib/celebrities";
import { BLUR_DATA_URL, PROFILE_SIZES, CARD_SIZES } from "@/lib/image-utils";
import { VERIFIED_TESTIMONIALS } from "@/lib/testimonials";
import { submitComment, getApprovedComments, type ApprovedComment } from "./actions";

export default function CelebrityProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const celeb = getCelebrityBySlug(slug);

  if (!celeb) {
    notFound();
  }

  const prev = CELEBRITIES[celeb.sortOrder - 2];
  const next = CELEBRITIES[celeb.sortOrder];
  const celebSlug = celeb.slug;

  // Approved comments (fetched from the database via a Server Action)
  const [comments, setComments] = React.useState<ApprovedComment[]>([]);
  const [commentsLoading, setCommentsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    getApprovedComments(celebSlug).then((result) => {
      if (!cancelled) {
        setComments(result);
        setCommentsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [celebSlug]);

  // Comment form state
  const [commentForm, setCommentForm] = React.useState({
    body: "",
    name: "",
    email: "",
    website: "",
  });
  const [commentErrors, setCommentErrors] = React.useState<Record<string, string>>({});
  const [commentSubmitting, setCommentSubmitting] = React.useState(false);
  const [commentStatus, setCommentStatus] = React.useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  function validateCommentForm(): boolean {
    const errs: Record<string, string> = {};
    if (commentForm.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (commentForm.name.length > 100) errs.name = "Name is too long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentForm.email)) errs.email = "Please enter a valid email address";
    if (commentForm.website && !/^https?:\/\/.+/i.test(commentForm.website)) {
      errs.website = "Website must start with http:// or https://";
    }
    if (commentForm.body.trim().length < 5) errs.body = "Comment must be at least 5 characters";
    if (commentForm.body.length > 2000) errs.body = "Comment is too long (max 2000 characters)";
    setCommentErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateCommentForm()) return;
    setCommentSubmitting(true);
    setCommentStatus(null);

    const result = await submitComment({
      celebritySlug: celebSlug,
      authorName: commentForm.name,
      authorEmail: commentForm.email,
      authorWebsite: commentForm.website,
      body: commentForm.body,
    });

    setCommentSubmitting(false);

    if (result.success) {
      setCommentStatus({
        type: "success",
        message: "Thank you! Your comment has been submitted and will appear once an admin reviews it.",
      });
      setCommentForm({ body: "", name: "", email: "", website: "" });
    } else {
      setCommentStatus({ type: "error", message: result.error });
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href="/celebrities"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to directory
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card p-6 sm:flex-row"
          >
            {/* Photo */}
            {celeb.photoUrl ? (
              <div className="relative size-32 shrink-0 overflow-hidden rounded-xl sm:size-40">
                <Image
                  src={celeb.photoUrl}
                  alt={celeb.name}
                  fill
                  sizes={PROFILE_SIZES}
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="size-32 shrink-0 rounded-xl bg-gradient-to-br from-secondary to-muted/50 sm:size-40" />
            )}
            <div className="flex flex-1 flex-col">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {celeb.name}
              </h1>
              <p className="mt-1 text-muted-foreground">{celeb.profession}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {celeb.subCategories.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">(5.0)</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>📍 {celeb.nationality}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  Born {celeb.birthYear}
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href={`/book-a-celebrity?celebrity=${celeb.slug}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Book This Celebrity
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Contact for Fees & Availability
            </Link>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="font-heading text-xl font-bold text-foreground">
              About {celeb.name.split(" ")[0]}
            </h2>
            <Separator className="my-4" />
            <p className="leading-relaxed text-muted-foreground">{celeb.bio}</p>
            <a
              href={celeb.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-80"
            >
              Read more on Wikipedia <ExternalLink className="size-3.5" />
            </a>
          </motion.div>

          {/* Photo Gallery */}
          {celeb.galleryImages && celeb.galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-8"
            >
              <h2 className="font-heading text-xl font-bold text-foreground">
                Photos
              </h2>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {celeb.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-border/60"
                  >
                    <Image
                      src={img}
                      alt={`${celeb.name} — photo ${idx + 1}`}
                      fill
                      sizes={CARD_SIZES}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10"
          >
            <h2 className="font-heading text-xl font-bold text-foreground">
              Reviews
            </h2>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border/60 bg-card p-4">
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  &ldquo;{VERIFIED_TESTIMONIALS[celeb.sortOrder % VERIFIED_TESTIMONIALS.length].text}&rdquo;
                </p>
                <footer className="mt-2 text-xs font-medium text-foreground">
                  — {VERIFIED_TESTIMONIALS[celeb.sortOrder % VERIFIED_TESTIMONIALS.length].name}, {new Date(VERIFIED_TESTIMONIALS[celeb.sortOrder % VERIFIED_TESTIMONIALS.length].date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                </footer>
              </div>
            </div>
          </motion.div>

          {/* Comments section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-10"
          >
            <h2 className="font-heading text-xl font-bold text-foreground">
              {commentsLoading ? "Comments" : `${comments.length} Comment${comments.length === 1 ? "" : "s"}`}
            </h2>
            <Separator className="my-4" />

            {/* Approved comments list */}
            {!commentsLoading && comments.length > 0 && (
              <div className="mb-8 flex flex-col gap-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border border-border/60 bg-card p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {comment.authorWebsite ? (
                          <a
                            href={comment.authorWebsite}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="hover:text-primary hover:underline"
                          >
                            {comment.authorName}
                          </a>
                        ) : (
                          comment.authorName
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
            {!commentsLoading && comments.length === 0 && (
              <p className="mb-8 text-sm text-muted-foreground">
                No comments yet. Be the first to leave one below.
              </p>
            )}

            <h3 className="font-heading text-lg font-bold text-foreground">Leave a Reply</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your comment will be reviewed by our team before it appears publicly.
            </p>
            <form onSubmit={handleCommentSubmit} noValidate className="mt-4 flex flex-col gap-3">
              <div>
                <textarea
                  required
                  minLength={5}
                  maxLength={2000}
                  value={commentForm.body}
                  onChange={(e) => setCommentForm((f) => ({ ...f, body: e.target.value }))}
                  placeholder="Your comment..."
                  className={`h-24 w-full rounded-lg border bg-card p-3 text-sm text-foreground outline-none focus:border-primary ${
                    commentErrors.body ? "border-destructive" : "border-border"
                  }`}
                />
                {commentErrors.body && (
                  <p className="mt-1 text-xs text-destructive">{commentErrors.body}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={commentForm.name}
                    onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Name *"
                    className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground outline-none focus:border-primary ${
                      commentErrors.name ? "border-destructive" : "border-border"
                    }`}
                  />
                  {commentErrors.name && (
                    <p className="mt-1 text-xs text-destructive">{commentErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={commentForm.email}
                    onChange={(e) => setCommentForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="Email *"
                    className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground outline-none focus:border-primary ${
                      commentErrors.email ? "border-destructive" : "border-border"
                    }`}
                  />
                  {commentErrors.email && (
                    <p className="mt-1 text-xs text-destructive">{commentErrors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="url"
                  value={commentForm.website}
                  onChange={(e) => setCommentForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="Website (optional)"
                  className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground outline-none focus:border-primary ${
                    commentErrors.website ? "border-destructive" : "border-border"
                  }`}
                />
                {commentErrors.website && (
                  <p className="mt-1 text-xs text-destructive">{commentErrors.website}</p>
                )}
              </div>

              {commentStatus && (
                <p
                  className={`text-sm ${
                    commentStatus.type === "success" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {commentStatus.message}
                </p>
              )}

              <button
                type="submit"
                disabled={commentSubmitting}
                className="h-10 w-fit rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-60"
              >
                {commentSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-10 flex flex-col gap-3 rounded-2xl border border-border/60 bg-gradient-to-br from-secondary/30 to-transparent p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                Ready to book {celeb.name}?
              </h3>
              <p className="text-sm text-muted-foreground">
                Contact us now to check availability and pricing.
              </p>
            </div>
            <Link
              href={`/book-a-celebrity?celebrity=${celeb.slug}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Book Now <ArrowLeft className="size-4 rotate-180" />
            </Link>
          </motion.div>

          {/* Post navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            {prev ? (
              <Link
                href={`/celebrities/${prev.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                <span className="truncate">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/celebrities/${next.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="truncate">{next.name}</span>
                <ArrowLeft className="size-4 rotate-180" />
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="mt-8">
            <DisclaimerBlock />
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
