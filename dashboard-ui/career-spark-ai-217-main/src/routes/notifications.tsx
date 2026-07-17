import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { Briefcase, User, Bell as BellIcon, Calendar, Check } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Career Intelligence" }] }),
  component: Page,
});

const iconFor = (t: string) => t === "match" ? Briefcase : t === "recruiter" ? User : t === "interview" ? Calendar : BellIcon;

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Inbox" title="Notifications" subtitle="Everything from AI Coach, recruiters, and the system in one place."
        actions={<button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.04] border border-border/70 text-sm"><Check className="w-4 h-4" /> Mark all read</button>}
      />
      <GlassCard padded={false}>
        <ul className="divide-y divide-border/50">
          {NOTIFICATIONS.map((n) => {
            const Icon = iconFor(n.type);
            return (
              <li key={n.id} className={`p-4 flex items-center gap-4 hover:bg-white/[0.02] ${n.unread ? "" : "opacity-60"}`}>
                <div className={`w-10 h-10 rounded-xl grid place-items-center ${n.unread ? "bg-primary/15 text-primary" : "bg-white/[0.04] text-muted-foreground"}`}><Icon className="w-4 h-4" /></div>
                <div className="flex-1"><div className="text-sm font-medium">{n.title}</div><div className="text-[11px] text-muted-foreground">{n.time}</div></div>
                {n.unread && <Badge tone="primary">New</Badge>}
              </li>
            );
          })}
        </ul>
      </GlassCard>
    </AppLayout>
  );
}
