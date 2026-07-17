import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { CANDIDATES } from "@/lib/mock-data";
import { Search, Filter, Download, MoreVertical, Star } from "lucide-react";

export const Route = createFileRoute("/resume-library")({
  head: () => ({ meta: [{ title: "Resume Library · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  const rows = [...CANDIDATES, ...CANDIDATES.map(c => ({ ...c, id: c.id + 100 }))];
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Resume Library" subtitle="1,284 parsed candidates across 17 open roles. Search semantically or filter by skill, ATS score, or trust." />

      <GlassCard className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-[240px] flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-border/70">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Semantic search: 'ML engineer with distributed training experience'" />
          </div>
          {["ATS ≥ 85","Bengaluru","3–6 yrs","Python","AWS"].map(f => <Badge key={f} tone="primary">{f} ×</Badge>)}
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-xs"><Filter className="w-3.5 h-3.5" /> More filters</button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-xs"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
      </GlassCard>

      <GlassCard padded={false}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left font-medium py-3 px-5">Candidate</th>
              <th className="text-left font-medium">Role</th>
              <th className="text-left font-medium">Skills</th>
              <th className="text-right font-medium">ATS</th>
              <th className="text-right font-medium">Match</th>
              <th className="text-right font-medium">Trust</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-border/50 hover:bg-white/[0.02]">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg gradient-primary-bg grid place-items-center text-[10px] font-semibold text-white">{c.avatar}</div>
                    <div><div className="font-medium">{c.name}</div><div className="text-[11px] text-muted-foreground">{c.location} · {c.exp}</div></div>
                  </div>
                </td>
                <td>{c.role}</td>
                <td><div className="flex flex-wrap gap-1">{c.skills.map(s => <Badge key={s}>{s}</Badge>)}</div></td>
                <td className="text-right"><div className="inline-block w-16"><div className="text-xs mb-1">{c.ats}</div><Progress value={c.ats} tone="success" /></div></td>
                <td className="text-right"><Badge tone="success">{c.match}%</Badge></td>
                <td className="text-right font-medium">{c.trust}</td>
                <td className="pr-4 text-right"><button className="p-1.5 rounded-lg hover:bg-white/[0.05]"><Star className="w-4 h-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </AppLayout>
  );
}
