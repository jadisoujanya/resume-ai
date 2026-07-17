import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { SKILL_RADAR, MISSING_SKILLS } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from "recharts";
import { Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/skill-gap")({
  head: () => ({ meta: [{ title: "Skill Gap · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Career Intelligence" title="Skill Gap Analysis" subtitle="Compare your current skills against your target role and market demand." />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard className="lg:col-span-8" title="You vs. Target Role" description="ML Engineer at top-tier AI company">
          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={SKILL_RADAR}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="skill" tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <YAxis tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="value" name="You" fill="oklch(0.65 0.2 260)" radius={[6,6,0,0]} />
                <Bar dataKey="target" name="Target" fill="oklch(0.76 0.14 220)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard className="lg:col-span-4" title="Priority Gaps">
          <div className="space-y-2">
            {MISSING_SKILLS.map((m) => (
              <div key={m.skill} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{m.skill}</div>
                  <Badge tone={m.impact === "high" ? "danger" : "warning"}>{m.impact}</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">Blocks {m.roles} roles · avg salary uplift +18%</div>
                <Progress value={Math.random() * 40 + 20} tone="warning" className="mt-2" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Recommended Focus" description="AI-prioritized based on demand, effort, ROI">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: "Kubernetes (Advanced)", weeks: 6, roi: "+22%", why: "Highest-frequency requirement in 34 target roles." },
            { title: "Distributed Training", weeks: 4, roi: "+18%", why: "Differentiator for staff-level ML positions." },
            { title: "System Design for ML", weeks: 8, roi: "+15%", why: "Required at senior/staff interview rounds." },
          ].map((r) => (
            <div key={r.title} className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <Target className="w-5 h-5 text-primary mb-2" />
              <div className="text-sm font-semibold">{r.title}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{r.why}</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <Badge tone="accent">{r.weeks}w</Badge>
                <Badge tone="success"><TrendingUp className="w-3 h-3" /> {r.roi} salary</Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppLayout>
  );
}
