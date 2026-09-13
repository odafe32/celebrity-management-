"use client";

import * as React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { CATEGORIES, SITE_NAME } from "@/lib/nav-data";
import { getFeaturedCelebrities, CELEBRITIES } from "@/lib/celebrities";
import { BLUR_DATA_URL, CARD_SIZES } from "@/lib/image-utils";

const FEATURED = getFeaturedCelebrities().map((c) => ({
  name: c.name,
  category: c.profession.split(",")[0],
  slug: c.slug,
  photoUrl: c.photoUrl,
}));

// Additional celebrities to show when "See More" is clicked
const MORE_CELEBS = CELEBRITIES.filter((c) => !c.featured).slice(0, 24).map((c) => ({
  name: c.name,
  category: c.profession.split(",")[0],
  slug: c.slug,
  photoUrl: c.photoUrl,
}));

export default function Home() {
  const [showMore, setShowMore] = React.useState(false);
  const visibleCelebs = showMore ? [...FEATURED, ...MORE_CELEBS] : FEATURED;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-secondary/30 px-6 py-16 sm:px-12 sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -bottom-20 -left-20 size-64 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Image
              src="/logo.png"
              alt={`${SITE_NAME} logo`}
              width={64}
              height={64}
              priority
              className="rounded-full object-cover"
              style={{ width: "auto", height: "auto" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Your #1 Celebrity Booking Agency
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            We secure the celebrity of your choice for any event — meet & greets,
            corporate events, autograph signings, nightclub appearances, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/book-a-celebrity" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-primary/80">
              Book a Celebrity
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/celebrities" className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-6 text-base font-medium text-foreground transition-colors hover:bg-muted">
              Browse Talent
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main content + sidebar */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        {/* Featured celebrities */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center justify-between"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Featured Celebrities
            </h2>
            <Link
              href="/celebrities"
              className="flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-80"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleCelebs.map((celeb, idx) => (
              <motion.a
                key={celeb.slug}
                href={`/celebrities/${celeb.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (idx % 8) * 0.05 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
              >
                {/* Photo */}
                {celeb.photoUrl ? (
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={celeb.photoUrl}
                      alt={celeb.name}
                      fill
                      sizes={CARD_SIZES}
                      loading={idx < 4 ? "eager" : "lazy"}
                      priority={idx < 4}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-secondary to-muted/50" />
                )}
                <div>
                  <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {celeb.name}
                  </h3>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {celeb.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-primary text-primary" />
                  <Star className="size-3 fill-primary text-primary" />
                  <Star className="size-3 fill-primary text-primary" />
                  <Star className="size-3 fill-primary text-primary" />
                  <Star className="size-3 fill-primary text-primary" />
                  <span className="ml-1">(5.0)</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* See More button */}
          {!showMore && MORE_CELEBS.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setShowMore(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-8 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                See More <ArrowRight className="size-4" />
              </button>
            </motion.div>
          )}
          {showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href="/celebrities"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                View All Celebrities <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          )}

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10"
          >
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat, idx) => (
                <motion.a
                  key={cat.slug}
                  href={`/celebrities?category=${cat.slug}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full border border-border/60 bg-card px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  {cat.name} <span className="text-muted-foreground">({cat.count})</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <div className="mt-10">
            <DisclaimerBlock />
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
