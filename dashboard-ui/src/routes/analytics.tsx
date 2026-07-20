import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/api";

import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  component: Page,
});

const CHART_GRID = "rgba(255,255,255,0.08)";


const TICK = {
  fill: "#94a3b8",
  fontSize: 11,
};





const CATEGORY_COLORS = {
  Programming: {
    color: "#883fdc",
    bg: "rgba(139,92,246,.15)",
  },

  Frameworks: {
    color: "#22c55e",
    bg: "rgba(34,197,94,.15)",
  },

  Database: {
    color: "#4e34c2",
    bg: "rgba(167,41,160,.15)",
  },

  "AI / ML": {
    color: "#ec4899",
    bg: "rgba(236,72,153,.15)",
  },

  Cloud: {
    color: "#f97316",
    bg: "rgba(249,115,22,.15)",
  },

  "Data Science": {
    color: "#06b6d4",
    bg: "rgba(6,182,212,.15)",
  },

  Web: {
    color: "#6366f1",
    bg: "rgba(99,102,241,.15)",
  },

  Mobile: {
    color: "#21b181",
    bg: "rgba(16,185,129,.15)",
  },

  DevOps: {
    color: "#84cc16",
    bg: "rgba(132,204,22,.15)",
  },

  Testing: {
    color: "#ef4444",
    bg: "rgba(239,68,68,.15)",
  },

  Tools: {
    color: "#e25289",
    bg: "rgba(226,82,137,.15)",
  },

  "Soft Skills": {
    color: "#ceba26",
    bg: "rgba(148,163,184,.15)",
  
  },

  Others: {
    color: "#e879f9",
    bg: "rgba(232,121,249,.15)",
  },
};


function Page() {

  const [analytics, setAnalytics] = useState<any | null>(null);

 useEffect(() => {
  const load = async () => {
    try {
      const data = await getAnalytics(1);
      console.log(data);
      setAnalytics(data);
    } catch (err) {
      console.error("Analytics API failed:", err);
    }
  };

  load();
}, []);

  if (!analytics) {
    return (
      <AppLayout>
        <PageHeader
          eyebrow="Analytics"
          title="Career Analytics"
          subtitle="Loading Career Insights..."
        />
      </AppLayout>
    );
  }

const summary = analytics.resumeSummary ?? {
  resumeScore: 0,
  atsScore: 0,
  role: "Not detected",
  careerLevel: "Unknown",
};

const skillDistribution = Array.isArray(analytics?.skillDistribution)
  ? analytics.skillDistribution
  : [];

const skillCategories =
  analytics?.skillCategories &&
  typeof analytics.skillCategories === "object"
    ? analytics.skillCategories
    : {};

const readiness = Array.isArray(analytics?.interviewReadiness)
  ? analytics.interviewReadiness
  : [];





  const skillEvidence =
  Object.entries(skillCategories || {}).flatMap(
    ([category, skills]: any) =>
      [...new Set((skills || []) as string[])].map((skill) => ({
        skill,
        category,
        strength:
          category === "Programming" ||
          category === "Frameworks"
            ? "Strong"
            : category === "Tools"
            ? "Moderate"
            : "Basic",
        evidence:
          category === "Programming"
            ? "Experience"
            : category === "Frameworks"
            ? "Projects"
            : category === "Tools"
            ? "Projects"
            : "Resume",
      }))
  );


const totalSkills = skillDistribution.reduce(
  (sum: number, item: any) => sum + item.value,
  0
);

const overallReadiness =
  readiness.length > 0
    ? Math.round(
        readiness.reduce(
          (sum: number, item: any) => sum + item.value,
          0
        ) / readiness.length
      )
    : 0;


  return (
    <AppLayout>
      <PageHeader
        eyebrow="Analytics"
        title="Career Analytics"
        subtitle="Deep insights into your uploaded resume."
      />

   


{/* ===================== */}
{/* Resume Summary */}
{/* ===================== */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  <GlassCard title="Resume Score">
    <div className="flex flex-col gap-3">

      <div className="flex items-end gap-2">
        <span className="text-5xl font-extrabold text-emerald-400">
          {summary.resumeScore}
        </span>
        <span className="pb-1 text-xl text-slate-400">%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-700"
          style={{ width: `${summary.resumeScore}%` }}
        />
      </div>

      <p className="text-xs text-slate-400">
        Overall Resume Strength
      </p>

    </div>
  </GlassCard>

  <GlassCard title="ATS Score">
    <div className="flex flex-col gap-3">

      <div className="flex items-end gap-2">
        <span className="text-5xl font-extrabold text-cyan-400">
          {summary.atsScore}
        </span>
        <span className="pb-1 text-xl text-slate-400">%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width: `${summary.atsScore}%` }}
        />
      </div>

      <p className="text-xs text-slate-400">
        ATS Compatibility
      </p>

    </div>
  </GlassCard>

  <GlassCard title="Detected Role">
    <div className="flex flex-col justify-between h-full">

      <h2 className="text-2xl font-bold text-indigo-300">
        {summary.role}
      </h2>

      <span className="mt-3 inline-flex w-fit rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-semibold text-indigo-300">
        AI Detected
      </span>

    </div>
  </GlassCard>

  <GlassCard title="Career Level">
    <div className="flex flex-col justify-between h-full">

      <h2 className="text-2xl font-bold text-amber-300">
        {summary.careerLevel}
      </h2>

      <span className="mt-3 inline-flex w-fit rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
        Estimated Level
      </span>

    </div>
  </GlassCard>

</div>




<GlassCard
  title="Skill Categories"
  className="lg:col-span-7"
>
  <div className="grid lg:grid-cols-[40%_60%] gap-6 items-start">

    {/* Pie Chart */}

    <div
      className="flex items-center justify-center"
      style={{ width: "100%", height: 320 }}
    >
      

      {skillDistribution.length > 0 ? (
 

<PieChart width={300} height={300}>

  <Pie
    data={skillDistribution}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={95}
    innerRadius={60}
    paddingAngle={3}
  >
    {skillDistribution.map((entry: any, index: number) => {
      const style =
        CATEGORY_COLORS[
          entry.name as keyof typeof CATEGORY_COLORS
        ] || CATEGORY_COLORS.Others;

      return (
        <Cell
          key={index}
          fill={style.color}
        />
      );
    })}
  </Pie>

  <text
    x="50%"
    y="46%"
    textAnchor="middle"
    fill="#94a3b8"
    fontSize="14"
  >
    Total Skills
  </text>

  <text
    x="50%"
    y="60%"
    textAnchor="middle"
    fill="#ffffff"
    fontSize="34"
    fontWeight="700"
  >
    {totalSkills}
  </text>

  <Tooltip
    content={({ active, payload }) => {
      if (!active || !payload?.length) return null;

      return (
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: "8px 12px",
            color: "#fff",
          }}
        >
          <div>{payload[0].name}</div>
          <div>{payload[0].value} Skills</div>
        </div>
      );
    }}
  />

  <Legend
    verticalAlign="bottom"
    align="center"
    wrapperStyle={{
      fontSize: 12,
    }}
  />

</PieChart>



) : (
  <div className="text-slate-400">
    No skills found
  </div>
)}

    </div>

    {/* Skill List */}

    <div className="space-y-5 overflow-y-auto max-h-[320px] pr-2">

      <h3 className="text-lg font-semibold text-white">
Skill Breakdown
      </h3>

      {Object.entries(skillCategories).map(([category, skills]: any) => {

        const uniqueSkills = Array.isArray(skills)
          ? [...new Set(skills)]
          : [];

        if (uniqueSkills.length === 0) return null;

        const style =
          CATEGORY_COLORS[
            category as keyof typeof CATEGORY_COLORS
          ] || {
            color: "#94a3b8",
            bg: "rgba(148,163,184,.15)",
          };

        return (
          <div key={category}>

            <h4
              className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-wide"
              style={{ color: style.color }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: style.color }}
              />

              {category}
            </h4>

            <div className="flex flex-wrap gap-2">

              {uniqueSkills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: style.color,
                    color: style.color,
                    backgroundColor: style.bg,
                  }}
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>
        );
      })}

    </div>

  </div>
</GlassCard>





<GlassCard title="Skill Evidence">

  <div className="overflow-x-auto">

    <table className="w-full text-sm">

      <thead className="border-b border-slate-700 text-slate-400">

        <tr>

          <th className="py-3 text-left">Skill</th>

          <th className="py-3 text-left">Evidence</th>

        </tr>

      </thead>

      <tbody>

        {skillEvidence.map((item: any, index: number) => {

          const badge =
            item.strength === "Strong"
              ? "bg-green-500"
              : item.strength === "Moderate"
              ? "bg-yellow-500"
              : "bg-blue-500";

          return (

            <tr
              key={index}
              className="border-b border-slate-800"
            >

              <td className="py-3 text-white">

                {item.skill}

              </td>

              <td className="py-3">

                <div className="flex items-center gap-3">

                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold text-white ${badge}`}
                  >
                    {item.strength}
                  </span>

                  <span className="text-slate-400">

                    Found in {item.evidence}

                  </span>

                </div>

              </td>

            </tr>

          );

        })}

      </tbody>

    </table>

    <div className="mt-5 flex flex-wrap gap-5 text-xs">

       <div className="mt-5 flex flex-wrap gap-5 text-xs">

      <span className="text-green-400">
        ● Strong:
        <span className="ml-1 text-slate-400">
          Multiple evidence (Experience + Certification)
        </span>
      </span>

      <span className="text-yellow-400">
        ● Moderate:
        <span className="ml-1 text-slate-400">
          Single evidence (Experience or certification)
        </span>
      </span>

      <span className="text-blue-400">
        ● Basic:
        <span className="ml-1 text-slate-400">
          Mentioned in Resume / Education
        </span>
      </span>

    </div>

      </div>
  </div>

</GlassCard>




{/* ===================== */}
{/* Interview Readiness */}
{/* ===================== */}

<GlassCard title="Interview Readiness">

  {/* Chart */}
  <div style={{ height: 280 }}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={readiness}
        layout="vertical"
        margin={{
          top: 10,
          right: 35,
          left: 35,
          bottom: 10,
        }}
      >
        <CartesianGrid
          stroke={CHART_GRID}
          strokeDasharray="3 3"
          horizontal={false}
        />

        <XAxis
          type="number"
          domain={[0, 100]}
          hide
        />

        <YAxis
          type="category"
          dataKey="stage"
          tick={TICK}
          width={140}
        />

        <Tooltip
          cursor={{ fill: "rgba(255,255,255,.04)" }}
          formatter={(value: number) => [`${value}%`, "Score"]}
          contentStyle={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "10px",
            color: "#fff",
          }}
        />

        <Bar
          dataKey="value"
          radius={[10, 10, 10, 10]}
          barSize={22}
          fill="#6366f1"
          label={{
            position: "right",
            fill: "#ffffff",
            formatter: (value: number) => `${value}%`,
            fontSize: 12,
            fontWeight: 600,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

 {/* Overall Readiness + Explanation */}
<div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">

  {/* Left Card */}
  <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6 flex flex-col justify-center">

    <div className="text-xs uppercase tracking-wider text-slate-400">
      Overall Readiness
    </div>

    <div className="mt-3 text-6xl font-bold text-indigo-400">
      {overallReadiness}%
    </div>

    <p className="mt-4 text-sm text-slate-400 leading-6">
      This score summarizes your overall interview preparation based on
      resume quality, ATS compatibility and detected technical skills.
    </p>

  </div>

  {/* Right Card */}
  <div className="rounded-xl border border-slate-700 bg-slate-900/30 p-6">

    <h3 className="text-lg font-semibold text-white">
      How is it calculated?
    </h3>

    <p className="mt-2 mb-6 text-sm leading-6 text-slate-400">
      Interview Readiness is estimated from multiple resume quality
      indicators instead of a single score.
    </p>

    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          Resume Quality
        </span>

        <span className="font-semibold text-emerald-400">
          {summary.resumeScore}%
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          ATS Compatibility
        </span>

        <span className="font-semibold text-cyan-400">
          {summary.atsScore}%
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          Skill Categories
        </span>

        <span className="font-semibold text-indigo-400">
          {Object.keys(skillCategories).length}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          Skills Detected
        </span>

        <span className="font-semibold text-pink-400">
          {totalSkills}
        </span>
      </div>

      {/* New Row */}
      <div className="flex items-center justify-between">
        <span className="text-slate-400">
          Skills Score
        </span>

        <span className="font-semibold text-amber-400">
          {readiness.find((r:any)=>r.stage==="Skills")?.value ?? 0}%
        </span>
      </div>

    </div>

    {/* Statement */}
    <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">

      <div className="text-sm text-slate-300 leading-6">
        <span className="font-semibold text-amber-300">
          Skills Score
        </span>{" "}
        is the average strength of all detected skills based on evidence
        found in your resume, including work experience, projects,
        certifications and technical sections.
      </div>

    </div>

  </div>

</div>


  {/* Stage Summary */}
  <div
    className="mt-6 grid gap-4"
    style={{
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    }}
  >

    {(readiness || []).map((item: any, index: number) => {

      const color =
        item.value >= 80
          ? "#22c55e"
          : item.value >= 60
          ? "#3b82f6"
          : item.value >= 40
          ? "#f59e0b"
          : "#ef4444";

      const bg =
        item.value >= 80
          ? "rgba(34,197,94,.12)"
          : item.value >= 60
          ? "rgba(59,130,246,.12)"
          : item.value >= 40
          ? "rgba(245,158,11,.12)"
          : "rgba(239,68,68,.12)";

      return (
        <div
          key={index}
          className="rounded-2xl border p-6 text-center"
          style={{
            borderColor: `${color}55`,
            background: bg,
          }}
        >
          <div
            className="text-4xl font-bold"
            style={{ color }}
          >
            {item.value}%
          </div>

          <div
            className="mt-2 text-sm font-semibold uppercase tracking-wide"
            style={{ color }}
          >
            {item.stage}
          </div>

        </div>
      );
    })}

  </div>

</GlassCard>


    </AppLayout>

  );

}