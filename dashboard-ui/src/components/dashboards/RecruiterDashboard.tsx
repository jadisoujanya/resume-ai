import { PageHeader } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/ui-kit/StatCard";
import { GlassCard } from "@/components/ui-kit/GlassCard";

import {
  STATS_RECRUITER,
  SKILL_DEMAND,
  HIRING_FUNNEL,
  SKILL_DISTRIBUTION,
  CANDIDATES,
  INTERVIEWS,
  PERFORMANCE_TREND,
} from "@/lib/mock-data";

import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

import {
  ArrowRight,
  Calendar,
  Plus,
  Zap,
} from "lucide-react";


const CHART_GRID = "oklch(1 0 0 / 0.06)";

const TICK = {
  fill: "oklch(0.72 0.02 258)",
  fontSize: 11,
};

const PIE_COLORS = [
  "oklch(0.65 0.2 260)",
  "oklch(0.72 0.17 152)",
  "oklch(0.76 0.14 220)",
  "oklch(0.78 0.16 75)",
  "oklch(0.7 0.22 320)",
];

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



export default function RecruiterDashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Recruiter mode"
        title="Hiring Command Center"
        subtitle="1,284 active candidates across 17 open roles. AI has pre-screened 386 candidates this week."
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm hover:bg-white/[0.07]">
              <Plus className="w-4 h-4" /> Post role
            </button>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
              <Zap className="w-4 h-4" /> Bulk screen
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STATS_RECRUITER.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Hiring Funnel" description="Last 90 days" className="lg:col-span-8">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={HIRING_FUNNEL} layout="vertical" margin={{ left: 10 }}>
                <defs>
                  <linearGradient id="funnel" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="oklch(0.65 0.2 260)" />
                    <stop offset="100%" stopColor="oklch(0.76 0.14 220)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} horizontal={false} />
                <XAxis type="number" tick={TICK} stroke={CHART_GRID} />
                <YAxis type="category" dataKey="stage" tick={TICK} stroke={CHART_GRID} width={90} />
                <Tooltip content={<TT />} cursor={{ fill: "oklch(1 0 0 / 0.03)" }} />
                <Bar dataKey="value" fill="url(#funnel)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Talent Distribution" description="By domain" className="lg:col-span-4">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={SKILL_DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={3}>
                  {SKILL_DISTRIBUTION.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} stroke="transparent" />)}
                </Pie>
                <Tooltip content={<TT />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Skill Demand vs Supply" description="Your open roles" className="lg:col-span-7">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={SKILL_DEMAND}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis dataKey="skill" tick={TICK} stroke={CHART_GRID} />
                <YAxis tick={TICK} stroke={CHART_GRID} />
                <Tooltip content={<TT />} cursor={{ fill: "oklch(1 0 0 / 0.03)" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="demand" fill="oklch(0.65 0.2 260)" radius={[6,6,0,0]} />
                <Bar dataKey="supply" fill="oklch(0.72 0.17 152)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard title="Pipeline Velocity" description="Applications · Interviews · Offers" className="lg:col-span-5">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <LineChart data={PERFORMANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis dataKey="day" tick={TICK} stroke={CHART_GRID} />
                <YAxis tick={TICK} stroke={CHART_GRID} />
                <Tooltip content={<TT />} />
                <Line type="monotone" dataKey="applications" stroke="oklch(0.65 0.2 260)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="interviews" stroke="oklch(0.76 0.14 220)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="offers" stroke="oklch(0.72 0.17 152)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard title="Top Candidates This Week" className="lg:col-span-8" padded={false}
          action={<a href="/resume-library" className="text-xs text-primary hover:underline mr-5 mt-5 inline-flex items-center gap-1">Library <ArrowRight className="w-3 h-3" /></a>}>
          <div className="px-5 pb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  <th className="text-left font-medium py-2">Candidate</th>
                  <th className="text-left font-medium py-2">Role</th>
                  <th className="text-right font-medium py-2">ATS</th>
                  <th className="text-right font-medium py-2">Match</th>
                  <th className="text-right font-medium py-2">Trust</th>
                </tr>
              </thead>
              <tbody>
                {CANDIDATES.map((c) => (
                  <tr key={c.id} className="border-t border-border/50 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg gradient-primary-bg grid place-items-center text-[10px] font-semibold text-white">{c.avatar}</div>
                        <div><div className="font-medium">{c.name}</div><div className="text-[11px] text-muted-foreground">{c.location} · {c.exp}</div></div>
                      </div>
                    </td>
                    <td>{c.role}</td>
                    <td className="text-right font-medium">{c.ats}</td>
                    <td className="text-right"><span className="px-2 py-0.5 rounded-md bg-success/15 text-success text-xs font-medium">{c.match}%</span></td>
                    <td className="text-right font-medium">{c.trust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard title="Upcoming Interviews" className="lg:col-span-4">
          <div className="space-y-3">
            {INTERVIEWS.map((i) => (
              <div key={i.id} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {i.time}
                </div>
                <div className="text-sm font-medium mt-1">{i.candidate}</div>
                <div className="text-[11px] text-muted-foreground">{i.role} · {i.type} · {i.panel} panelists</div>
                <div className="mt-2 flex gap-2">
                  <button className="text-[10px] px-2 py-1 rounded-md bg-primary/15 text-primary">Join</button>
                  <button className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05]">Reschedule</button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
