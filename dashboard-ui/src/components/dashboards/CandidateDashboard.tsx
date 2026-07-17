import { useCandidateDashboard } from "@/hooks/useCandidateDashboard";
import { PageHeader } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/ui-kit/StatCard";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";

import {
  SKILL_RADAR,
  ATS_TREND,
} from "@/lib/mock-data";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  UploadCloud,
  FileText,
  CheckCircle2,
} from "lucide-react";


import { useMode } from "@/lib/mode-store";
import { useUser } from "@/hooks/useUser";


const CHART_GRID = "oklch(1 0 0 / 0.06)";

const TICK = {
  fill: "oklch(0.72 0.02 258)",
  fontSize: 11,
};

function TT({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="glass-strong rounded-lg px-3 py-2 text-xs shadow-[var(--shadow-elevated)]">
      {label && (
        <div className="text-muted-foreground mb-1">
          {label}
        </div>
      )}

      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: p.color || p.fill }}
          />

          <span>{p.name}</span>

          <span className="ml-auto font-medium">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
}



export default function CandidateDashboard() {
  console.log("CandidateDashboard mounted");

  const user = useUser();

const { dashboard, loading } = useCandidateDashboard();

console.log("loading:", loading);
console.log("dashboard:", dashboard);
console.log("resumeBreakdown:", dashboard?.resumeBreakdown);


if (loading) {
  return <div className="p-8">Loading dashboard...</div>;
}

if (!dashboard) {
  return <div className="p-8">No dashboard data found.</div>;
}

  return (
    <>
      <PageHeader
        eyebrow="Candidate mode"
     title={`Welcome back, ${user?.name || "User"}`}
subtitle="Manage your resume, track ATS score, and discover opportunities with AI."
        actions={
          <>
           <button
  onClick={() => (window.location.href = "/resume-analyzer")}
  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm hover:bg-white/[0.07]"
>
  <UploadCloud className="w-4 h-4" />
  Upload Resume
</button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
              <Sparkles className="w-4 h-4" /> Ask AI Coach
            </button>
          </>
        }
      />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
<StatCard
  label="Resume Score"
  value={dashboard.stats.resumeScore}
/>

<StatCard
  label="ATS Score"
  value={dashboard.stats.atsScore}
/>

<StatCard
  label="Job Matches"
  value={dashboard.stats.jobMatches}
/>

<StatCard
  label="Skill Coverage"
  value={`${dashboard.stats.skillCoverage}%`}
/>
      </div>

      {/* AI Insights strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
{dashboard.aiInsights.map((i: any, idx: number) => (       
     <div key={idx} className="glass rounded-2xl p-4 flex gap-3">
            <div className={`w-8 h-8 rounded-lg shrink-0 grid place-items-center ${
              i.tone === "success" ? "bg-success/15 text-success" : i.tone === "warning" ? "bg-warning/15 text-warning" : "bg-info/15 text-info"
            }`}>
              {i.tone === "success" ? <CheckCircle2 className="w-4 h-4" /> : i.tone === "warning" ? <Info className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-sm font-medium leading-snug">{i.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{i.detail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Score row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Resume Score" description="Overall content quality" className="lg:col-span-3">
          <div className="grid place-items-center py-3">
<Ring
  value={dashboard.stats.resumeScore}
  tone="primary"
  label="Resume"
  sublabel={dashboard.aiInsights[1]?.detail}
/>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
            <div><div className="font-medium">
  {dashboard.resumeBreakdown?.keywords ?? 0}
</div><div className="text-muted-foreground">Keywords</div></div>
            <div><div className="font-medium">
  {dashboard.resumeBreakdown?.grammar ?? 0}
</div><div className="text-muted-foreground">Grammar</div></div>
            <div><div className="font-medium">
  {dashboard.resumeBreakdown?.impact ?? 0}
</div><div className="text-muted-foreground">Impact</div></div>
          </div>
        </GlassCard>

        <GlassCard title="ATS Compatibility" description="Parsed by 12 major ATS systems" className="lg:col-span-3">
          <div className="grid place-items-center py-3">
<Ring
  value={dashboard.stats.atsScore}
  tone="success"
  label="ATS"
  sublabel={
    dashboard.stats.atsScore >= 80
      ? "Excellent"
      : dashboard.stats.atsScore >= 60
      ? "Good"
      : "Needs Work"
  }
/>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2">
            <div><div className="font-medium text-success">✓</div><div className="text-muted-foreground">Format</div></div>
            <div><div className="font-medium text-success">✓</div><div className="text-muted-foreground">Sections</div></div>
            <div><div className="font-medium text-warning">!</div><div className="text-muted-foreground">Length</div></div>
          </div>
        </GlassCard>

        <GlassCard title="Skill Coverage" description="Vs. target role: ML Engineer" className="lg:col-span-6">
          <div className="h-[220px]">
            <ResponsiveContainer>
              <RadarChart data={SKILL_RADAR} outerRadius="78%">
                <PolarGrid stroke={CHART_GRID} />
                <PolarAngleAxis dataKey="skill" tick={TICK} />
                <PolarRadiusAxis stroke="transparent" tick={false} />
                <Radar name="You" dataKey="value" stroke="oklch(0.65 0.2 260)" fill="oklch(0.65 0.2 260)" fillOpacity={0.35} />
                <Radar name="Target" dataKey="target" stroke="oklch(0.76 0.14 220)" fill="oklch(0.76 0.14 220)" fillOpacity={0.12} />
                <Tooltip content={<TT />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Trends + matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Performance Trend" description="Resume & ATS score over the past year" className="lg:col-span-8">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={ATS_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.2 260)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.2 260)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.17 152)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.72 0.17 152)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis dataKey="month" tick={TICK} stroke={CHART_GRID} />
                <YAxis tick={TICK} stroke={CHART_GRID} />
                <Tooltip content={<TT />} />
                <Area type="monotone" dataKey="resume" stroke="oklch(0.65 0.2 260)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="ats" stroke="oklch(0.72 0.17 152)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Top Job Matches" description="Ranked by AI compatibility" className="lg:col-span-4"
          action={<a href="/job-matches" className="text-xs text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></a>}>
          <div className="space-y-2.5">
            {dashboard.jobMatches.slice(0, 4).map((j) => (
  <div
    key={j.id}
    className="rounded-xl p-3 bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-border/50"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg gradient-primary-bg grid place-items-center text-xs font-semibold text-white shrink-0">
        {j.logo}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">
          {j.role}
        </div>

        <div className="text-[11px] text-muted-foreground truncate">
          {j.company}
          {j.location ? ` • ${j.location}` : ""}
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-semibold text-success">
          {j.match}%
        </div>

        <div className="text-[10px] text-muted-foreground">
          match
        </div>
      </div>
    </div>
  </div>
))}
          </div>
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard title="Recent Activity" className="lg:col-span-5">
          <div className="space-y-3">
            {dashboard.recentActivity.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  a.tone === "success" ? "bg-success" : a.tone === "warning" ? "bg-warning" : a.tone === "accent" ? "bg-accent" : "bg-primary"
                }`} />
                <div className="flex-1 text-sm">
                  <span className="font-medium">{a.actor}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>
                  <div className="text-[10px] text-muted-foreground/70 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Recent Uploads" className="lg:col-span-4">
          <div className="space-y-2">
            {dashboard.recentUploads.map((u) => (
              <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-border/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] grid place-items-center text-muted-foreground">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{u.name}</div>
                  <div className="text-[10px] text-muted-foreground">{u.size} · {u.when}</div>
                </div>
                {u.score ? (
                  <span className="text-xs font-medium text-success">{u.score}</span>
                ) : (
                  <span className="text-[10px] text-warning">Processing…</span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Upcoming" description="Next 7 days" className="lg:col-span-3">
          <div className="space-y-3">
            {dashboard.interviews.map((i) => (
              <div key={i.id} className="p-2.5 rounded-lg bg-white/[0.03] border border-border/50">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {i.time}
                </div>
                <div className="text-sm font-medium mt-1">{i.candidate}</div>
                <div className="text-[11px] text-muted-foreground">{i.role} · {i.type}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}