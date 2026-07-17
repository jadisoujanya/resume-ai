import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { IndianRupee, Bookmark, Sparkles, Filter } from "lucide-react";
import { useJobMatches } from "@/hooks/useJobMatches";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/job-matches")({
  head: () => ({ meta: [{ title: "Job Matches · Career Intelligence" }] }),
  component: Page,
});

function Page() {

const [role, setRole] = useState("software engineer");
const [score, setScore] = useState(80);
const [skills, setSkills] = useState<string[]>([]);

useEffect(() => {
  if (typeof window === "undefined") return;

  const savedRole = localStorage.getItem("detected_role");
  const savedScore = localStorage.getItem("resume_score");
  const savedSkills = JSON.parse(
    localStorage.getItem("resume_skills") || "[]"
  );

  if (savedRole) setRole(savedRole);
  if (savedScore) setScore(Number(savedScore));
  setSkills(savedSkills);
}, []);

const { jobs, loading } = useJobMatches(
  skills,
  role,
  score
);

  if (loading) {
    return (
      <AppLayout>
        <PageHeader
          eyebrow="Jobs"
          title="Loading AI Job Matches..."
          subtitle="Finding the best opportunities..."
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <PageHeader
        eyebrow="Jobs"
        title="Your AI Job Matches"
        subtitle="Ranked by AI compatibility."
        actions={
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        }
      />

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {jobs.map((j) => (
    <GlassCard key={`${j.company}-${j.role}`}>
      <h3 className="text-lg font-semibold">{j.role}</h3>

  <p className="text-sm text-gray-400 mt-3">
  {j.description}
</p>


      <div className="flex items-center gap-2">
        <IndianRupee size={16} />
        {j.salary}
      </div>

     <Progress value={Number(j.match)} />

<p className="text-xs uppercase tracking-wide text-gray-500 mt-3">
  Required Skills
</p> 

<div className="flex flex-wrap gap-2 mt-3">
  {(j.skills || []).map((skill: string) => (
    <Badge key={skill}>{skill}</Badge>
  ))}
</div>


<p className="text-xs uppercase tracking-wide text-gray-500 mt-3">
  Top Hiring Companies
</p>

<p className="text-gray-400">
  {j.companies?.join(" • ")}
</p>

<Badge>
  {j.match}% Match
</Badge>

<p className="text-xs text-cyan-400 mt-2">
  ✨ {j.reason}
</p>
    </GlassCard>
  ))}
</div>

    </AppLayout>
  );
}