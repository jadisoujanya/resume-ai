import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { ScanSearch, UploadCloud, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/bulk-screening")({
  head: () => ({ meta: [{ title: "Bulk Screening · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Bulk Resume Screening" subtitle="Drop hundreds of resumes — AI ranks them against your JD and flags top candidates in minutes." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {[["Total","482"],["Screened","386"],["Above threshold (≥ 80%)","94"]].map(([k,v]) => (
          <div key={k} className="glass rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div><div className="text-2xl font-semibold mt-1">{v}</div></div>
        ))}
      </div>

      <GlassCard className="mb-4">
        <div className="border-2 border-dashed border-border/70 rounded-xl p-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl gradient-primary-bg grid place-items-center shadow-[var(--shadow-glow-primary)]">
            <UploadCloud className="w-6 h-6 text-white" />
          </div>
          <div className="mt-3 text-sm font-medium">Drop a ZIP of resumes or select folder</div>
          <div className="text-[11px] text-muted-foreground">Supports PDF, DOCX up to 5,000 files per batch</div>
        </div>
      </GlassCard>

      <GlassCard title="Screening in progress" description="Batch #4821 · started 6 minutes ago">
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-2"><span className="text-muted-foreground">386 / 482 parsed</span><span className="text-success font-medium">80%</span></div>
          <Progress value={80} tone="success" />
        </div>
        <div className="space-y-2">
          {[
            { name: "Ananya_Sharma.pdf", status: "Ranked #1", score: 96, done: true },
            { name: "Priya_Nair_CV.pdf", status: "Ranked #2", score: 92, done: true },
            { name: "Arjun_Rao_2026.pdf", status: "Ranked #3", score: 90, done: true },
            { name: "Rahul_V.pdf", status: "Parsing…", score: null, done: false },
            { name: "Kabir_Singh.pdf", status: "Queued", score: null, done: false },
          ].map((r, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] border border-border/50 flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg grid place-items-center ${r.done ? "bg-success/15 text-success" : "bg-white/[0.05] text-muted-foreground"}`}>
                {r.done ? <CheckCircle2 className="w-4 h-4" /> : <ScanSearch className="w-4 h-4 animate-pulse" />}
              </div>
              <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{r.name}</div><div className="text-[11px] text-muted-foreground">{r.status}</div></div>
              {r.score && <Badge tone="success">{r.score}%</Badge>}
            </div>
          ))}
        </div>
      </GlassCard>
    </AppLayout>
  );
}
