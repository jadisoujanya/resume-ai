import type { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Tone = "primary" | "success" | "accent" | "warning" | "danger";

const TONE_STYLES: Record<Tone, { bg: string; text: string; glow: string; ring: string }> = {
  primary: { bg: "from-primary/20 to-primary/5", text: "text-primary", glow: "shadow-[var(--shadow-glow-primary)]", ring: "ring-primary/25" },
  success: { bg: "from-success/20 to-success/5", text: "text-success", glow: "shadow-[var(--shadow-glow-success)]", ring: "ring-success/25" },
  accent:  { bg: "from-accent/20 to-accent/5",   text: "text-accent",  glow: "shadow-[var(--shadow-glow-accent)]",  ring: "ring-accent/25"  },
  warning: { bg: "from-warning/20 to-warning/5", text: "text-warning", glow: "", ring: "ring-warning/25" },
  danger:  { bg: "from-destructive/20 to-destructive/5", text: "text-destructive", glow: "", ring: "ring-destructive/25" },
};

export function StatCard({
  label, value, unit, trend, tone = "primary", icon = "Activity",
}: {
  label: string;
  value: number | string;
  unit?: string;
  trend?: string;
  tone?: Tone;
  icon?: string;
}) {
  const styles = TONE_STYLES[tone];
  const Icon = ((Icons as unknown as Record<string, LucideIcon>)[icon] ?? Icons.Activity) as LucideIcon;

  return (
    <div className="group relative rounded-2xl glass p-5 overflow-hidden transition-all hover:-translate-y-0.5 hover:border-white/[0.14]">
      <div className={cn("absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br blur-2xl opacity-60", styles.bg)} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground font-medium">{label}</div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {trend && (
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-success">
              <ArrowUpRight className="w-3 h-3" /> {trend}
            </div>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-xl grid place-items-center bg-white/[0.05] ring-1", styles.ring)}>
          <Icon className={cn("w-4.5 h-4.5", styles.text)} />
        </div>
      </div>
    </div>
  );
}
