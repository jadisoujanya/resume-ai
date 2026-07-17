import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge, Progress } from "@/components/ui-kit/atoms";
import { Mic, Video, Bot, MicOff, VideoOff, Sparkles } from "lucide-react";

export const Route = createFileRoute("/mock-interview")({
  head: () => ({ meta: [{ title: "Mock Interview · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Live · AI Interviewer" title="Mock Interview Session" subtitle="Realistic AI interviewer with speech, sentiment, and technical rubric scoring." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        <GlassCard className="lg:col-span-8" padded={false}>
          <div className="aspect-video rounded-2xl relative overflow-hidden bg-black/40 border border-border/50">
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full gradient-primary-bg grid place-items-center mx-auto animate-pulse-glow shadow-[var(--shadow-glow-primary)]">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <div className="mt-4 text-sm font-medium">AI Interviewer · Ayla</div>
                <div className="text-xs text-muted-foreground mt-0.5">"Walk me through how you'd design a feature store for ranking."</div>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge tone="danger" className="animate-pulse">● Live</Badge>
              <Badge tone="default">18:42</Badge>
            </div>
            <div className="absolute top-4 right-4 w-40 h-28 rounded-xl bg-black/60 border border-white/10 grid place-items-center text-xs text-muted-foreground">You · camera on</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl glass-strong">
              <button className="w-10 h-10 rounded-full bg-white/10 grid place-items-center"><Mic className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-white/10 grid place-items-center"><Video className="w-4 h-4" /></button>
              <button className="px-4 h-10 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">End</button>
            </div>
          </div>
        </GlassCard>

        <div className="lg:col-span-4 space-y-4">
          <GlassCard title="Live Rubric" description="Real-time scoring">
            <div className="grid place-items-center py-2"><Ring value={82} tone="success" label="Overall" /></div>
            <div className="space-y-2.5 text-xs mt-2">
              {[["Clarity",88],["Depth",78],["Structure",84],["Confidence",76]].map(([k,v]) => (
                <div key={k as string}><div className="flex justify-between mb-1"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div><Progress value={v as number} /></div>
              ))}
            </div>
          </GlassCard>
          <GlassCard title="Live AI Feedback">
            <div className="text-xs space-y-2">
              <div className="p-2.5 rounded-lg bg-success/10 border border-success/20 flex gap-2"><Sparkles className="w-3.5 h-3.5 text-success mt-0.5" /><span>Great use of a concrete tradeoff example (online vs. offline features).</span></div>
              <div className="p-2.5 rounded-lg bg-warning/10 border border-warning/20 flex gap-2"><Sparkles className="w-3.5 h-3.5 text-warning mt-0.5" /><span>Consider quantifying — "reduced feature latency by X%".</span></div>
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassCard title="Transcript" description="Auto-generated · saved to your history">
        <div className="space-y-3 text-sm max-h-80 overflow-y-auto">
          {[
            { who: "AI", text: "Let's start easy — tell me about a system you're most proud of." },
            { who: "You", text: "The two-tower recommender at Nimbus Labs. Serves 12M DAU at p95=48ms…" },
            { who: "AI", text: "Nice. How did you handle cold users?" },
            { who: "You", text: "Content-based fallback with a lightweight tower, then blend as behavior signals arrive." },
            { who: "AI", text: "Great. Now — design a feature store that supports both real-time and batch. Start at the API." },
          ].map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.who === "You" ? "" : ""}`}>
              <div className={`w-7 h-7 shrink-0 rounded-lg grid place-items-center text-[10px] font-semibold ${m.who === "AI" ? "gradient-primary-bg text-white" : "bg-white/[0.06]"}`}>{m.who === "AI" ? "AI" : "AS"}</div>
              <div className="flex-1"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.who === "AI" ? "Ayla · AI" : "You"}</div><div className="text-sm mt-0.5">{m.text}</div></div>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppLayout>
  );
}
