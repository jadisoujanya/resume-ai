import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { TrendingUp, IndianRupee, Briefcase, ArrowRight, Sparkles, Target } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/career-prediction")({
  head: () => ({ meta: [
    { title: "Career Prediction · Career Intelligence" },
    { name: "description", content: "AI-predicted career paths with role summaries, market signals, and project outputs tailored to your resume." },
  ] }),
  component: Page,
});

function Page() {

  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

  const stored = localStorage.getItem("resume_analysis");

    if (stored) {
  
    setAnalysis(JSON.parse(stored));
    
  }
}, []);

  if (!analysis) {
  return <div>Loading...</div>;
}

const prediction = analysis.career_prediction ?? {};
const top = prediction.primary_role ?? {};
const rest = prediction.alternative_roles ?? [];

  const radarData = [
  {
    skill: "Resume",
    value: analysis.resume_score ?? 0,
    target: 100,
  },
  {
    skill: "ATS",
    value: analysis.ats_score ?? 0,
    target: 100,
  },
  {
    skill: "Confidence",
    value: top?.confidence ?? 0,
    target: 100,
  },
];

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
              <div className="text-3xl">🎯</div>
              <h2 className="text-2xl font-semibold tracking-tight">{top?.role}</h2>
              <Badge tone="primary">Top match</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{top?.description}</p>
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="text-sm"><span className="font-medium text-primary">Outcome · </span>{top?.reason}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Growth", <span className="inline-flex items-center gap-1 text-success"><TrendingUp className="w-3.5 h-3.5" /> {top?.growth}</span>],
                ["Median", <span className="inline-flex items-center gap-0.5"><IndianRupee className="w-3.5 h-3.5" />{top.salary ?? "N/A"}</span>],
                ["Openings", <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {top?.jobs}</span>],
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
              <div className="text-5xl font-semibold gradient-text mt-1">{top?.confidence}%</div>
              <Progress value={top?.confidence} tone="primary" className="mt-3" />
              <div className="text-xs text-muted-foreground mt-3">Based on skill overlap, trajectory, portfolio depth and live market demand.</div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Project outputs you should build</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {top?.projectOutputs?.map((p: any) => (
              <div key={p.title} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Other roles */}
   


   {/* Alternative Roles */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

{rest.map((career: any) => (

<GlassCard key={career.role}>

<div className="flex justify-between items-center">

<div>

<h3 className="text-lg font-semibold">
{career.role}
</h3>

<p className="text-sm text-muted-foreground">
{career.description}
</p>

</div>

<Badge tone="primary">
{career.confidence}%
</Badge>

</div>

<Progress value={career.confidence} className="mt-3"/>

</GlassCard>

))}

</div>



      {/* Why + radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      



<GlassCard
  title={`Why ${top.role}?`}
  description="Explainable decision breakdown"
  className="lg:col-span-7"
>

  <div className="space-y-6">

    <div>
      <h3 className="font-semibold text-primary">
        Why this role?
      </h3>

      <p className="text-sm text-muted-foreground mt-2">
        {top.reason}
      </p>
    </div>

    <div>
      <h3 className="font-semibold">
        Career Description
      </h3>

      <p className="text-sm text-muted-foreground mt-2">
        {top.description}
      </p>
    </div>

  </div>

</GlassCard>





        <GlassCard title="Fit Radar" description="You vs. role requirements" className="lg:col-span-5">
          <div className="h-[300px]">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
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
