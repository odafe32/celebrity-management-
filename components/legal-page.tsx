import { FadeIn } from "@/components/fade-in";

export type LegalSection = {
  title: string;
  body: string;
};

export function LegalPage({
  title,
  updated,
 sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading text-3xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      </FadeIn>
      <div className="mt-8 space-y-6">
        {sections.map((section, idx) => (
          <FadeIn key={idx} delay={idx * 0.03}>
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="font-heading text-lg font-bold text-foreground">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
