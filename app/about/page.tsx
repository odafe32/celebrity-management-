import { ArrowRight, Award, Users, Calendar, Globe, Shield, Star, Handshake, ClipboardCheck, Sparkles } from "lucide-react";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { FadeIn } from "@/components/fade-in";
import { CATEGORIES, CONTACT } from "@/lib/nav-data";
import { CELEBRITIES } from "@/lib/celebrities";
import { SERVICE_DATA } from "@/lib/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ashencrest",
  description:
    "Ashencrest is a full-service celebrity booking agency based in Los Angeles. We connect event organizers, brands, and individuals with verified celebrities for appearances, endorsements, meet & greets, corporate events, and private functions worldwide.",
};

const STATS = [
  { icon: Users, label: "Celebrities in Roster", value: `${CELEBRITIES.length}+` },
  { icon: Calendar, label: "Events Booked", value: "1,200+" },
  { icon: Globe, label: "Countries Served", value: "25+" },
  { icon: Award, label: "Years of Experience", value: "10+" },
];

const TALENT_TYPES = [
  "Actors (Film & TV)",
  "Actresses",
  "Musicians & Singers",
  "Athletes",
  "Comedians",
  "TV Personalities & Hosts",
  "Directors & Producers",
  "Models",
  "Social Media Influencers",
  "Entrepreneurs & Business Leaders",
  "Authors & Writers",
  "Celebrity Chefs",
  "Dancers",
  "DJs & Electronic Artists",
  "Journalists & News Anchors",
];

const EVENT_TYPES = [
  "Corporate Conferences & Keynotes",
  "Private Dinners & VIP Gatherings",
  "Charity Galas & Fundraisers",
  "Product Launches & Brand Activations",
  "Trade Shows & Exhibitions",
  "Nightclub Hosted Nights",
  "Fan Meet & Greets",
  "Autograph Signing Events",
  "Music Festivals & Concerts",
  "Weddings & Private Parties",
  "Advertising Campaigns",
  "Social Media Endorsements",
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "1. Submit Your Request",
    desc: "Fill out the booking inquiry form with your event details, preferred celebrity, date, and budget. No account needed — just tell us what you need.",
  },
  {
    icon: Handshake,
    title: "2. We Negotiate & Quote",
    desc: "Our team contacts the celebrity or their management, negotiates terms, and returns a personalized quote within 24 hours. We handle all the back-and-forth so you don&rsquo;t have to.",
  },
  {
    icon: Shield,
    title: "3. Contract & Deposit",
    desc: "Once you approve the quote, we draft a formal booking agreement, coordinate the deposit, and lock in the celebrity&rsquo;s schedule. Every contract is legally binding and protects both parties.",
  },
  {
    icon: Calendar,
    title: "4. Event Coordination",
    desc: "We handle travel, accommodation, security, on-site logistics, and technical requirements. Your dedicated event coordinator manages every detail leading up to and during the event.",
  },
  {
    icon: Star,
    title: "5. Event Day & Follow-up",
    desc: "The celebrity appears at your event as agreed. Afterward, we follow up to ensure everything met your expectations and handle any post-event requirements.",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Verified Talent Only",
    desc: "Every celebrity in our roster is vetted and verified. We work directly with talent, their agents, and management teams — no intermediaries, no scams, no surprises.",
  },
  {
    icon: ClipboardCheck,
    title: "Full-Service Coordination",
    desc: "We handle contracts, insurance certificates, travel, security, on-site coordination, and post-event follow-up. You get a single point of contact from inquiry to event day.",
  },
  {
    icon: Handshake,
    title: "Transparent Pricing",
    desc: "No hidden fees. We provide a clear, itemized quote that includes talent fees, travel, and coordination. What we quote is what you pay.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Based in Los Angeles, we book talent worldwide. From Hollywood A-listers to international musicians and athletes, we coordinate appearances across 25+ countries.",
  },
  {
    icon: Star,
    title: "Discretion & Privacy",
    desc: "We handle high-profile bookings with complete confidentiality. NDAs are available on request, and we never disclose client or event details without permission.",
  },
  {
    icon: Sparkles,
    title: "10+ Years of Experience",
    desc: "Over a decade of booking celebrities for events of every size. We&rsquo;ve navigated last-minute cancellations, schedule changes, and complex logistics — so you benefit from our experience.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <FadeIn className="text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-5xl">About Ashencrest</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Ashencrest is a full-service celebrity booking agency based in Los Angeles, California.
          We connect event organizers, brands, and individuals with verified celebrities for
          appearances, endorsements, and private events — handling every detail from inquiry to
          event day.
        </p>
      </FadeIn>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={stat.label} delay={idx * 0.05}>
              <div className="rounded-xl border border-border/60 bg-card p-5 text-center">
                <Icon className="mx-auto size-8 text-primary" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* What We Do */}
      <FadeIn delay={0.1} className="mt-10 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">What We Do</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Ashencrest is a celebrity booking agency. That means we are the intermediary between
            you (the client) and the celebrity (or their management team). When you want to book a
            celebrity for an event, endorsement, or appearance, we handle the entire process:
            identifying the right talent, negotiating fees, drafting contracts, coordinating
            travel and logistics, and managing on-site execution.
          </p>
          <p>
            We are not a talent management agency — we do not represent celebrities. Instead, we
            work on behalf of clients to source and secure the right celebrity for their specific
            needs. This means we can access any celebrity, not just a limited roster. If a
            celebrity is available for bookings, we can reach them.
          </p>
          <p>
            Our services span {SERVICE_DATA.length} categories: autograph signings, private
            reservations, meet & greets, charity events, product endorsements, nightclub
            appearances, business promotions, tradeshow appearances, and corporate events. Each
            service type has its own logistics, pricing structure, and coordination requirements
            — and we handle all of them.
          </p>
        </div>
      </FadeIn>

      {/* Our Story */}
      <FadeIn delay={0.15} className="mt-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">Our Story</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Ashencrest was founded in Los Angeles with a clear mission: make booking a celebrity
            straightforward, transparent, and stress-free. We recognized that the celebrity
            booking industry was opaque — clients often didn&rsquo;t know who to contact, how
            pricing worked, or what to expect. We set out to change that.
          </p>
          <p>
            Over the past decade, we have built relationships with talent agencies, management
            firms, publicists, and directly with celebrities across the entertainment, sports,
            business, and media worlds. Today, our roster includes over {CELEBRITIES.length}{" "}
            celebrities across {CATEGORIES.length} categories — from Oscar-winning actors and
            chart-topping musicians to Olympic athletes, bestselling authors, and Fortune 500
            entrepreneurs.
          </p>
          <p>
            We have coordinated over 1,200 events across 25+ countries, ranging from intimate
            private dinners to stadium-scale corporate conferences. Every booking is handled by
            a dedicated coordinator who stays with you from the first inquiry through post-event
            follow-up.
          </p>
        </div>
      </FadeIn>

      {/* How It Works */}
      <div className="mt-10">
        <h2 className="font-heading text-2xl font-bold text-foreground">How Booking Works</h2>
        <p className="mt-2 text-muted-foreground">
          From your first inquiry to event day, here is exactly what happens when you book a
          celebrity through Ashencrest.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="h-full rounded-xl border border-border/60 bg-card p-6">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Talent Types */}
      <FadeIn delay={0.1} className="mt-10 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">Talent Types We Book</h2>
        <p className="mt-2 text-muted-foreground">
          We work with celebrities across every major category of public figure.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {TALENT_TYPES.map((talent) => (
            <div key={talent} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background px-3 py-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="text-sm text-foreground">{talent}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Event Types */}
      <FadeIn delay={0.15} className="mt-6 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">Event Types We Handle</h2>
        <p className="mt-2 text-muted-foreground">
          From corporate conferences to private parties, here are the types of events we
          coordinate celebrity appearances for.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((event) => (
            <div key={event} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background px-3 py-2">
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="text-sm text-foreground">{event}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Why Choose Us */}
      <div className="mt-10">
        <h2 className="font-heading text-2xl font-bold text-foreground">Why Choose Ashencrest</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, idx) => {
            const Icon = value.icon;
            return (
              <FadeIn key={value.title} delay={idx * 0.05}>
                <div className="h-full rounded-xl border border-border/60 bg-card p-6">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Get in Touch — Book a Session */}
      <FadeIn delay={0.2} className="mt-10 rounded-xl border border-border/60 bg-card p-6 sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground">Get in Touch</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every booking inquiry is handled by a dedicated coordinator. You will have a single
          point of contact throughout the entire process — from the first email to
          post-event follow-up. No call centers, no ticketing systems, no getting passed around.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/book-a-celebrity"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Book a Session <ArrowRight className="size-4" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Email Us
          </a>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.3} className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-secondary/30 p-8 text-center sm:p-12">
        <h2 className="font-heading text-2xl font-bold text-foreground">Ready to Book?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Submit a booking inquiry and receive a personalized quote within 24 hours. No account
          needed, no obligation.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/book-a-celebrity" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80">
            Book a Celebrity <ArrowRight className="size-4" />
          </a>
          <a href="/contact" className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-8 text-base font-medium text-foreground transition-colors hover:bg-muted">
            Contact Us
          </a>
        </div>
      </FadeIn>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
