"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Check, ArrowRight, Search, UserPlus, Copy } from "lucide-react";
import { z } from "zod";
import { CELEBRITIES, searchCelebrities } from "@/lib/celebrities";
import { SERVICE_DATA } from "@/lib/services";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { CONTACT } from "@/lib/nav-data";
import { BLUR_DATA_URL } from "@/lib/image-utils";
import { submitCelebrityRequest } from "@/app/request-celebrity/actions";
import { submitBooking } from "@/app/book-a-celebrity/actions";

const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
];

// Validation schema
const bookingSchema = z.object({
  celebrity: z.string().min(1, "Please select a celebrity"),
  service: z.string().min(1, "Please select a service type"),
  date: z.string().min(1, "Please select an event date").refine((val) => {
    const selected = new Date(val + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selected >= today;
  }, "Event date cannot be in the past"),
  time: z.string().min(1, "Please select an event time"),
  persons: z.string().min(1, "Please select number of persons"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number (at least 7 digits)").max(30, "Phone number is too long").refine((val) => {
    const digits = val.replace(/\D/g, "");
    return digits.length >= 7;
  }, "Phone number must contain at least 7 digits"),
  budget: z.string().max(50, "Budget field is too long").optional().or(z.literal("")),
  location: z.string().max(200, "Location is too long").optional().or(z.literal("")),
  requests: z.string().max(2000, "Requests are too long (max 2000 characters)").optional().or(z.literal("")),
  terms: z.boolean().refine((v) => v === true, "You must agree to the Terms and Privacy Policy"),
});

type BookingForm = z.infer<typeof bookingSchema>;
type FormErrors = Partial<Record<keyof BookingForm, string>>;

export default function BookACelebrityPage() {
  return (
    <React.Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">Loading…</div>}>
      <BookACelebrityContent />
    </React.Suspense>
  );
}

function BookACelebrityContent() {
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") ?? "";
  const presetCelebrity = searchParams.get("celebrity") ?? "";

  const [submitted, setSubmitted] = React.useState(false);
  const [refNumber, setRefNumber] = React.useState("");
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof BookingForm, boolean>>>({});
  const [requestModal, setRequestModal] = React.useState<{ open: boolean; celebrityName: string }>({
    open: false,
    celebrityName: "",
  });
  const [form, setForm] = React.useState({
    celebrity: presetCelebrity,
    service: presetService,
    date: "",
    time: "",
    persons: "1",
    name: "",
    email: "",
    phone: "",
    budget: "",
    location: "",
    requests: "",
    terms: false,
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    // Live-validate field if it was already touched
    if (touched[key]) {
      validateField(key, value);
    }
  }

  function handleBlur<K extends keyof typeof form>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
    validateField(key, form[key]);
  }

  function validateField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    const fieldSchema = bookingSchema.shape[key as keyof typeof bookingSchema.shape];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [key]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate all fields
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const err of result.error.issues) {
        const field = err.path[0] as keyof BookingForm;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      }
      setErrors(fieldErrors);
      // Mark all fields as touched so errors show
      const allTouched: Partial<Record<keyof BookingForm, boolean>> = {};
      for (const key of Object.keys(form) as (keyof BookingForm)[]) {
        allTouched[key] = true;
      }
      setTouched(allTouched);
      // Scroll to first error
      const firstErrorField = String(result.error.issues[0]?.path[0] ?? "");
      if (firstErrorField) {
        const el = document.querySelector(`[data-field="${firstErrorField}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    setServerError(null);
    const res = await submitBooking(form);
    setSubmitting(false);
    if (res.success) {
      setRefNumber(res.refNumber);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setServerError(res.error || "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <Check className="size-10" />
        </motion.div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
          Thank you, {form.name}!
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your booking inquiry has been received. We&rsquo;ll be in touch within 24 hours to discuss
          availability and pricing.
        </p>
        <div className="mt-6 rounded-xl border border-border/60 bg-card p-6">
          <p className="text-sm text-muted-foreground">Your reference number</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <p className="font-mono text-lg font-bold text-primary">{refNumber}</p>
            <CopyButton text={refNumber} />
          </div>
        </div>
        <Link
          href="/celebrities"
          className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted"
        >
          Browse More Celebrities
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Book a Celebrity
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Fill out the form below and we&rsquo;ll get back to you within 24 hours with availability and a
          personalized quote. No account needed.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 space-y-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8"
      >
        {/* Celebrity + Service */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div data-field="celebrity">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Celebrity <span className="text-primary">*</span>
            </label>
            <CelebritySearchSelect
              value={form.celebrity}
              onChange={(slug) => update("celebrity", slug)}
              onBlur={() => handleBlur("celebrity")}
              error={errors.celebrity}
              onRequest={(celebrityName) => setRequestModal({ open: true, celebrityName })}
            />
            {errors.celebrity && (
              <p className="mt-1 text-xs text-destructive">{errors.celebrity}</p>
            )}
          </div>
          <div data-field="service">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Service Type <span className="text-primary">*</span>
            </label>
            <select
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              onBlur={() => handleBlur("service")}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.service ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Select a service</option>
              {SERVICE_DATA.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-xs text-destructive">{errors.service}</p>
            )}
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div data-field="date">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Event Date <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              onBlur={() => handleBlur("date")}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.date ? "border-destructive" : "border-border"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-destructive">{errors.date}</p>
            )}
          </div>
          <div data-field="time">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Event Time <span className="text-primary">*</span>
            </label>
            <select
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
              onBlur={() => handleBlur("time")}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.time ? "border-destructive" : "border-border"
              }`}
            >
              <option value="">Select a time</option>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-xs text-destructive">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Persons */}
        <div data-field="persons">
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Number of Persons <span className="text-primary">*</span>
          </label>
          <select
            value={form.persons}
            onChange={(e) => update("persons", e.target.value)}
            onBlur={() => handleBlur("persons")}
            className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
              errors.persons ? "border-destructive" : "border-border"
            }`}
          >
            {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
            <option value="9+">9+ (call us)</option>
          </select>
          {errors.persons && (
            <p className="mt-1 text-xs text-destructive">{errors.persons}</p>
          )}
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div data-field="name">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Your Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div data-field="email">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div data-field="phone">
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Phone <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            placeholder="e.g. +1 555 123 4567"
            className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
              errors.phone ? "border-destructive" : "border-border"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Budget + Location */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Budget (optional)
            </label>
            <input
              type="text"
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              placeholder="e.g. $10,000"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Event Location (optional)
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Los Angeles, CA"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Special requests */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Special Requests (optional)
          </label>
          <textarea
            rows={4}
            value={form.requests}
            onChange={(e) => update("requests", e.target.value)}
            placeholder="Tell us about your event, any specific requirements, promo codes, etc."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        {/* Terms */}
        <div data-field="terms">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => update("terms", e.target.checked)}
              onBlur={() => handleBlur("terms")}
              className={`mt-1 size-4 rounded border accent-primary ${
                errors.terms ? "border-destructive" : "border-border"
              }`}
            />
            <label className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1 pl-6 text-xs text-destructive">{errors.terms}</p>
          )}
        </div>

        {/* Submit */}
        {serverError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            {serverError}
          </div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Booking Inquiry"} <ArrowRight className="size-4" />
        </button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to be contacted by Ashencrest at the email or phone provided.
          We respond within 24 hours. For urgent inquiries, email{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-primary hover:underline">{CONTACT.email}</a>.
        </p>
      </motion.form>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>

      {/* Celebrity Request Modal */}
      {requestModal.open && (
        <CelebrityRequestModal
          celebrityName={requestModal.celebrityName}
          onClose={() => setRequestModal({ open: false, celebrityName: "" })}
        />
      )}
    </div>
  );
}

// ─── Celebrity Search Select ─────────────────────────────────────
function CelebritySearchSelect({
  value,
  onChange,
  onBlur,
  error,
  onRequest,
}: {
  value: string;
  onChange: (slug: string) => void;
  onBlur: () => void;
  error?: string;
  onRequest: (celebrityName: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selected = CELEBRITIES.find((c) => c.slug === value);

  const results = React.useMemo(() => {
    if (!query.trim()) return CELEBRITIES.slice(0, 20);
    return searchCelebrities(query).slice(0, 20);
  }, [query]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  return (
    <div ref={containerRef} className="relative">
      {/* Input / display */}
      <div
        onClick={() => setOpen(true)}
        className={`flex h-10 w-full cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      >
        <Search className="size-4 shrink-0 text-muted-foreground" />
        {selected ? (
          <span className="flex-1 truncate">
            {selected.name} <span className="text-muted-foreground">— {selected.profession}</span>
          </span>
        ) : open ? (
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search celebrities by name or profession..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        ) : (
          <span className="flex-1 text-muted-foreground">Search and select a celebrity...</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-border bg-popover shadow-lg">
          {/* Search bar at top of dropdown */}
          <div className="sticky top-0 flex items-center gap-2 border-b border-border bg-popover p-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search celebrities..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">
                No celebrities found for &ldquo;{query}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  onRequest(query);
                  setOpen(false);
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <UserPlus className="size-4" />
                Request {query}
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                We&rsquo;ll help you book this celebrity
              </p>
            </div>
          ) : (
            results.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChange(c.slug);
                  setOpen(false);
                  setQuery("");
                  onBlur();
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-secondary ${
                  c.slug === value ? "bg-secondary" : ""
                }`}
              >
                {c.photoUrl ? (
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={c.photoUrl}
                      alt={c.name}
                      fill
                      sizes="36px"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-9 shrink-0 rounded-full bg-gradient-to-br from-secondary to-muted/50" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.profession} &middot; {c.nationality}
                  </p>
                </div>
                {c.featured && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Featured
                  </span>
                )}
              </button>
            ))
          )}

          {/* Request option — always visible at bottom when searching */}
          {query.trim() && results.length > 0 && (
            <div className="border-t border-border p-2">
              <button
                type="button"
                onClick={() => {
                  onRequest(query);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-primary/5"
              >
                <UserPlus className="size-4" />
                <span>{"Can't find who you want? Request a celebrity"}</span>
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-border bg-popover p-2 text-center">
            <p className="text-xs text-muted-foreground">
              {CELEBRITIES.length} celebrities available &middot; {"Can't find who you want? "}
              <Link href="/celebrities" className="text-primary hover:underline">
                Browse all
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Celebrity Request Modal ─────────────────────────────────────
function CelebrityRequestModal({
  celebrityName,
  onClose,
}: {
  celebrityName: string;
  onClose: () => void;
}) {
  const [form, setForm] = React.useState({
    celebrityName,
    requesterName: "",
    requesterEmail: "",
    eventType: "",
    eventDate: "",
    eventLocation: "",
    budget: "",
    eventDetails: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [prevName, setPrevName] = React.useState(celebrityName);
  if (prevName !== celebrityName) {
    setPrevName(celebrityName);
    setForm((f) => ({ ...f, celebrityName }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.celebrityName.trim().length < 2) {
      setError("Celebrity name must be at least 2 characters");
      return;
    }
    if (form.requesterName.trim().length < 2) {
      setError("Your name must be at least 2 characters");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.requesterEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await submitCelebrityRequest(form);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">Request Submitted!</p>
            <p className="mt-1 text-xs text-muted-foreground">
              We sent a confirmation email to <strong>{form.requesterEmail}</strong>. Our team will follow up with you as soon as possible.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="size-4 text-primary" />
                <h3 className="text-base font-bold text-foreground">Request a Celebrity</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              {"Can't find who you're looking for? Tell us and we'll help you book them. We'll send you a confirmation email and our staff will follow up."}
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Celebrity Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.celebrityName}
                  onChange={(e) => setForm((f) => ({ ...f, celebrityName: e.target.value }))}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.requesterName}
                    onChange={(e) => setForm((f) => ({ ...f, requesterName: e.target.value }))}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Your Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.requesterEmail}
                    onChange={(e) => setForm((f) => ({ ...f, requesterEmail: e.target.value }))}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Event Type (optional)</label>
                  <input
                    type="text"
                    value={form.eventType}
                    onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                    placeholder="e.g. Corporate Event, Birthday, etc."
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Event Date (optional)</label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Event Location (optional)</label>
                <input
                  type="text"
                  value={form.eventLocation}
                  onChange={(e) => setForm((f) => ({ ...f, eventLocation: e.target.value }))}
                  placeholder="City, State or Country"
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Event Details (optional)</label>
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={form.eventDetails}
                  onChange={(e) => setForm((f) => ({ ...f, eventDetails: e.target.value }))}
                  placeholder="Tell us about your event..."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                />
                <p className="mt-1 text-xs text-muted-foreground">{form.eventDetails.length}/2000 characters</p>
              </div>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Request"} <ArrowRight className="size-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─── Copy Button ─────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Copy reference number"
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? (
        <Check className="size-4 text-primary" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}
