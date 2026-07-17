import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { LEARNING } from "@/lib/mock-data";
import { GraduationCap, Clock, Award } from "lucide-react";

export const Route = createFileRoute("/learning")({
  head: () => ({ meta: [{ title: "Learning · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Career Intelligence" title="Learning Recommendations" subtitle="Curated courses & certifications ranked by relevance to your gaps and target roles." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING.map((l) => (
          <GlassCard key={l.title}>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl gradient-primary-bg grid place-items-center shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold">{l.title}</h3>
                  <Badge tone="success">{l.relevance}% match</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{l.provider}</div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {l.weeks} weeks</span>
                  <span className="inline-flex items-center gap-1"><Award className="w-3 h-3" /> {l.level}</span>
                </div>
                <Progress value={l.relevance} className="mt-3" />
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary-bg text-white font-medium">Enroll</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-border/70">Preview</button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
}
