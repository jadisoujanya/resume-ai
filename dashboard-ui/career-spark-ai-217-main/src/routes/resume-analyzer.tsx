import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { EXTRACTED_SKILLS, MISSING_SKILLS } from "@/lib/mock-data";
import { UploadCloud, FileText, Download, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resume-analyzer")({
  head: () => ({ meta: [{ title: "Resume Analyzer · Career Intelligence" }, { name: "description", content: "AI-powered resume analysis with keyword extraction, ATS scoring and actionable feedback." }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Resume Intelligence"
        title="Resume Analyzer"
        subtitle="Upload a resume and get a detailed AI breakdown — keywords, structure, ATS compatibility, and impact scoring."
        actions={
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]">
            <Download className="w-4 h-4" /> Export report
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard className="lg:col-span-8" title="Upload Resume" description="PDF, DOCX up to 10 MB. Parsed with spaCy NLP + custom ATS engine.">
          <div className="border-2 border-dashed border-border/70 rounded-xl p-10 text-center bg-white/[0.02] hover:bg-white/[0.03] transition-colors">
            <div className="w-14 h-14 mx-auto rounded-2xl gradient-primary-bg grid place-items-center shadow-[var(--shadow-glow-primary)] animate-float">
              <UploadCloud className="w-6 h-6 text-white" />
            </div>
            <div className="mt-4 text-sm font-medium">Drag & drop your resume here</div>
            <div className="text-xs text-muted-foreground mt-1">or click to browse — we'll analyze it in ~4 seconds</div>
            <button className="mt-4 px-4 py-2 rounded-lg bg-white/[0.05] border border-border/70 text-sm hover:bg-white/[0.08]">
              Browse files
            </button>
            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success" /> Secure & encrypted</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success" /> Never shared</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-white/[0.03] border border-border/50 p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 text-primary grid place-items-center"><FileText className="w-4 h-4" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Ananya_Sharma_Resume_v4.pdf</div>
              <div className="text-[11px] text-muted-foreground">312 KB · Analyzed 2m ago</div>
            </div>
            <Badge tone="success">Analyzed</Badge>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-4" title="Overall Scores" description="Weighted composite from 6 sub-scores">
          <div className="grid grid-cols-2 gap-3 place-items-center py-2">
            <Ring value={87} tone="primary" size={100} label="Resume" />
            <Ring value={92} tone="success" size={100} label="ATS" />
          </div>
          <div className="mt-3 space-y-2.5 text-xs">
            {[
              ["Keyword match", 94, "success"],
              ["Grammar & clarity", 88, "primary"],
              ["Impact bullets", 76, "warning"],
              ["Formatting", 96, "success"],
              ["Section structure", 90, "primary"],
              ["Length & density", 82, "primary"],
            ].map(([k, v, t]) => (
              <div key={k as string}>
                <div className="flex justify-between mb-1"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                <Progress value={v as number} tone={t as any} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard title="Extracted Skills" description="NLP-detected technical & soft skills with confidence" className="lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXTRACTED_SKILLS.map((s) => (
              <div key={s.skill} className="p-2.5 rounded-lg bg-white/[0.03] border border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <div><div className="font-medium">{s.skill}</div><div className="text-[10px] text-muted-foreground">{s.category}</div></div>
                  <span className="font-mono text-[11px]">{s.level}%</span>
                </div>
                <Progress value={s.level} className="mt-2" tone={s.level > 85 ? "success" : s.level > 65 ? "primary" : "warning"} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Missing Skills" description="High-impact gaps for your target role" className="lg:col-span-5">
          <div className="space-y-2.5">
            {MISSING_SKILLS.map((m) => (
              <div key={m.skill} className="p-3 rounded-xl bg-white/[0.03] border border-border/50 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg grid place-items-center ${m.impact === "high" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1"><div className="text-sm font-medium">{m.skill}</div><div className="text-[11px] text-muted-foreground">Appears in {m.roles} of your target roles</div></div>
                <Badge tone={m.impact === "high" ? "danger" : "warning"}>{m.impact}</Badge>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white">
            <Sparkles className="w-4 h-4" /> Generate learning plan
          </button>
        </GlassCard>
      </div>

      <GlassCard title="AI Suggestions" description="Prioritized rewrites to boost your score by an estimated +6.4 points">
        <div className="space-y-3">
          {[
            { before: "Worked on machine learning models for the recommendation system.", after: "Shipped a two-tower recommender serving 12M users at p95=48ms, lifting CTR by 18% and revenue by $2.4M/quarter.", tag: "Impact" },
            { before: "Responsible for the FastAPI backend and PostgreSQL database.", after: "Owned the FastAPI + Postgres platform (1.2k RPS, 99.98% SLO) — cut cold-start latency 62% via async I/O and pooled reads.", tag: "Quantify" },
            { before: "Collaborated with team members on various projects.", after: "Led a squad of 4 to deliver 3 platform launches on time; established weekly design reviews adopted org-wide.", tag: "Leadership" },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-border/50">
              <div className="flex items-center gap-2 mb-2 text-[11px]">
                <Badge tone="warning">Before</Badge>
                <Badge tone="primary">{s.tag}</Badge>
              </div>
              <div className="text-sm text-muted-foreground line-through decoration-destructive/40">{s.before}</div>
              <div className="mt-2 flex items-center gap-2 text-[11px]"><Badge tone="success">After</Badge></div>
              <div className="text-sm mt-1">{s.after}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppLayout>
  );
}
