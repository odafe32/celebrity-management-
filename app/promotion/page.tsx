import { ArrowRight, Tag, Sparkles, Calendar, Percent, Star, Music } from "lucide-react";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { FadeIn } from "@/components/fade-in";
import { CONTACT } from "@/lib/nav-data";
import { getFeaturedCelebrities, CELEBRITIES } from "@/lib/celebrities";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions & Special Offers",
  description:
    "View active promotions, discount codes, and seasonal celebrity booking offers from Ashencrest.",
};

const PROMOTIONS = [
  { title: "Holiday Season Special", desc: "Book any celebrity for a December event and receive 15% off the talent fee. Perfect for corporate holiday parties and year-end galas.", code: "HOLIDAY15", discount: "15% OFF", expiry: "December 31, 2025", icon: Calendar, featured: true },
  { title: "First-Time Client Discount", desc: "New to Ashencrest? Get $500 off your first celebrity booking when you mention this promotion.", code: "WELCOME500", discount: "$500 OFF", expiry: "Ongoing", icon: Sparkles, featured: false },
  { title: "Bundle & Save", desc: "Book two or more celebrities for the same event and receive 20% off the total booking fee.", code: "BUNDLE20", discount: "20% OFF", expiry: "Ongoing", icon: Tag, featured: false },
  { title: "Off-Peak Pricing", desc: "Book a weekday event (Monday–Thursday) and save 10% on talent fees. Great for corporate lunches and private dinners.", code: "OFFPEAK10", discount: "10% OFF", expiry: "Ongoing", icon: Percent, featured: false },
  { title: "Country Music Spotlight", desc: "Book any country music artist — including Morgan Wallen, Riley Green, and more — and receive 12% off the talent fee. Limited time offer for live performances and meet & greets.", code: "COUNTRY12", discount: "12% OFF", expiry: "March 31, 2026", icon: Music, featured: true },
];

export default function PromotionPage() {
  const featured = getFeaturedCelebrities().slice(0, 6);
  const newArtists = CELEBRITIES.filter((c) =>
    ["ben-fuller", "riley-green", "steve-perry", "morgan-wallen"].includes(c.slug)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <FadeIn className="text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Promotions & Special Offers</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Take advantage of our current promotions and discount codes to save on your next celebrity booking.
        </p>
      </FadeIn>

      {/* How it works */}
      <FadeIn delay={0.05} className="mt-8 rounded-xl border border-border/60 bg-card p-6">
        <h2 className="font-heading text-lg font-bold text-foreground">How Promotions Work</h2>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">1. Choose a promo code</span> from the offers below that matches your booking.
          </p>
          <p>
            <span className="font-medium text-foreground">2. Submit a booking inquiry</span> through the booking form and include the promo code in the special requests field.
          </p>
          <p>
            <span className="font-medium text-foreground">3. We apply the discount</span> to your personalized quote. The discount is reflected in the final booking agreement.
          </p>
        </div>
        <p className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          Note: Only one promo code per booking. Promotions cannot be combined. Some restrictions may apply based on celebrity and service type.
        </p>
      </FadeIn>

      {/* Promotions grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROMOTIONS.map((promo, idx) => {
          const Icon = promo.icon;
          return (
            <FadeIn key={promo.code} delay={idx * 0.05}>
              <div className={`flex h-full flex-col rounded-xl border p-6 transition-colors ${
                promo.featured
                  ? "border-primary/40 bg-gradient-to-br from-primary/5 to-card"
                  : "border-border/60 bg-card hover:border-primary/30"
              }`}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{promo.discount}</span>
                </div>
                <h2 className="font-heading text-lg font-bold text-foreground">{promo.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{promo.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Promo Code</p>
                    <p className="font-mono text-sm font-bold text-primary">{promo.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className="text-sm font-medium text-foreground">{promo.expiry}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* New Artists Spotlight */}
      <FadeIn delay={0.1} className="mt-12">
        <div className="flex items-center gap-2">
          <Music className="size-5 text-primary" />
          <h2 className="font-heading text-2xl font-bold text-foreground">New Artists Spotlight</h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          {"We've recently added these talented artists to our roster. Book them now with the "}
          <span className="font-mono font-bold text-primary">COUNTRY12</span>
          {" promo code for 12% off."}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {newArtists.map((celeb, idx) => (
            <FadeIn key={celeb.id} delay={idx * 0.05}>
              <a
                href={`/celebrities/${celeb.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  {celeb.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={celeb.photoUrl}
                      alt={celeb.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-secondary to-muted/50" />
                  )}
                </div>
                <div>
                  <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {celeb.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {celeb.profession.split(",")[0]}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-2.5 fill-primary text-primary" />
                  ))}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      {/* Featured celebrities on promotion */}
      <FadeIn delay={0.15} className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-foreground">Featured Celebrities</h2>
        <p className="mt-2 text-muted-foreground">
          These celebrities are currently available for promotional bookings. Apply a promo code when booking any of them.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((celeb, idx) => (
            <FadeIn key={celeb.id} delay={idx * 0.05}>
              <a
                href={`/celebrities/${celeb.slug}`}
                className="group flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  {celeb.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={celeb.photoUrl}
                      alt={celeb.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-secondary to-muted/50" />
                  )}
                </div>
                <div>
                  <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {celeb.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {celeb.profession.split(",")[0]}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-2.5 fill-primary text-primary" />
                  ))}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.3} className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-secondary/30 p-8 text-center sm:p-12">
        <h2 className="font-heading text-2xl font-bold text-foreground">Ready to use a promo code?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Mention your promo code when booking or include it in the special requests field of the booking form.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/book-a-celebrity" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80">
            Book Now <ArrowRight className="size-4" />
          </a>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted">
            Ask a Question
          </a>
        </div>
      </FadeIn>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
