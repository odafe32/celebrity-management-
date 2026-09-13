"use client";

import { useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "ashencrest-cookie-consent";
const CONSENT_VERSION = "1";

type ConsentChoice = "accepted" | "rejected" | null;

function getStoredConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice: ConsentChoice; version: string };
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

function storeConsent(choice: Exclude<ConsentChoice, null>) {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ choice, version: CONSENT_VERSION }),
    );
    window.dispatchEvent(new Event("ashencrest-consent-change"));
  } catch {
    // localStorage may be blocked — fail silently
  }
}

function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event("ashencrest-consent-change"));
  } catch {
    // ignore
  }
}

// useSyncExternalStore plumbing
const subscribe = (callback: () => void) => {
  window.addEventListener("ashencrest-consent-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("ashencrest-consent-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = (): ConsentChoice => getStoredConsent();

const getServerSnapshot = (): ConsentChoice => null;

export function CookieConsent() {
  const choice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // User already made a choice — don't show the banner
  if (choice !== null) return null;

  const handleAccept = () => storeConsent("accepted");
  const handleReject = () => storeConsent("rejected");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
        role="dialog"
        aria-live="polite"
        aria-label="Cookie consent"
      >
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="size-5 text-primary" />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h2 className="font-heading text-base font-bold text-foreground">
                We value your privacy
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Ashencrest uses cookies to enhance your browsing experience,
                analyze site traffic, and personalize content. By clicking
                &ldquo;Accept all&rdquo;, you consent to our use of cookies.
                Read our{" "}
                <Link
                  href="/cookies"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                onClick={handleReject}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Reject all
              </button>
              <button
                onClick={handleAccept}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Floating button to re-open cookie preferences after the banner is dismissed.
 * Shows only if the user has made a choice.
 */
export function CookiePreferencesButton() {
  const choice = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleReset = useCallback(() => clearConsent(), []);

  if (choice === null) return null;

  return (
    <button
      onClick={handleReset}
      className="fixed bottom-4 left-4 z-50 flex size-10 items-center justify-center rounded-full border border-border/60 bg-card/95 shadow-lg backdrop-blur-sm transition-colors hover:bg-muted"
      aria-label="Cookie preferences"
      title="Cookie preferences"
    >
      <Cookie className="size-4 text-muted-foreground" />
    </button>
  );
}
