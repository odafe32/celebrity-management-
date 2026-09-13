import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, PenTool, Utensils, Users, Heart, Megaphone, Music, Briefcase, Building2, Building } from "lucide-react";
import { SERVICE_DATA, getServiceBySlug } from "@/lib/services";
import { getCelebritiesByTalentTypes } from "@/lib/celebrities";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { FadeIn } from "@/components/fade-in";
import { BLUR_DATA_URL, CARD_SIZES } from "@/lib/image-utils";
import type { Metadata } from "next";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool, Utensils, Users, Heart, Megaphone, Music, Briefcase, Building2, Building,
};

export function generateStaticParams() {
  return SERVICE_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `Book a Celebrity for ${service.title}`,
    description: service.shortDesc,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = ICONS[service.icon] ?? PenTool;
  const featuredTalent = getCelebritiesByTalentTypes(service.talentTypes, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <FadeIn>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/celebrity-services" className="hover:text-primary">Services</Link>
          <span>/</span>
          <span className="text-foreground">{service.title}</span>
        </nav>
      </FadeIn>

      {/* Hero with image */}
      <FadeIn delay={0.05} className="mt-6 overflow-hidden rounded-2xl border border-border/60">
        <div className="relative aspect-[21/9] w-full">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-primary/90 text-primary-foreground backdrop-blur-sm">
                <Icon className="size-8" />
              </div>
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Book a Celebrity for {service.title}
                </h1>
                <p className="mt-2 text-muted-foreground">{service.shortDesc}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="size-4" /> {service.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* CTA buttons — visible right after hero */}
      <FadeIn delay={0.06} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/book-a-celebrity?service=${service.slug}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80">
          Book a Session <ArrowRight className="size-4" />
        </Link>
        <Link href="/celebrities" className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted">
          Browse Talent
        </Link>
      </FadeIn>

      {/* Featured Talent */}
      {featuredTalent.length > 0 && (
        <FadeIn delay={0.08} className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-foreground">Featured Talent</h2>
            <Link href="/celebrities" className="text-sm font-medium text-primary transition-opacity hover:opacity-80">
              View all
            </Link>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            A sampling of the talent available for {service.title.toLowerCase()}. Availability and pricing vary — inquire for details.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featuredTalent.map((celeb) => (
              <Link
                key={celeb.id}
                href={`/celebrities/${celeb.slug}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-border/60 transition-colors group-hover:border-primary/60">
                  {celeb.photoUrl ? (
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
                  ) : (
                    <div className="flex size-full items-center justify-center bg-muted text-xs text-muted-foreground">
                      {celeb.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-foreground">{celeb.name}</span>
              </Link>
            ))}
          </div>
        </FadeIn>
      )}

      {/* About This Service */}
      <FadeIn delay={0.1} className="mt-8 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">About This Service</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">{service.longDescription}</p>
      </FadeIn>

      {/* What's Included */}
      <FadeIn delay={0.15} className="mt-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">What&rsquo;s Included</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every booking through Ashencrest includes the following coordination services:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {service.whatIncluded.map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-lg border border-border/40 bg-background p-3">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* How It Works */}
      <FadeIn delay={0.18} className="mt-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">How It Works</h2>
        <div className="mt-6 space-y-6">
          {service.process.map((step) => (
            <div key={step.step} className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Talent Types + Event Types */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FadeIn delay={0.2} className="rounded-xl border border-border/60 bg-card p-6">
          <h2 className="font-heading text-lg font-bold text-foreground">Talent Types Available</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.talentTypes.map((talent) => (
              <span key={talent} className="rounded-full border border-border/40 bg-background px-3 py-1.5 text-sm text-foreground">
                {talent}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.25} className="rounded-xl border border-border/60 bg-card p-6">
          <h2 className="font-heading text-lg font-bold text-foreground">Event Types We Handle</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.eventTypes.map((event) => (
              <span key={event} className="rounded-full border border-border/40 bg-background px-3 py-1.5 text-sm text-foreground">
                {event}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* FAQ */}
      <FadeIn delay={0.3} className="mt-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {service.faq.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-border/40 bg-background p-4">
              <h3 className="font-medium text-foreground">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
