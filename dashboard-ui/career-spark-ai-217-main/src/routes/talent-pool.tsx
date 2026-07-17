import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { CANDIDATES } from "@/lib/mock-data";
import { Users, Tag, Mail } from "lucide-react";

export const Route = createFileRoute("/talent-pool")({
  head: () => ({ meta: [{ title: "Talent Pool · Career Intelligence" }] }),
  component: Page,
});

const POOLS = [
  { name: "ML Engineers · Bengaluru", count: 184, tags: ["Python","PyTorch"], color: "primary" },
  { name: "Senior Frontend", count: 92, tags: ["React","Next.js"], color: "accent" },
  { name: "DevOps · Remote", count: 68, tags: ["K8s","Terraform"], color: "success" },
  { name: "Data Scientists · Hybrid", count: 121, tags: ["SQL","LLMs"], color: "warning" },
];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Talent Pool" subtitle="Curated candidate pools for evergreen roles. AI keeps them warm with periodic outreach and updates." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {POOLS.map(p => (
          <GlassCard key={p.name}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl grid place-items-center ${
                p.color === "primary" ? "bg-primary/15 text-primary" :
                p.color === "accent" ? "bg-accent/15 text-accent" :
                p.color === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
              }`}><Users className="w-5 h-5" /></div>
              <div className="flex-1"><div className="text-sm font-semibold">{p.name}</div><div className="text-[11px] text-muted-foreground">{p.count} candidates</div></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">{p.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
            <button className="mt-3 w-full text-xs py-2 rounded-lg bg-white/[0.05] border border-border/70">View pool</button>
          </GlassCard>
        ))}
      </div>

      <GlassCard title="ML Engineers · Bengaluru" description="184 candidates · last synced 4h ago" padded={false}>
        <ul className="divide-y divide-border/50">
          {CANDIDATES.map(c => (
            <li key={c.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg gradient-primary-bg grid place-items-center text-[11px] font-semibold text-white">{c.avatar}</div>
              <div className="flex-1 min-w-0"><div className="text-sm font-medium">{c.name}</div><div className="text-[11px] text-muted-foreground">{c.role} · {c.exp} · {c.location}</div></div>
              <div className="hidden md:flex gap-1">{c.skills.slice(0,3).map(s => <Badge key={s}>{s}</Badge>)}</div>
              <Badge tone="success">{c.match}%</Badge>
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><Mail className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><Tag className="w-4 h-4 text-muted-foreground" /></button>
            </li>
          ))}
        </ul>
      </GlassCard>
    </AppLayout>
  );
}
