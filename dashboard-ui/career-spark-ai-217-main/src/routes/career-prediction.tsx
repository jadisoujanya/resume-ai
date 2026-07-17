import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { CAREER_PATHS, SKILL_RADAR } from "@/lib/mock-data";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { TrendingUp, IndianRupee, Briefcase, ArrowRight, Sparkles, Target } from "lucide-react";

export const Route = createFileRoute("/career-prediction")({
  head: () => ({ meta: [
    { title: "Career Prediction · Career Intelligence" },
    { name: "description", content: "AI-predicted career paths with role summaries, market signals, and project outputs tailored to your resume." },
  ] }),
  component: Page,
});

function Page() {
  const [top, ...rest] = CAREER_PATHS;

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Career Intelligence"
        title="Recommended Career Paths"
        subtitle="An ML model trained on 4.2M resumes and hiring outcomes ranks these roles for your profile — with role scope, market signals, and project deliverables you can build to prove readiness."
        actions={
          <Link to="/career-roadmap" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
            <Sparkles className="w-4 h-4" /> View full roadmap
          </Link>
        }
      />

      {/* Top match hero */}
      <GlassCard className="mb-6 ring-1 ring-primary/30 shadow-[var(--shadow-glow-primary)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">{top.emoji}</div>
              <h2 className="text-2xl font-semibold tracking-tight">{top.title}</h2>
              <Badge tone="primary">Top match</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{top.summary}</p>
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="text-sm"><span className="font-medium text-primary">Outcome · </span>{top.outcome}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Growth", <span className="inline-flex items-center gap-1 text-success"><TrendingUp className="w-3.5 h-3.5" /> {top.growth}</span>],
                ["Median", <span className="inline-flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" />{top.median.replace("₹","")}</span>],
                ["Openings", <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {top.openings}</span>],
              ].map(([k, v], i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                  <div className="text-sm font-medium mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white/[0.03] border border-border/50 p-5 h-full">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Model confidence</div>
              <div className="text-5xl font-semibold gradient-text mt-1">{top.confidence}%</div>
              <Progress value={top.confidence} tone="primary" className="mt-3" />
              <div className="text-xs text-muted-foreground mt-3">Based on skill overlap, trajectory, portfolio depth and live market demand.</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Project outputs you should build</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {top.projectOutputs.map((p) => (
              <div key={p.title} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Other roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {rest.map((c) => (
          <GlassCard key={c.key}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.emoji}</span>
                  <h3 className="text-lg font-semibold tracking-tight truncate">{c.title}</h3>
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">{c.summary}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-semibold gradient-text">{c.confidence}%</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">confidence</div>
              </div>
            </div>
            <Progress value={c.confidence} tone="accent" />

            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-border/40">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Growth</div>
                <div className="font-medium text-success inline-flex items-center gap-1 mt-0.5"><TrendingUp className="w-3 h-3" /> {c.growth}</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-border/40">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Median</div>
                <div className="font-medium inline-flex items-center gap-0.5 mt-0.5"><IndianRupee className="w-3 h-3" />{c.median.replace("₹","")}</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-border/40">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Openings</div>
                <div className="font-medium mt-0.5">{c.openings}</div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-white/[0.02]">
              <Target className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
              <div><span className="text-foreground font-medium">Outcome · </span>{c.outcome}</div>
            </div>

            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Project outputs</div>
              <div className="space-y-1.5">
                {c.projectOutputs.map((p) => (
                  <div key={p.title} className="flex items-start gap-2 text-xs">
                    <ArrowRight className="w-3 h-3 mt-0.5 text-primary shrink-0" />
                    <div><span className="font-medium">{p.title}</span> — <span className="text-muted-foreground">{p.detail}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Why + radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard title={`Why ${top.title}?`} description="Explainable decision breakdown" className="lg:col-span-7">
          <div className="space-y-3">
            {[
              { factor: "Skill overlap with role JD", weight: 0.34, score: 0.92 },
              { factor: "Trajectory momentum (last 3 roles)", weight: 0.22, score: 0.88 },
              { factor: "Certifications & education fit", weight: 0.14, score: 0.80 },
              { factor: "Project portfolio depth", weight: 0.18, score: 0.86 },
              { factor: "Market signal (open roles / demand)", weight: 0.12, score: 0.94 },
            ].map((f) => (
              <div key={f.factor} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-medium">{f.factor}</div>
                  <div className="text-muted-foreground">weight {Math.round(f.weight*100)}% · score {Math.round(f.score*100)}</div>
                </div>
                <Progress value={f.score*100} className="mt-2" tone="primary" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Fit Radar" description="You vs. role requirements" className="lg:col-span-5">
          <div className="h-[300px]">
            <ResponsiveContainer>
              <RadarChart data={SKILL_RADAR} outerRadius="78%">
                <PolarGrid stroke="oklch(1 0 0 / 0.06)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <PolarRadiusAxis stroke="transparent" tick={false} />
                <Radar name="You" dataKey="value" stroke="oklch(0.65 0.2 260)" fill="oklch(0.65 0.2 260)" fillOpacity={0.35} />
                <Radar name="Role" dataKey="target" stroke="oklch(0.72 0.17 152)" fill="oklch(0.72 0.17 152)" fillOpacity={0.15} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
