import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { JOB_MATCHES } from "@/lib/mock-data";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/saved-jobs")({
  head: () => ({ meta: [{ title: "Saved Jobs · Career Intelligence" }] }),
  component: Page,
});

function Page() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Jobs" title="Saved Jobs" subtitle="You have 3 saved roles. AI monitors these companies for team growth, funding, and comp changes." />
      <GlassCard padded={false}>
        <ul className="divide-y divide-border/50">
          {JOB_MATCHES.slice(0, 3).map((j) => (
            <li key={j.id} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
              <div className="w-11 h-11 rounded-xl gradient-primary-bg grid place-items-center text-sm font-semibold text-white">{j.logo}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{j.role} · <span className="text-muted-foreground font-normal">{j.company}</span></div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{j.location} · {j.salary}</div>
                <div className="mt-2 flex flex-wrap gap-1">{j.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
              </div>
              <Badge tone="success">{j.match}% match</Badge>
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><ExternalLink className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-white/[0.05]"><Trash2 className="w-4 h-4 text-muted-foreground" /></button>
            </li>
          ))}
        </ul>
      </GlassCard>
    </AppLayout>
  );
}
