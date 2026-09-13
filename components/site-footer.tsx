"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  SERVICES,
  SITE_NAME,
  FOOTER_LINKS,
} from "@/lib/nav-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center"
        >
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              Ready to book a celebrity?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us about your event and we&apos;ll handle the rest &mdash;
              from talent sourcing to event-day coordination.
            </p>
          </div>
          <Link
            href="/book-a-celebrity"
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary/80"
          >
            Start Your Booking
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="col-span-2 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt={`${SITE_NAME} logo`}
                width={36}
                height={36}
                className="rounded-full object-cover"
                style={{ width: "auto", height: "auto" }}
              />
              <span className="font-heading text-lg font-bold">
                {SITE_NAME}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A full-service celebrity booking agency connecting clients with
              world-renowned talent for private events, corporate functions,
              endorsements, promotions, and unforgettable experiences.
            </p>
            {/* Contact icons - commented out for now
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="size-4 shrink-0" />
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="size-4 shrink-0" />
                {CONTACT.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="size-4 shrink-0" />
                WhatsApp: {CONTACT.whatsapp}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                {CONTACT.address}
              </span>
            </div>
            */}
          </motion.div>

          {/* Company / Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            {FOOTER_LINKS.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            {SERVICES.slice(0, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/celebrity-services"
              className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              View all services
            </Link>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <CookiePreferencesLink />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground/70">
          {SITE_NAME} is an independent booking agency and is not affiliated
          with, endorsed by, or sponsored by any of the celebrities listed on
          this Site. All celebrity names, images, and likenesses are the
          property of their respective owners and are used for informational
          purposes only. Booking availability is subject to change without
          notice.
        </p>
      </div>
    </footer>
  );
}

/**
 * Link that lets users manage cookie preferences from the footer.
 * Reads consent state via useSyncExternalStore so it stays in sync
 * with the cookie banner without triggering lint warnings.
 */
function CookiePreferencesLink() {
  // Always render the link — clicking it clears consent so the banner reappears
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem("ashencrest-cookie-consent");
          window.dispatchEvent(new Event("ashencrest-consent-change"));
        } catch {
          // ignore
        }
      }}
      className="text-xs text-muted-foreground transition-colors hover:text-primary"
    >
      Cookie Settings
    </button>
  );
}
