import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { CANDIDATES, SKILL_RADAR } from "@/lib/mock-data";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { Trophy, Download, GitCompare } from "lucide-react";

export const Route = createFileRoute("/compare-candidates")({
  head: () => ({ meta: [{ title: "Compare Candidates · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  const three = CANDIDATES.slice(0, 3);
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Recruiter"
        title="Candidate Comparison"
        subtitle="Side-by-side AI comparison — strengths, weaknesses, and automatic ranking."
        actions={<button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-white text-sm font-medium"><Download className="w-4 h-4" /> Export shortlist</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {three.map((c, i) => (
          <GlassCard key={c.id} className={i === 0 ? "ring-1 ring-success/40 shadow-[var(--shadow-glow-success)]" : ""}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl gradient-primary-bg grid place-items-center text-sm font-semibold text-white">{c.avatar}</div>
              <div>
                <div className="flex items-center gap-2"><div className="font-semibold">{c.name}</div>{i === 0 && <Badge tone="success"><Trophy className="w-3 h-3" /> #1</Badge>}</div>
                <div className="text-[11px] text-muted-foreground">{c.role} · {c.exp}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="text-lg font-semibold">{c.ats}</div><div className="text-[10px] text-muted-foreground">ATS</div></div>
              <div><div className="text-lg font-semibold text-success">{c.match}%</div><div className="text-[10px] text-muted-foreground">Match</div></div>
              <div><div className="text-lg font-semibold">{c.trust}</div><div className="text-[10px] text-muted-foreground">Trust</div></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">{c.skills.map(s => <Badge key={s} tone="primary">{s}</Badge>)}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <GlassCard title="Strength Radar" className="lg:col-span-6">
          <div className="h-[320px]">
            <ResponsiveContainer>
              <RadarChart data={SKILL_RADAR}>
                <PolarGrid stroke="oklch(1 0 0 / 0.06)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <PolarRadiusAxis stroke="transparent" tick={false} />
                <Radar name={three[0].name} dataKey="value" stroke="oklch(0.65 0.2 260)" fill="oklch(0.65 0.2 260)" fillOpacity={0.3} />
                <Radar name={three[1].name} dataKey="target" stroke="oklch(0.72 0.17 152)" fill="oklch(0.72 0.17 152)" fillOpacity={0.2} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Comparison Matrix" className="lg:col-span-6" padded={false}>
          <table className="w-full text-sm">
            <thead><tr className="text-[11px] uppercase text-muted-foreground tracking-widest"><th className="text-left py-3 px-5 font-medium">Dimension</th>{three.map(c => <th key={c.id} className="text-right px-3 font-medium">{c.name.split(" ")[0]}</th>)}</tr></thead>
            <tbody>
              {[
                ["Years of experience", ["4.2","5.1","3.6"]],
                ["Publications", ["3","0","2"]],
                ["OSS contributions", ["High","Medium","High"]],
                ["Salary expectation", ["₹42L","₹48L","₹36L"]],
                ["Notice period", ["30 days","60 days","Immediate"]],
                ["Communication score", ["9.1","8.4","8.8"]],
              ].map(([k, vs]) => (
                <tr key={k as string} className="border-t border-border/50">
                  <td className="py-2.5 px-5 text-muted-foreground text-xs">{k}</td>
                  {(vs as string[]).map((v, i) => <td key={i} className="text-right px-3 text-sm font-medium">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      <GlassCard title="AI Recommendation">
        <div className="p-4 rounded-xl bg-gradient-to-br from-success/15 to-primary/10 border border-success/30">
          <div className="inline-flex items-center gap-2 text-success text-xs font-medium mb-2"><GitCompare className="w-4 h-4" /> Recommended shortlist order</div>
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">Ananya Sharma</span> is the strongest technical fit (96% match, top-quartile ATS at 94, 3 published papers). <span className="font-semibold">Priya Nair</span> is a close second — better fit for immediate join. <span className="font-semibold">Rahul Verma</span> is the strongest culture-fit but has a 60-day notice and higher comp expectation.
            Suggested action: fast-track Ananya to onsite; interview Priya for backup; keep Rahul warm.
          </p>
        </div>
      </GlassCard>
    </AppLayout>
  );
}
