import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ShieldCheck, CheckCircle2, AlertTriangle, X } from "lucide-react";

export const Route = createFileRoute("/ats-score")({
  component: Page,
});


function Page() {

  const [analysis, setAnalysis] = useState<any>(undefined);

  const [scoreTrend, setScoreTrend] = useState([]);

useEffect(() => {
  const stored = localStorage.getItem("resume_analysis");

  if (!stored) {
    setAnalysis(null);
    return;
  }

  try {
    setAnalysis(JSON.parse(stored));
    fetch("http://127.0.0.1:8000/score-trend")
     .then(res => res.json())
     .then(data => setScoreTrend(data));
  } catch {
    setAnalysis(null);
  }
}, []);

if (analysis === undefined) {
  return <div>Loading...</div>;
}

if (analysis === null) {
  return <div>No resume analysis found.</div>;
}


console.log("Rendering analysis:", analysis);
  
 const atsScore = analysis.ats_score || 0;
const resumeScore = analysis.resume_score || 0;
const suggestions = analysis.recommendations || [];

const prediction = analysis.career_prediction || {};

const primaryRole =
  prediction.primary_role ||
  {
    role: analysis.detected_role || "Not detected",
    confidence: 0,
    salary: analysis.salary_range || "Not available",
    growth: "Not available",
    jobs: "Not available",
    reason: "Based on detected resume skills."
  };

 return (
    <AppLayout>
      <PageHeader eyebrow="Resume Intelligence" title="ATS Compatibility Score" subtitle="How your resume performs against 12 leading applicant tracking systems." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard className="lg:col-span-4" title="Overall ATS Score">
          <div className="grid place-items-center py-4">
<Ring
    value={atsScore}
    tone="success"
    size={180}
    stroke={14}
    label="ATS"
    sublabel={analysis.career_level || "Excellent"}
/>
          </div>
          <div className="text-center text-xs text-muted-foreground"> Resume Score:
<span className="text-success font-medium">
 {resumeScore}/100
</span></div>
        </GlassCard>

        <GlassCard className="lg:col-span-8" title="Score Trend" description="Improvements over the last 12 months">
          <div className="h-[260px]">
            <ResponsiveContainer>
      <AreaChart
  data={
    scoreTrend.length
      ? scoreTrend
      : [
          {
            month: "Current",
            ats: analysis.ats_score,
          },
        ]
  }
>
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

        <GlassCard title="Compatibility Checks" description="What passed and what needs attention" className="lg:col-span-5">
          <div className="space-y-2">
            {
              suggestions.map((item: string, index: number) => (

<div
key={index}
className="flex items-start gap-2 text-xs p-2 rounded-lg"
>

<AlertTriangle
className="w-4 h-4 text-warning mt-0.5"
/>

<span>{item}</span>

</div>

)
)}
          </div>
        </GlassCard>
      </div>

      <GlassCard title="AI Recommendation" description="Explainable — why we scored this way">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2"><ShieldCheck className="w-4 h-4" /> Trust score: {analysis.trust_score || 0}%</div>
        
<p className="text-sm leading-relaxed">
  Your resume currently scores{" "}
  <span className="font-bold text-success">
    {atsScore}/100
  </span>{" "}
  for ATS compatibility.

  <br /><br />

  <strong>Career Level:</strong> {analysis.career_level}

  <br />

  <strong>Resume Rank:</strong> {analysis.resume_rank}

  <br /><br />

  <strong>Recommended Role:</strong>{" "}
  {primaryRole.role}

  <br />

  <strong>Confidence:</strong>{" "}
  {primaryRole.confidence}%

  <br />

  <strong>Expected Salary:</strong>{" "}
  {primaryRole.salary}

  <br />

  <strong>Industry Growth:</strong>{" "}
  {primaryRole.growth}

  <br />

  <strong>Available Jobs:</strong>{" "}
  {primaryRole.jobs}

  <br /><br />

  <strong>Why this role?</strong>

  <br />

  {primaryRole.reason}

  <br /><br />

  {primaryRole.description}
</p>


        </div>
      </GlassCard>
    </AppLayout>
    
  );
}
