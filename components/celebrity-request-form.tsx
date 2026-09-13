"use client";

import * as React from "react";
import { motion } from "motion/react";
import { UserPlus, ArrowRight, Check, Search } from "lucide-react";
import { CELEBRITIES, searchCelebrities } from "@/lib/celebrities";
import { submitCelebrityRequest } from "@/app/request-celebrity/actions";

type Errors = {
  celebrityName?: string;
  requesterName?: string;
  requesterEmail?: string;
  eventDetails?: string;
};

const EVENT_TYPES = [
  "Corporate Event",
  "Private Party",
  "Meet & Greet",
  "Charity / Fundraiser",
  "Concert / Performance",
  "Product Launch",
  "Autograph Signing",
  "Nightclub Appearance",
  "Tradeshow",
  "Brand Endorsement",
  "Birthday / Celebration",
  "Other",
];

const BUDGET_RANGES = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000+",
  "Prefer not to say",
];

export function CelebrityRequestForm({ defaultName = "" }: { defaultName?: string }) {
  const [form, setForm] = React.useState({
    celebrityName: defaultName,
    requesterName: "",
    requesterEmail: "",
    eventType: "",
    eventDate: "",
    eventLocation: "",
    budget: "",
    eventDetails: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Keep celebrityName in sync with the defaultName prop using the
  // "adjust state during render" pattern (no setState in effect).
  const [prevDefaultName, setPrevDefaultName] = React.useState(defaultName);
  if (prevDefaultName !== defaultName) {
    setPrevDefaultName(defaultName);
    setForm((f) => ({ ...f, celebrityName: defaultName }));
  }

  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchCelebrities(searchQuery).slice(0, 5);
  }, [searchQuery]);

  function validate(): Errors {
    const errs: Errors = {};
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/60 bg-card p-6 text-center"
      >
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">Request Submitted!</p>
        <p className="mt-1 text-xs text-muted-foreground">
          We sent a confirmation email to <strong>{form.requesterEmail}</strong>. Our team will follow up with you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/60 bg-card p-6"
    >
      <div className="mb-3 flex items-center gap-2">
        <UserPlus className="size-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Request a Celebrity</h3>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        {"Can't find who you're looking for? Tell us and we'll help you book them."}
      </p>
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Celebrity Name with Search */}
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground">
            Celebrity Name <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={form.celebrityName}
              onChange={(e) => {
                setForm((f) => ({ ...f, celebrityName: e.target.value }));
                setShowSearch(true);
                setSearchQuery(e.target.value);
              }}
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                handleBlur("celebrityName");
                setTimeout(() => setShowSearch(false), 200);
              }}
              className={`h-9 w-full rounded-lg border bg-background px-3 pr-9 text-sm text-foreground outline-none focus:border-primary ${
                touched.celebrityName && errors.celebrityName ? "border-destructive" : "border-border"
              }`}
            />
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            {/* Search dropdown */}
            {showSearch && searchQuery.trim() && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                {searchResults.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setForm((f) => ({ ...f, celebrityName: r.name }));
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-secondary"
                  >
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.profession}</p>
                    </div>
                    <span className="text-xs text-primary">Select</span>
                  </button>
                ))}
              </div>
            )}
            {showSearch && searchQuery.trim() && searchResults.length === 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-popover p-3 text-xs text-muted-foreground shadow-lg">
                No matches found in our directory — fill out the form below to request this celebrity.
              </div>
            )}
          </div>
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
            <label className="mb-1 block text-xs font-medium text-foreground">
              Event Type (optional)
            </label>
            <select
              value={form.eventType}
              onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Select event type...</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">
              Event Date (optional)
            </label>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">
              Budget (optional)
            </label>
            <select
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">Select budget range...</option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground">
            Event Location (optional)
          </label>
          <input
            type="text"
            value={form.eventLocation}
            onChange={(e) => setForm((f) => ({ ...f, eventLocation: e.target.value }))}
            placeholder="City, State or Country"
            className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground">
            Event Details (optional)
          </label>
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
    </motion.div>
  );
}
