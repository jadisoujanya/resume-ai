import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { JOB_MATCHES } from "@/lib/mock-data";
import { MapPin, IndianRupee, Bookmark, Sparkles, Filter } from "lucide-react";

export const Route = createFileRoute("/job-matches")({
  head: () => ({ meta: [{ title: "Job Matches · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Jobs"
        title="Your Job Matches"
        subtitle="Ranked by AI compatibility — combining resume fit, skill overlap, salary, location and culture signal."
        actions={<button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm"><Filter className="w-4 h-4" /> Filters</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {JOB_MATCHES.map((j) => (
          <GlassCard key={j.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl gradient-primary-bg grid place-items-center text-sm font-semibold text-white">{j.logo}</div>
                <div>
                  <div className="font-semibold text-sm">{j.role}</div>
                  <div className="text-[11px] text-muted-foreground">{j.company}</div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/[0.05]"><Bookmark className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-1 text-[11px] text-muted-foreground">
              <div className="inline-flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {j.location}</div>
              <div className="inline-flex items-center gap-1.5"><IndianRupee className="w-3 h-3" /> {j.salary}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {j.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1"><span className="text-muted-foreground">AI Match</span><span className="font-semibold text-success">{j.match}%</span></div>
              <Progress value={j.match} tone="success" />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 rounded-lg gradient-primary-bg text-white text-sm font-medium inline-flex items-center justify-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Tailor & apply</button>
              <button className="px-3 py-2 rounded-lg bg-white/[0.05] border border-border/70 text-sm">Details</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
}
