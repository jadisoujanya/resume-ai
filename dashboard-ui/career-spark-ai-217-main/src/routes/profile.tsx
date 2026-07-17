import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { MapPin, Mail, Phone, Globe, Github, Linkedin, Award, Briefcase, GraduationCap, Camera, Edit3 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <div className="relative rounded-3xl overflow-hidden mb-6 glass-strong">
        <div className="h-40 bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/30 relative">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.65 0.2 260 / 0.6), transparent 40%), radial-gradient(circle at 80% 60%, oklch(0.72 0.17 152 / 0.5), transparent 40%)" }} />
        </div>
        <div className="px-6 pb-6 -mt-14 relative">
          <div className="flex items-end gap-5">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl gradient-primary-bg grid place-items-center text-3xl font-semibold text-white ring-4 ring-background shadow-[var(--shadow-elevated)]">AS</div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-surface border border-border grid place-items-center"><Camera className="w-4 h-4" /></button>
            </div>
            <div className="pb-2 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Ananya Sharma</h1>
                <Badge tone="primary">Pro</Badge>
                <Badge tone="success">Verified</Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">Senior ML Engineer @ Nimbus Labs</div>
              <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> Bengaluru, IN</span>
                <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> ananya@…</span>
                <span className="inline-flex items-center gap-1"><Github className="w-3 h-3" /> ananya-s</span>
                <span className="inline-flex items-center gap-1"><Linkedin className="w-3 h-3" /> /ananyasharma</span>
              </div>
            </div>
            <div className="pb-2">
              <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-white text-sm font-medium"><Edit3 className="w-4 h-4" /> Edit profile</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <GlassCard title="Profile completion">
            <div className="flex items-center justify-between mb-2"><span className="text-2xl font-semibold">86%</span><Badge tone="success">Almost there</Badge></div>
            <Progress value={86} tone="success" />
            <ul className="mt-4 space-y-2 text-xs">
              {[["Basic info",true],["Experience",true],["Education",true],["Skills",true],["Certifications",true],["Portfolio links",false]].map(([k,v]) => (
                <li key={k as string} className="flex items-center gap-2"><span className={`w-4 h-4 rounded grid place-items-center ${v ? "bg-success/20 text-success" : "bg-white/[0.05] text-muted-foreground"}`}>{v ? "✓" : "•"}</span>{k}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {["Python","PyTorch","TensorFlow","FastAPI","AWS","Docker","Kubernetes","PostgreSQL","LLMs","LangChain","MLflow","Airflow"].map(s => <Badge key={s} tone="primary">{s}</Badge>)}
            </div>
          </GlassCard>
          <GlassCard title="Certifications">
            <div className="space-y-2">
              {["AWS ML Specialty","TensorFlow Developer","Coursera Deep Learning Spec"].map(c => (
                <div key={c} className="p-2.5 rounded-lg bg-white/[0.03] border border-border/50 flex items-center gap-2 text-xs"><Award className="w-4 h-4 text-warning" /> {c}</div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <GlassCard title="Experience">
            <ol className="relative pl-5 border-l border-border/60 space-y-5">
              {[
                { role: "Senior ML Engineer", org: "Nimbus Labs", when: "2023 — Present", detail: "Owns the two-tower recommender serving 12M DAU. Cut inference latency 48ms → 22ms.", tone: "primary" as const },
                { role: "ML Engineer", org: "Loop", when: "2021 — 2023", detail: "Founding backend/ML engineer. Shipped FastAPI + Postgres platform at 1.2k RPS.", tone: "accent" as const },
                { role: "ML Intern", org: "IIT Bombay Research Lab", when: "2020 — 2021", detail: "Published on distributed training with FSDP.", tone: "success" as const },
              ].map((e, i) => (
                <li key={i} className="relative">
                  <span className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full ${e.tone === "primary" ? "bg-primary" : e.tone === "accent" ? "bg-accent" : "bg-success"} ring-4 ring-background`} />
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" /><div className="text-sm font-semibold">{e.role}</div><span className="text-xs text-muted-foreground">· {e.org}</span></div>
                  <div className="text-[11px] text-muted-foreground">{e.when}</div>
                  <p className="text-sm mt-1 text-muted-foreground">{e.detail}</p>
                </li>
              ))}
            </ol>
          </GlassCard>

          <GlassCard title="Education">
            <div className="space-y-3">
              {[
                { deg: "M.Tech, Computer Science (AI)", org: "NIT Warangal", when: "2024 — 2026", grade: "CGPA 9.2" },
                { deg: "B.Tech, Information Technology", org: "VIT University", when: "2016 — 2020", grade: "CGPA 8.7" },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent grid place-items-center"><GraduationCap className="w-5 h-5" /></div>
                  <div className="flex-1"><div className="text-sm font-medium">{e.deg}</div><div className="text-[11px] text-muted-foreground">{e.org} · {e.when}</div></div>
                  <Badge tone="success">{e.grade}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
