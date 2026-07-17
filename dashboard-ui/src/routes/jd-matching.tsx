import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { CANDIDATES } from "@/lib/mock-data";
import { Target, Sparkles } from "lucide-react";

export const Route = createFileRoute("/jd-matching")({
  head: () => ({ meta: [{ title: "JD Matching · Career Intelligence" }] }),
  component: Page,
});

const SAMPLE_JD = `Senior ML Engineer — Recommender Systems

We're hiring a senior ML engineer to own our home-feed recommender. You'll design candidate generation and ranking, ship LLM-augmented retrieval, and optimize serving latency at scale.

Requirements:
• 4+ years shipping ML systems in production
• Deep PyTorch, distributed training (DDP/FSDP)
• Experience with two-tower / retrieval architectures
• Strong Python, SQL, and system design
• MLOps: MLflow, feature stores, model monitoring
• Cloud (AWS/GCP), Kubernetes a plus`;

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Job Description Matching" subtitle="Paste a JD and rank your entire candidate pool in seconds." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <GlassCard className="lg:col-span-6" title="Job Description" description="Paste any role — our LLM extracts requirements and weights them">
          <textarea defaultValue={SAMPLE_JD} rows={12} className="w-full bg-white/[0.03] border border-border/70 rounded-xl p-3 text-sm outline-none focus:border-primary/50 font-mono leading-relaxed" />
          <button className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg gradient-primary-bg text-white text-sm font-medium"><Sparkles className="w-4 h-4" /> Match candidates</button>
        </GlassCard>

        <GlassCard className="lg:col-span-6" title="Extracted Requirements">
          <div className="space-y-2">
            {[
              { name: "Python + PyTorch", weight: 0.22 },
              { name: "Distributed training (DDP/FSDP)", weight: 0.18 },
              { name: "Recommender systems", weight: 0.18 },
              { name: "MLOps (MLflow, feature store)", weight: 0.14 },
              { name: "System design", weight: 0.12 },
              { name: "Cloud + K8s", weight: 0.10 },
              { name: "SQL / data eng", weight: 0.06 },
            ].map(r => (
              <div key={r.name} className="p-2.5 rounded-lg bg-white/[0.03] border border-border/50">
                <div className="flex justify-between text-xs"><span>{r.name}</span><span className="text-muted-foreground">weight {Math.round(r.weight*100)}%</span></div>
                <Progress value={r.weight * 100 * 4} tone="primary" className="mt-2" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Ranked Matches" description="Ordered by weighted skill × experience × trust">
        <div className="space-y-2">
          {CANDIDATES.map((c, i) => (
            <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-border/50 hover:bg-white/[0.05]">
              <div className="w-8 text-center text-xs text-muted-foreground font-mono">#{i+1}</div>
              <div className="w-9 h-9 rounded-lg gradient-primary-bg grid place-items-center text-[10px] font-semibold text-white">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.role} · {c.exp} · {c.location}</div>
              </div>
              <div className="flex-1 max-w-[220px]"><Progress value={c.match} tone="success" /></div>
              <Badge tone="success">{c.match}%</Badge>
              <button className="text-[11px] px-3 py-1.5 rounded-md gradient-primary-bg text-white font-medium">View</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppLayout>
  );
}
