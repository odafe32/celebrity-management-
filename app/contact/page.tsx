import { Mail, Clock, Headphones, Zap, ShieldCheck } from "lucide-react";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { FadeIn } from "@/components/fade-in";
import { CONTACT } from "@/lib/nav-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ashencrest for celebrity bookings and inquiries. We respond within 24 hours.",
};

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM PST" },
  { day: "Saturday", hours: "10:00 AM – 4:00 PM PST" },
  { day: "Sunday", hours: "Closed (email only)" },
];

const SUPPORT_FEATURES = [
  { icon: Zap, title: "24-Hour Response", desc: "Every inquiry gets a response within 24 hours. Urgent requests are prioritized." },
  { icon: Headphones, title: "Dedicated Coordinator", desc: "You get a single point of contact from inquiry to event day. No call centers." },
  { icon: ShieldCheck, title: "Confidential", desc: "All inquiries are handled with discretion. NDAs available on request." },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <FadeIn className="text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Have a question about booking a celebrity? We&rsquo;re here to help. Send us an email and
          a dedicated coordinator will respond within 24 hours.
        </p>
      </FadeIn>

      {/* Support features */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SUPPORT_FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <FadeIn key={feature.title} delay={idx * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-card p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Email contact */}
      <FadeIn delay={0.1} className="mt-10">
        <a
          href={`mailto:${CONTACT.email}`}
          className="group flex flex-col items-center rounded-xl border border-border/60 bg-card p-8 text-center transition-colors hover:border-primary/40"
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-8" />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">Email Us</p>
          <p className="mt-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {CONTACT.email}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Best for detailed inquiries. We respond within 24 hours.
          </p>
        </a>
      </FadeIn>

      {/* Business hours */}
      <FadeIn delay={0.15} className="mt-6 rounded-xl border border-border/60 bg-card p-6">
        <div className="flex items-center gap-2">
          <Clock className="size-5 text-primary" />
          <h2 className="font-heading text-lg font-bold text-foreground">Business Hours</h2>
        </div>
        <div className="mt-4 space-y-2">
          {BUSINESS_HOURS.map((bh) => (
            <div key={bh.day} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{bh.day}</span>
              <span className="font-medium text-foreground">{bh.hours}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          All times are Pacific Standard Time (PST). We coordinate events across all time zones.
        </p>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.3} className="mt-10 rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-secondary/30 p-8 text-center sm:p-12">
        <h2 className="font-heading text-2xl font-bold text-foreground">Ready to book a celebrity?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Skip the wait — submit a booking inquiry directly and we&rsquo;ll get back to you with a
          personalized quote within 24 hours.
        </p>
        <a href="/book-a-celebrity" className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80">
          Book a Celebrity
        </a>
      </FadeIn>

      <div className="mt-10">
        <DisclaimerBlock />
      </div>
    </div>
  );
}
