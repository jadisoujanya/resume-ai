import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { CANDIDATES } from "@/lib/mock-data";
import { MessageSquare, Calendar, Star } from "lucide-react";

export const Route = createFileRoute("/shortlist")({
  head: () => ({ meta: [{ title: "Shortlisted · Career Intelligence" }] }),
  component: Page,
});

const STAGES = ["Applied", "Screened", "Interview", "Offer", "Hired"];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Shortlisted Candidates" subtitle="Kanban view — drag to move candidates through stages. AI nudges you when someone stalls." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 overflow-x-auto">
        {STAGES.map((stage, si) => (
          <div key={stage} className="glass rounded-2xl p-3 min-h-[400px]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stage}</div>
              <Badge>{Math.max(1, 6 - si)}</Badge>
            </div>
            <div className="space-y-2">
              {CANDIDATES.slice(si, si + 3).map(c => (
                <div key={c.id + stage} className="p-3 rounded-xl bg-white/[0.04] border border-border/50 hover:border-primary/30 hover:bg-white/[0.06] transition-all cursor-grab">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary-bg grid place-items-center text-[10px] font-semibold text-white">{c.avatar}</div>
                    <div className="flex-1 min-w-0"><div className="text-sm font-medium truncate">{c.name}</div><div className="text-[10px] text-muted-foreground">{c.role}</div></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <Badge tone="success">{c.match}%</Badge>
                    <div className="flex gap-1 text-muted-foreground">
                      <Star className="w-3 h-3" /> <MessageSquare className="w-3 h-3" /> <Calendar className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
