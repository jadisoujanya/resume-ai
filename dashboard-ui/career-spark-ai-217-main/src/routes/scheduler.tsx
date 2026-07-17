import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { INTERVIEWS } from "@/lib/mock-data";
import { CalendarDays, Video, MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/scheduler")({
  head: () => ({ meta: [{ title: "Interview Scheduler · Career Intelligence" }] }),
  component: Page,
});

const HOURS = ["9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"];
const DAYS = ["Mon 8","Tue 9","Wed 10","Thu 11","Fri 12"];

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Recruiter" title="Interview Scheduler" subtitle="AI finds ideal slots across panel calendars and candidate availability — one click to book." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard className="lg:col-span-8" title="This week" description="Panelist availability heatmap">
          <div className="grid grid-cols-6 gap-1 text-xs">
            <div />
            {DAYS.map(d => <div key={d} className="text-center text-muted-foreground py-1">{d}</div>)}
            {HOURS.map(h => (
              <div key={h} className="contents">
                <div className="text-right text-muted-foreground py-2 pr-2">{h}</div>
                {DAYS.map(d => {
                  const v = Math.floor(Math.random() * 4);
                  const styles = ["bg-white/[0.02]", "bg-success/10", "bg-success/25", "bg-success/50"][v];
                  return <div key={d+h} className={`h-8 rounded-md ${styles} hover:ring-1 hover:ring-primary/40 transition-all cursor-pointer`} />;
                })}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-white/[0.02] border border-border/70" /> Unavailable</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/25" /> Partial</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/50" /> Full panel</span>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-4" title="Upcoming interviews">
          <div className="space-y-2">
            {[...INTERVIEWS, ...INTERVIEWS].map((i, k) => (
              <div key={k} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="text-[10px] text-muted-foreground inline-flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {i.time}</div>
                <div className="text-sm font-medium mt-1">{i.candidate}</div>
                <div className="text-[11px] text-muted-foreground">{i.role}</div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {i.panel} panelists</span>
                  <span className="inline-flex items-center gap-1"><Video className="w-3 h-3" /> Google Meet</span>
                </div>
                <Badge tone="primary" className="mt-2">{i.type}</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
