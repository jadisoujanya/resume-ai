import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { PenLine, Sparkles, Wand2, Copy } from "lucide-react";

export const Route = createFileRoute("/resume-rewriter")({
  head: () => ({ meta: [{ title: "Resume Rewriter · Career Intelligence" }] }),
  component: Page,
});

const REWRITES = [
  {
    section: "Experience · Nimbus Labs",
    before: "Worked as a Machine Learning Engineer on the recommendation team. Built models and improved performance.",
    after: "Machine Learning Engineer, Recommendations (2023–Present) — Owned the two-tower model powering the home feed for 12M DAU. Shipped a candidate-generation refactor lifting CTR +18% and quarterly revenue $2.4M. Cut p95 inference latency 48ms → 22ms by porting to Triton + FP16.",
    delta: "+12 ATS",
  },
  {
    section: "Experience · Loop",
    before: "Backend developer for a startup, worked with Python and databases.",
    after: "Founding Backend Engineer (2021–2023) — Designed and shipped FastAPI + Postgres platform serving 1.2k RPS at 99.98% SLO. Introduced async pooling, cutting cold-start latency 62%. Mentored 3 juniors, established weekly design reviews now adopted org-wide.",
    delta: "+9 ATS",
  },
  {
    section: "Summary",
    before: "Passionate ML engineer with experience in Python and machine learning.",
    after: "ML Engineer with 4.2 years shipping large-scale recommender systems and MLOps platforms. Depth in PyTorch, distributed training, and low-latency serving. Recent focus: LLM inference optimization and platform reliability.",
    delta: "+6 ATS",
  },
];

function Page() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="AI Rewriting"
        title="Resume Rewriter"
        subtitle="Our LLM rewrites each bullet with quantified impact, keyword coverage, and recruiter-optimized phrasing."
        actions={
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
            <Wand2 className="w-4 h-4" /> Rewrite all
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[["ATS uplift","+27 pts"],["Keyword coverage","94%"],["Impact bullets","12 / 14"]].map(([k,v]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-2xl font-semibold mt-1 gradient-text">{v}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {REWRITES.map((r, i) => (
          <GlassCard key={i}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-primary" />
                <div className="text-sm font-semibold">{r.section}</div>
              </div>
              <Badge tone="success">{r.delta}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-border/50">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Before</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.before}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/25">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-medium flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Rewrite</div>
                  <button className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</button>
                </div>
                <p className="text-sm leading-relaxed">{r.after}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
}
