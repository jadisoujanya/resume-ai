import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { FileBarChart, Download, Calendar } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · Career Intelligence" }] }),
  component: Page,
});

const REPORTS = [
  { title: "Weekly Hiring Snapshot", date: "Jul 1 — Jul 7, 2026", pages: 6, tone: "primary" },
  { title: "Q2 Recruitment Report", date: "Apr — Jun, 2026", pages: 24, tone: "accent" },
  { title: "ML Engineer Pipeline · Deep Dive", date: "Jun 2026", pages: 12, tone: "success" },
  { title: "Diversity & Inclusion Report", date: "H1 2026", pages: 18, tone: "warning" },
  { title: "Cost of Hire Analysis", date: "Jun 2026", pages: 9, tone: "primary" },
  { title: "AI Screening Effectiveness", date: "Jun 2026", pages: 15, tone: "accent" },
];

function Page() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Recruiter" title="Reports"
        subtitle="Auto-generated PDFs, exportable dashboards and scheduled deliveries."
        actions={<button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-white text-sm font-medium"><FileBarChart className="w-4 h-4" /> Generate report</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map(r => (
          <GlassCard key={r.title}>
            <div className={`w-11 h-11 rounded-xl grid place-items-center mb-3 ${
              r.tone === "primary" ? "bg-primary/15 text-primary" :
              r.tone === "accent" ? "bg-accent/15 text-accent" :
              r.tone === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
            }`}><FileBarChart className="w-5 h-5" /></div>
            <div className="text-sm font-semibold">{r.title}</div>
            <div className="text-[11px] text-muted-foreground mt-1 inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {r.date} · {r.pages} pages</div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 py-2 rounded-lg gradient-primary-bg text-white text-xs font-medium inline-flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download</button>
              <button className="px-3 py-2 rounded-lg bg-white/[0.05] border border-border/70 text-xs">Preview</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
}
