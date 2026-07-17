import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { COACH_MESSAGES } from "@/lib/mock-data";
import { Sparkles, Send, Paperclip, Mic } from "lucide-react";

export const Route = createFileRoute("/career-coach")({
  head: () => ({ meta: [{ title: "AI Career Coach · Career Intelligence" }] }),
  component: Page,
});

const SUGGESTED = [
  "Rewrite my resume summary for ML Engineer roles",
  "What are my top 3 gaps to reach staff level?",
  "Prep me for the Nimbus Labs system design round",
  "Which certifications will actually move the needle?",
  "How do I negotiate a $30K increase?",
];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Personal AI" title="AI Career Coach" subtitle="Your always-on career strategist — trained on your resume, market data, and 400k hiring outcomes." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard className="lg:col-span-8" padded={false}>
          <div className="p-5 h-[520px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              {COACH_MESSAGES.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 shrink-0 rounded-lg grid place-items-center text-[10px] font-semibold ${m.role === "assistant" ? "gradient-primary-bg text-white" : "bg-white/[0.06]"}`}>
                    {m.role === "assistant" ? <Sparkles className="w-4 h-4" /> : "AS"}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "assistant" ? "bg-white/[0.04] border border-border/50" : "bg-primary/15 border border-primary/25"}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary-bg grid place-items-center"><Sparkles className="w-4 h-4 text-white animate-pulse" /></div>
                <div className="bg-white/[0.04] border border-border/50 rounded-2xl px-4 py-2.5 text-sm">
                  <span className="inline-flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{animationDelay:".2s"}} /><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{animationDelay:".4s"}} /></span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-2xl bg-white/[0.03] border border-border/70 p-2 flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><Paperclip className="w-4 h-4 text-muted-foreground" /></button>
              <input className="flex-1 bg-transparent outline-none text-sm px-2" placeholder="Ask anything about your career…" />
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><Mic className="w-4 h-4 text-muted-foreground" /></button>
              <button className="w-9 h-9 rounded-lg gradient-primary-bg grid place-items-center text-white"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </GlassCard>

        <div className="lg:col-span-4 space-y-4">
          <GlassCard title="Suggested prompts">
            <div className="space-y-2">
              {SUGGESTED.map((s) => (
                <button key={s} className="w-full text-left p-3 rounded-xl bg-white/[0.03] border border-border/50 hover:bg-white/[0.06] transition-colors text-sm">
                  {s}
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard title="Context loaded" description="Coach knows about">
            <div className="space-y-1.5 text-xs">
              {["Resume v4 (312 KB)","5 target roles saved","Interview history (3 sessions)","Skill gap analysis","Learning progress (24%)"].map((t) => (
                <div key={t} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" /> {t}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
