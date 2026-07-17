import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { ATS_TREND } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ShieldCheck, CheckCircle2, AlertTriangle, X } from "lucide-react";

export const Route = createFileRoute("/ats-score")({
  head: () => ({ meta: [{ title: "ATS Score · Career Intelligence" }, { name: "description", content: "Deep ATS compatibility analysis across 12 major applicant tracking systems." }] }),
  component: Page,
});

const ATS_SYSTEMS = [
  { name: "Workday", score: 96, status: "pass" },
  { name: "Greenhouse", score: 94, status: "pass" },
  { name: "Lever", score: 92, status: "pass" },
  { name: "Taleo", score: 88, status: "pass" },
  { name: "iCIMS", score: 85, status: "pass" },
  { name: "SmartRecruiters", score: 91, status: "pass" },
  { name: "BambooHR", score: 89, status: "pass" },
  { name: "SuccessFactors", score: 82, status: "warn" },
  { name: "JazzHR", score: 78, status: "warn" },
  { name: "Recruitee", score: 90, status: "pass" },
  { name: "Zoho Recruit", score: 87, status: "pass" },
  { name: "Manatal", score: 84, status: "pass" },
];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Resume Intelligence" title="ATS Compatibility Score" subtitle="How your resume performs against 12 leading applicant tracking systems." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard className="lg:col-span-4" title="Overall ATS Score">
          <div className="grid place-items-center py-4">
            <Ring value={92} tone="success" size={180} stroke={14} label="ATS" sublabel="Excellent" />
          </div>
          <div className="text-center text-xs text-muted-foreground">Beats <span className="text-success font-medium">94%</span> of resumes for ML Engineer roles.</div>
        </GlassCard>

        <GlassCard className="lg:col-span-8" title="Score Trend" description="Improvements over the last 12 months">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={ATS_TREND}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.17 152)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.72 0.17 152)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <YAxis tick={{ fill: "oklch(0.72 0.02 258)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.032 258)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="ats" stroke="oklch(0.72 0.17 152)" fill="url(#ag)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Per-System Compatibility" className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-2">
            {ATS_SYSTEMS.map((s) => (
              <div key={s.name} className="p-3 rounded-lg bg-white/[0.03] border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{s.name}</div>
                  <Badge tone={s.status === "pass" ? "success" : "warning"}>{s.score}</Badge>
                </div>
                <Progress value={s.score} tone={s.status === "pass" ? "success" : "warning"} className="mt-2" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Compatibility Checks" description="What passed and what needs attention" className="lg:col-span-5">
          <div className="space-y-2">
            {[
              { label: "Machine-readable text (no images/tables in text zones)", ok: true },
              { label: "Standard section headings (Experience, Education, Skills)", ok: true },
              { label: "Consistent date formatting (MMM YYYY)", ok: true },
              { label: "Contact info in the header (not footer)", ok: true },
              { label: "PDF ≤ 2 MB, single column, no text in images", ok: true },
              { label: "Length: 1.5 pages — slightly over target of 1", ok: false, warn: true },
              { label: "Uses tables for skill grid (some ATS mis-parse)", ok: false, warn: false },
              { label: "Consistent font family throughout", ok: true },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-2 text-xs p-2 rounded-lg hover:bg-white/[0.03]">
                {c.ok ? <CheckCircle2 className="w-4 h-4 text-success mt-0.5" /> : c.warn ? <AlertTriangle className="w-4 h-4 text-warning mt-0.5" /> : <X className="w-4 h-4 text-destructive mt-0.5" />}
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard title="AI Recommendation" description="Explainable — why we scored this way">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2"><ShieldCheck className="w-4 h-4" /> Trust score: 92%</div>
          <p className="text-sm leading-relaxed">
            Your resume scores <span className="font-semibold text-success">92/100</span> on ATS compatibility. It parses cleanly across Workday, Greenhouse and Lever (top 3 systems used by target companies).
            Two flags reduced the score: (1) using a skill grid table — SuccessFactors and JazzHR occasionally mis-parse cells;
            and (2) length exceeds the 1-page recommendation for &lt;5 YoE. Fixing these should bring you to ~97/100.
          </p>
        </div>
      </GlassCard>
    </AppLayout>
  );
}
