import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { ROLE_ROADMAPS, type RoadmapLevel } from "@/lib/mock-data";
import { Clock, Target, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/career-roadmap")({
  head: () => ({ meta: [
    { title: "Career Roadmap · Career Intelligence" },
    { name: "description", content: "Personalized level-based roadmaps for Data Scientist, AI Engineer, Data Analyst and more — with topics, coverage, and outcomes." },
  ] }),
  component: Page,
});

const LEVEL_TONE: Record<RoadmapLevel, { badge: "success" | "primary" | "warning"; ring: string }> = {
  Beginner: { badge: "success", ring: "ring-success/20" },
  Intermediate: { badge: "primary", ring: "ring-primary/20" },
  Advanced: { badge: "warning", ring: "ring-warning/20" },
};


function Page() {

const stored =
  typeof window !== "undefined"
    ? localStorage.getItem("resume_analysis")
    : null;

const analysis = stored ? JSON.parse(stored) : {};

console.log(JSON.stringify(analysis, null, 2));

const primaryRole = analysis?.career_prediction?.primary_role?.role
  ?.trim()
  .toLowerCase();

console.log("Primary Role:", primaryRole);
console.log("Recommendations:", analysis?.recommendations);
  
console.log(analysis?.career_prediction?.primary_role);
console.log(primaryRole);
console.log(ROLE_ROADMAPS.map(r => r.role));


const orderedRoadmaps = [
  ...ROLE_ROADMAPS.filter(
    r => r.role.trim().toLowerCase() === primaryRole
  ),
  ...ROLE_ROADMAPS.filter(
    r => r.role.trim().toLowerCase() !== primaryRole
  ),
];

const [activeKey, setActiveKey] = useState(
  orderedRoadmaps[0]?.key ?? ROLE_ROADMAPS[0].key
);


const active = orderedRoadmaps.find(r => r.key === activeKey) ?? orderedRoadmaps[0];
  
  const [openTopic, setOpenTopic] = useState<string | null>(`${active.levels[0].level}:${active.levels[0].topics[0].name}`);

  const totalTopics = active.levels.reduce((n, l) => n + l.topics.length, 0);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Career Intelligence"
        title="Career Roadmaps"
        subtitle="Level-based learning paths — from beginner fundamentals to advanced production systems — personalized to each recommended role."
      />

      {/* Role tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {orderedRoadmaps.map((r) => (
          <button
            key={r.key}
            onClick={() => setActiveKey(r.key)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all",
              activeKey === r.key
                ? "gradient-primary-bg text-white border-transparent shadow-[var(--shadow-glow-primary)]"
                : "bg-white/[0.03] border-border/60 text-muted-foreground hover:text-foreground hover:bg-white/[0.06]",
            )}
          >
            <span className="text-base">{r.emoji}</span>
            <span className="font-medium">{r.role}</span>
          </button>
        ))}
      </div>

      {/* Role summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{active.emoji}</div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Target role</div>
              <div className="text-lg font-semibold mt-0.5">{active.role}</div>
              <div className="text-sm text-muted-foreground mt-1">{active.tagline}</div>
            </div>
          </div>
        </GlassCard>
        {[
          ["Total topics", `${totalTopics}`],
          ["Levels", `${active.levels.length}`],
        ].map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-2xl font-semibold mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-success via-primary to-warning" />

        {active.levels.map((lvl, li) => {
          const tone = LEVEL_TONE[lvl.level];
          return (
            <div key={lvl.level} className="relative mb-8">
              <div className={cn(
                "absolute -left-4 top-4 w-5 h-5 rounded-full grid place-items-center",
                li === 0 ? "bg-success" : li === 1 ? "bg-primary" : "bg-warning",
                "shadow-lg",
              )}>
                <span className="text-[10px] font-bold text-white">{li + 1}</span>
              </div>

              <GlassCard className={cn("ring-1", tone.ring)}>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{lvl.level} Level</h3>
                      <Badge tone={tone.badge}>{lvl.topics.length} topics</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lvl.weeks}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lvl.topics.map((t) => {
                    const id = `${lvl.level}:${t.name}`;
                    const open = openTopic === id;
                    return (
                      <div key={id} className="rounded-xl bg-white/[0.03] border border-border/50 overflow-hidden">
                        <button
                          onClick={() => setOpenTopic(open ? null : id)}
                          className="w-full flex items-start gap-3 p-3 text-left hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/[0.05] grid place-items-center text-lg shrink-0">
                            {t.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold">{t.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.summary}</div>
                          </div>
                          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                        </button>

                        {open && (
                          <div className="px-3 pb-3 pt-1 border-t border-border/40">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 mb-1.5">Covers</div>
                            <ul className="space-y-1">
                              {t.covers.map((c) => (
                                <li key={c} className="flex items-start gap-2 text-xs">
                                  <CheckCircle2 className="w-3 h-3 mt-0.5 text-success shrink-0" />
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 flex items-start gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                              <Target className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                              <div className="text-xs"><span className="font-medium text-primary">Goal · </span>{t.goal}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
