import { ArrowRight, PenTool, Utensils, Users, Heart, Megaphone, Music, Briefcase, Building2, Building, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_DATA } from "@/lib/services";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { FadeIn } from "@/components/fade-in";
import { CONTACT } from "@/lib/nav-data";
import { BLUR_DATA_URL } from "@/lib/image-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celebrity Services",
  description:
    "Explore all 9 celebrity booking services offered by Ashencrest — autograph signings, meet & greets, corporate events, nightclub appearances, product endorsements, private reservations, charity events, business promotions, and tradeshow appearances.",
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool, Utensils, Users, Heart, Megaphone, Music, Briefcase, Building2, Building,
};

export default function CelebrityServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <FadeIn className="text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Celebrity Services
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We offer {SERVICE_DATA.length} specialized celebrity booking services. Each service type
          has its own logistics, pricing, and coordination requirements — and we handle every
          detail. Browse the services below, then submit a booking inquiry for the one that fits
          your event.
        </p>
      </FadeIn>

      {/* Service grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_DATA.map((service, idx) => {
          const Icon = ICONS[service.icon] ?? PenTool;
          return (
            <FadeIn key={service.slug} delay={idx * 0.05}>
              <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-primary/40">
                {/* Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={service.heroImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={idx < 3 ? "eager" : "lazy"}
                    priority={idx < 3}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground backdrop-blur-sm">
                    <Icon className="size-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <h2 className="font-heading text-lg font-bold text-foreground">{service.title}</h2>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {service.duration}
                      </span>
                    </div>
                  </div>
                  <p className="flex-1 text-sm text-muted-foreground">{service.shortDesc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.talentTypes.slice(0, 4).map((talent) => (
                      <span key={talent} className="rounded-full border border-border/40 bg-background px-2 py-0.5 text-xs text-muted-foreground">
                        {talent}
                      </span>
                    ))}
                    {service.talentTypes.length > 4 && (
                      <span className="rounded-full border border-border/40 bg-background px-2 py-0.5 text-xs text-muted-foreground">
                        +{service.talentTypes.length - 4} more
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    Learn more <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* What happens after you inquire */}
      <FadeIn delay={0.2} className="mt-12 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">What Happens After You Inquire</h2>
        <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
          <p>
            When you submit a booking inquiry, here is exactly what happens:
          </p>
          <ol className="ml-4 space-y-2">
            <li className="list-decimal">
              <span className="font-medium text-foreground">Within 24 hours</span> — A dedicated
              coordinator reviews your request and contacts the celebrity or their management team
              to confirm availability.
            </li>
            <li className="list-decimal">
              <span className="font-medium text-foreground">Quote</span> — We return a
              personalized, itemized quote including talent fees, travel, and coordination costs.
              No hidden fees.
            </li>
            <li className="list-decimal">
              <span className="font-medium text-foreground">Contract</span> — Once you approve the
              quote, we draft a formal booking agreement and coordinate the deposit to lock in the
              date.
            </li>
            <li className="list-decimal">
              <span className="font-medium text-foreground">Coordination</span> — We handle travel,
              accommodation, security, on-site logistics, and technical requirements.
            </li>
            <li className="list-decimal">
              <span className="font-medium text-foreground">Event day</span> — The celebrity appears
              as agreed. Your coordinator is on call throughout.
            </li>
          </ol>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.3} className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-secondary/30 p-8 text-center sm:p-12">
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Ready to book a celebrity?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Submit a booking inquiry and we&rsquo;ll get back to you within 24 hours with
          availability and a personalized quote. No account needed.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book-a-celebrity" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80">
            Book a Session <ArrowRight className="size-4" />
          </Link>
          <a href={`mailto:${CONTACT.email}`} className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted">
            Email Us
          </a>
        </div>
      </FadeIn>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
