"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SERVICES } from "@/lib/nav-data";
import { getCategoriesWithCounts } from "@/lib/celebrities";
import { VERIFIED_TESTIMONIALS } from "@/lib/testimonials";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-8">
      {/* Celebrity Services */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
          Celebrity Services
        </h3>
        <ul className="flex flex-col gap-1.5">
          {SERVICES.map((service, idx) => (
            <motion.li
              key={service.href}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
            >
              <Link
                href={service.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {service.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
          Categories
        </h3>
        <ul className="flex flex-col gap-1.5">
          {getCategoriesWithCounts().map((cat, idx) => (
            <motion.li
              key={cat.slug}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.02 }}
              className="flex items-center justify-between"
            >
              <Link
                href={`/celebrities?category=${cat.slug}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
              <span className="text-xs text-muted-foreground/60">({cat.count})</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
            Testimonials
          </h3>
          <Link
            href="/testimonials"
            className="text-xs text-primary transition-opacity hover:opacity-80"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {VERIFIED_TESTIMONIALS.slice(0, 6).map((t, idx) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-lg border border-border/60 bg-card p-4"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-sm italic text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-2 text-xs font-medium text-foreground">
                — {t.name}, {new Date(t.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
