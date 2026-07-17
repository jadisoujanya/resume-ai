import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { HIRING_FUNNEL, SKILL_DEMAND, PERFORMANCE_TREND, ATS_TREND } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area } from "recharts";

export const Route = createFileRoute("/hiring-analytics")({
  head: () => ({ meta: [{ title: "Hiring Analytics · Career Intelligence" }] }),
  component: Page,
});

const CHART_GRID = "oklch(1 0 0 / 0.06)";
const TICK = { fill: "oklch(0.72 0.02 258)", fontSize: 11 };

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Hiring Analytics" subtitle="End-to-end funnel, quality, cost-per-hire and skill supply trends across your org." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[["Time to hire","23 days","−4d"],["Offer acceptance","78%","+3%"],["Cost / hire","₹42k","−12%"],["Quality of hire","8.4/10","+0.2"]].map(([k,v,d]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-2xl font-semibold mt-1">{v}</div>
            <div className="text-[11px] text-success mt-1">{d}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <GlassCard title="Funnel · 90 days" className="lg:col-span-6">
          <div className="h-[280px]"><ResponsiveContainer><BarChart data={HIRING_FUNNEL} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} horizontal={false}/><XAxis type="number" tick={TICK}/><YAxis type="category" dataKey="stage" width={90} tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Bar dataKey="value" fill="oklch(0.65 0.2 260)" radius={[0,8,8,0]}/></BarChart></ResponsiveContainer></div>
        </GlassCard>
        <GlassCard title="Pipeline over time" className="lg:col-span-6">
          <div className="h-[280px]"><ResponsiveContainer><LineChart data={PERFORMANCE_TREND}><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID}/><XAxis dataKey="day" tick={TICK}/><YAxis tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/><Line dataKey="applications" stroke="oklch(0.65 0.2 260)" strokeWidth={2} dot={false}/><Line dataKey="interviews" stroke="oklch(0.76 0.14 220)" strokeWidth={2} dot={false}/><Line dataKey="offers" stroke="oklch(0.72 0.17 152)" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard title="Skill Demand vs Supply" className="lg:col-span-7">
          <div className="h-[280px]"><ResponsiveContainer><BarChart data={SKILL_DEMAND}><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID}/><XAxis dataKey="skill" tick={TICK}/><YAxis tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/><Bar dataKey="demand" fill="oklch(0.65 0.2 260)" radius={[6,6,0,0]}/><Bar dataKey="supply" fill="oklch(0.72 0.17 152)" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
        </GlassCard>
        <GlassCard title="Candidate Quality Trend" className="lg:col-span-5">
          <div className="h-[280px]"><ResponsiveContainer><AreaChart data={ATS_TREND}><defs><linearGradient id="q1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.65 0.2 260)" stopOpacity={.5}/><stop offset="100%" stopColor="oklch(0.65 0.2 260)" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID}/><XAxis dataKey="month" tick={TICK}/><YAxis tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Area dataKey="ats" stroke="oklch(0.65 0.2 260)" fill="url(#q1)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
