"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/sidebar";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { CELEBRITIES, getCategoriesWithCounts, searchCelebrities } from "@/lib/celebrities";
import { BLUR_DATA_URL, CARD_SIZES } from "@/lib/image-utils";
import { CelebrityRequestForm } from "@/components/celebrity-request-form";

const PER_PAGE = 12;

export default function CelebritiesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  const [search, setSearch] = React.useState(query);
  const [activeCategory, setActiveCategory] = React.useState(category);
  const [page, setPage] = React.useState(1);

  // Sync state when URL params change — React-recommended "adjust state when
  // a prop changes" pattern (no setState in effect).
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevQuery, setPrevQuery] = React.useState(query);
  const [prevCategory, setPrevCategory] = React.useState(category);
  if (prevQuery !== query || prevCategory !== category) {
    setPrevQuery(query);
    setPrevCategory(category);
    setSearch(query);
    setActiveCategory(category);
    setPage(1);
  }

  let filtered = CELEBRITIES;
  if (search) filtered = searchCelebrities(search);
  if (activeCategory) filtered = filtered.filter((c) => c.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Celebrity Directory
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our roster of {CELEBRITIES.length}+ celebrities available for booking.
        </p>
      </motion.div>

      {/* Search + category chips */}
      <div className="mt-6 flex flex-col gap-4">
        <input
          type="search"
          placeholder="Search celebrities..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="h-10 w-full max-w-md rounded-lg border border-border bg-card px-4 text-sm text-foreground outline-none focus:border-primary"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveCategory("");
              setPage(1);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !activeCategory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            All
          </button>
          {getCategoriesWithCounts().map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setPage(1);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {cat.name} <span className="opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid + sidebar */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No celebrities found{search ? <> for &ldquo;{search}&rdquo;</> : null}.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("");
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
              {search && (
                <div className="mt-8 w-full max-w-md">
                  <CelebrityRequestForm defaultName={search} />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {visible.map((celeb, idx) => (
                  <motion.a
                    key={celeb.id}
                    href={`/celebrities/${celeb.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary/40"
                  >
                    {celeb.photoUrl ? (
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                          src={celeb.photoUrl}
                          alt={celeb.name}
                          fill
                          sizes={CARD_SIZES}
                          loading="lazy"
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
                        {celeb.profession.split(",")[0]}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-10">
            <DisclaimerBlock />
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
