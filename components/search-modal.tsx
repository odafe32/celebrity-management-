"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, UserPlus, Check } from "lucide-react";
import { CELEBRITIES, searchCelebrities } from "@/lib/celebrities";
import { submitCelebrityRequest } from "@/app/request-celebrity/actions";
import { BLUR_DATA_URL } from "@/lib/image-utils";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  profession: string;
  category: string;
  photoUrl: string;
  nationality: string;
};

const EVENT_TYPES = [
  "Corporate Event", "Private Party", "Meet & Greet", "Charity / Fundraiser",
  "Concert / Performance", "Product Launch", "Autograph Signing",
  "Nightclub Appearance", "Tradeshow", "Brand Endorsement",
  "Birthday / Celebration", "Other",
];

const BUDGET_RANGES = [
  "Under $10,000", "$10,000 - $25,000", "$25,000 - $50,000",
  "$50,000 - $100,000", "$100,000 - $250,000", "$250,000+",
  "Prefer not to say",
];

export function SearchModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = React.useState("");
  const [highlight, setHighlight] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [prevOpen, setPrevOpen] = React.useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) {
      setQuery("");
      setHighlight(0);
    }
  }

  const results: SearchResult[] = React.useMemo(() => {
    if (!query.trim()) return [];
    return searchCelebrities(query).slice(0, 8).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      profession: c.profession,
      category: c.category,
      photoUrl: c.photoUrl,
      nationality: c.nationality,
    }));
  }, [query]);

  const [prevResultsLen, setPrevResultsLen] = React.useState(results.length);
  if (prevResultsLen !== results.length) {
    setPrevResultsLen(results.length);
    setHighlight(0);
  }

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
      }
      if (e.key === "Enter" && results[highlight]) {
        e.preventDefault();
        router.push(`/celebrities/${results[highlight].slug}`);
        onOpenChange(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, highlight, router, onOpenChange]);

  function goToResult(slug: string) {
    router.push(`/celebrities/${slug}`);
    onOpenChange(false);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (results[highlight]) {
      goToResult(results[highlight].slug);
    } else if (query.trim()) {
      router.push(`/celebrities?q=${encodeURIComponent(query.trim())}`);
      onOpenChange(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <div className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-20 w-[90vw] max-w-lg -translate-x-1/2 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-2xl">
              {/* Search input */}
              <form onSubmit={submitSearch} className="flex items-center gap-2 border-b border-border p-3">
                <Search className="size-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search celebrities by name, profession, or category..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close search"
                >
                  <X className="size-4" />
                </button>
              </form>

              {/* Results */}
              <div className="max-h-[70vh] overflow-y-auto">
                {query.trim() && results.length === 0 && (
                  <RequestCelebritySection query={query.trim()} />
                )}

                {!query.trim() && (
                  <div className="p-4">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Popular Celebrities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CELEBRITIES.filter((c) => c.featured).slice(0, 8).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => goToResult(c.slug)}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    {results.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => goToResult(r.slug)}
                        onMouseEnter={() => setHighlight(i)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          i === highlight ? "bg-secondary" : "hover:bg-secondary/50"
                        }`}
                      >
                        {/* Photo */}
                        {r.photoUrl ? (
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={r.photoUrl}
                              alt={r.name}
                              fill
                              sizes="40px"
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL={BLUR_DATA_URL}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-secondary to-muted/50" />
                        )}
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{r.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {r.profession} &middot; {r.nationality}
                          </p>
                        </div>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                      </button>
                    ))}

                    {/* Request option always available */}
                    <div className="mt-2 border-t border-border pt-2">
                      <button
                        onClick={() => {
                          router.push(`/celebrities?q=${encodeURIComponent(query.trim())}`);
                          onOpenChange(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-primary transition-colors hover:bg-primary/5"
                      >
                        <UserPlus className="size-4" />
                        <span>{"Can't find who you're looking for? Request a celebrity"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-3">
                  <span><kbd className="rounded bg-secondary px-1.5 py-0.5">↑↓</kbd> navigate</span>
                  <span><kbd className="rounded bg-secondary px-1.5 py-0.5">↵</kbd> select</span>
                  <span><kbd className="rounded bg-secondary px-1.5 py-0.5">esc</kbd> close</span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RequestCelebritySection({ query }: { query: string }) {
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({
    celebrityName: query,
    requesterName: "",
    requesterEmail: "",
    eventType: "",
    eventDate: "",
    eventLocation: "",
    budget: "",
    eventDetails: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const [prevQuery, setPrevQuery] = React.useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setForm((f) => ({ ...f, celebrityName: query }));
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (form.celebrityName.trim().length < 2) errs.celebrityName = "Celebrity name must be at least 2 characters";
    if (form.celebrityName.length > 100) errs.celebrityName = "Celebrity name is too long";
    if (form.requesterName.trim().length < 2) errs.requesterName = "Your name must be at least 2 characters";
    if (form.requesterName.length > 100) errs.requesterName = "Name is too long";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.requesterEmail)) errs.requesterEmail = "Please enter a valid email address";
    if (form.eventDetails.length > 2000) errs.eventDetails = "Event details are too long (max 2000 characters)";
    return errs;
  }

  function handleBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ celebrityName: true, requesterName: true, requesterEmail: true, eventDetails: true });
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setServerError(null);
    const result = await submitCelebrityRequest(form);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setServerError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">Request Submitted!</p>
        <p className="mt-1 text-xs text-muted-foreground">
          We sent a confirmation email to <strong>{form.requesterEmail}</strong>. Our team will follow up with you as soon as possible.
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No celebrities found for &ldquo;{query}&rdquo;
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <UserPlus className="size-4" />
          Request {query}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          {"Can't find who you're looking for? Tell us and we'll help you book them."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <UserPlus className="size-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Request a Celebrity</h3>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        {"Tell us who you're looking for and we'll get back to you with availability and pricing."}
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
            onBlur={() => handleBlur("celebrityName")}
            className={`h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
              touched.celebrityName && errors.celebrityName ? "border-destructive" : "border-border"
            }`}
          />
          {touched.celebrityName && errors.celebrityName && (
            <p className="mt-1 text-xs text-destructive">{errors.celebrityName}</p>
          )}
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
              onBlur={() => handleBlur("requesterName")}
              className={`h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                touched.requesterName && errors.requesterName ? "border-destructive" : "border-border"
              }`}
            />
            {touched.requesterName && errors.requesterName && (
              <p className="mt-1 text-xs text-destructive">{errors.requesterName}</p>
            )}
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
              onBlur={() => handleBlur("requesterEmail")}
              className={`h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none focus:border-primary ${
                touched.requesterEmail && errors.requesterEmail ? "border-destructive" : "border-border"
              }`}
            />
            {touched.requesterEmail && errors.requesterEmail && (
              <p className="mt-1 text-xs text-destructive">{errors.requesterEmail}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Event Type (optional)</label>
            <select
              value={form.eventType}
              onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Select...</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Event Date (optional)</label>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">Budget (optional)</label>
            <select
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Select...</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
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
            onBlur={() => handleBlur("eventDetails")}
            placeholder="Tell us about your event..."
            className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary ${
              touched.eventDetails && errors.eventDetails ? "border-destructive" : "border-border"
            }`}
          />
          {touched.eventDetails && errors.eventDetails && (
            <p className="mt-1 text-xs text-destructive">{errors.eventDetails}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">{form.eventDetails.length}/2000 characters</p>
        </div>
        {serverError && (
          <p className="text-xs text-destructive">{serverError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Request"} <ArrowRight className="size-4" />
        </button>
      </form>
    </div>
  );
}
