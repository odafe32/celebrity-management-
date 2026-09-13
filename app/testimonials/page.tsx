"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { VERIFIED_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import {
  submitTestimonial,
  getApprovedTestimonials,
  type ApprovedTestimonial,
} from "./actions";

export default function TestimonialsPage() {
  const [approved, setApproved] = React.useState<ApprovedTestimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    getApprovedTestimonials().then((result) => {
      if (!cancelled) {
        setApproved(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Combine approved real testimonials from DB with verified testimonials
  const allTestimonials: Testimonial[] = [
    ...approved.map((t) => ({
      id: `real-${t.id}`,
      name: t.authorName,
      date: t.createdAt,
      text: t.body,
      rating: t.rating,
      source: "verified" as const,
      isSample: false,
    })),
    ...VERIFIED_TESTIMONIALS,
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Testimonials
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Real feedback from clients who booked celebrities through Ashencrest.
          Every review is verified by our team before it appears here.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-8 rounded-xl border border-border/60 bg-card p-6"
      >
        <div className="text-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading ? "Loading…" : `${approved.length + VERIFIED_TESTIMONIALS.length} verified review${(approved.length + VERIFIED_TESTIMONIALS.length) === 1 ? "" : "s"}`}
          </p>
        </div>
      </motion.div>

      {/* Testimonials grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTestimonials.map((t, idx) => (
          <motion.blockquote
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
            className={`flex flex-col rounded-xl border bg-card p-5 ${
              t.isSample ? "border-dashed border-border/60 opacity-70" : "border-border/60"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              {t.isSample ? (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  Sample
                </span>
              ) : (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  Verified
                </span>
              )}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.text}&rdquo;
            </p>
            <footer className="mt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{t.name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(t.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </footer>
          </motion.blockquote>
        ))}
      </div>

      {/* Submit testimonial form */}
      <TestimonialForm />

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}

function TestimonialForm() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    rating: 5,
    body: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<
    { type: "success" | "error"; message: string } | null
  >(null);
  const [hoverRating, setHoverRating] = React.useState(0);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (form.name.length > 100) errs.name = "Name is too long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email address";
    if (form.rating < 1 || form.rating > 5) errs.rating = "Please select a rating";
    if (form.body.trim().length < 10) errs.body = "Please write at least 10 characters";
    if (form.body.length > 2000) errs.body = "Testimonial is too long (max 2000 characters)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);

    const result = await submitTestimonial({
      authorName: form.name,
      authorEmail: form.email,
      rating: form.rating,
      body: form.body,
    });

    setSubmitting(false);

    if (result.success) {
      setStatus({
        type: "success",
        message: "Thank you! Your testimonial has been submitted and will appear once an admin reviews it.",
      });
      setForm({ name: "", email: "", rating: 5, body: "" });
    } else {
      setStatus({ type: "error", message: result.error });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-12 rounded-xl border border-border/60 bg-card p-6 sm:p-8"
    >
      <h2 className="font-heading text-xl font-bold text-foreground">Share Your Experience</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Booked a celebrity through Ashencrest? Leave a review — it will be reviewed by our team before appearing publicly.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {/* Rating */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Your Rating <span className="text-primary">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setForm((f) => ({ ...f, rating: star }))}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="rounded p-0.5 transition-transform hover:scale-110"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`size-7 transition-colors ${
                    star <= (hoverRating || form.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="mt-1 text-xs text-destructive">{errors.rating}</p>}
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
        </div>

        {/* Body */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Your Review <span className="text-primary">*</span>
          </label>
          <textarea
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            placeholder="Tell us about your experience booking through Ashencrest..."
            className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary ${
              errors.body ? "border-destructive" : "border-border"
            }`}
          />
          {errors.body && <p className="mt-1 text-xs text-destructive">{errors.body}</p>}
          <p className="mt-1 text-xs text-muted-foreground">{form.body.length}/2000 characters</p>
        </div>

        {status && (
          <p
            className={`text-sm ${status.type === "success" ? "text-primary" : "text-destructive"}`}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Review"} <ArrowRight className="size-4" />
        </button>
      </form>
    </motion.div>
  );
}
