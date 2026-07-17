import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { ATS_TREND, SKILL_DEMAND, SKILL_DISTRIBUTION, PERFORMANCE_TREND, HIRING_FUNNEL } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Career Intelligence" }] }),
  component: Page,
});

const CHART_GRID = "oklch(1 0 0 / 0.06)";
const TICK = { fill: "oklch(0.72 0.02 258)", fontSize: 11 };
const PIE = ["oklch(0.65 0.2 260)", "oklch(0.72 0.17 152)", "oklch(0.76 0.14 220)", "oklch(0.78 0.16 75)", "oklch(0.7 0.22 320)"];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Analytics" title="Career Analytics" subtitle="Deep-dive metrics on your resume performance, skill demand and market position." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <GlassCard title="ATS & Resume Trend" description="12 months" className="lg:col-span-8">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={ATS_TREND}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.65 0.2 260)" stopOpacity={.5}/><stop offset="100%" stopColor="oklch(0.65 0.2 260)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                <XAxis dataKey="month" tick={TICK} /><YAxis tick={TICK} /><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/>
                <Area dataKey="ats" stroke="oklch(0.65 0.2 260)" fill="url(#a1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard title="Skill Mix" className="lg:col-span-4">
          <div className="h-[260px]"><ResponsiveContainer>
            <PieChart><Pie data={SKILL_DISTRIBUTION} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>{SKILL_DISTRIBUTION.map((_,i)=><Cell key={i} fill={PIE[i]} stroke="transparent" />)}</Pie><Legend iconType="circle" wrapperStyle={{fontSize:11}}/></PieChart>
          </ResponsiveContainer></div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <GlassCard title="Skill Demand vs Supply" className="lg:col-span-7">
          <div className="h-[260px]"><ResponsiveContainer><BarChart data={SKILL_DEMAND}><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID}/><XAxis dataKey="skill" tick={TICK}/><YAxis tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Legend iconType="circle" wrapperStyle={{fontSize:11}}/><Bar dataKey="demand" fill="oklch(0.65 0.2 260)" radius={[6,6,0,0]}/><Bar dataKey="supply" fill="oklch(0.72 0.17 152)" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div>
        </GlassCard>
        <GlassCard title="Application Velocity" className="lg:col-span-5">
          <div className="h-[260px]"><ResponsiveContainer><LineChart data={PERFORMANCE_TREND}><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID}/><XAxis dataKey="day" tick={TICK}/><YAxis tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Line dataKey="applications" stroke="oklch(0.65 0.2 260)" strokeWidth={2} dot={false}/><Line dataKey="interviews" stroke="oklch(0.76 0.14 220)" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div>
        </GlassCard>
      </div>

      <GlassCard title="Funnel" description="Applications → Offers">
        <div className="h-[220px]"><ResponsiveContainer><BarChart data={HIRING_FUNNEL} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} horizontal={false}/><XAxis type="number" tick={TICK}/><YAxis type="category" dataKey="stage" width={90} tick={TICK}/><Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }}/><Bar dataKey="value" fill="oklch(0.65 0.2 260)" radius={[0,8,8,0]}/></BarChart></ResponsiveContainer></div>
      </GlassCard>
    </AppLayout>
  );
}
