import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "primary" | "success" | "warning" | "accent" | "danger"; className?: string }) {
  const styles = {
    default: "bg-white/[0.06] text-muted-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    accent: "bg-accent/15 text-accent",
    danger: "bg-destructive/15 text-destructive",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium", styles, className)}>{children}</span>;
}

export function Progress({ value, tone = "primary", className }: { value: number; tone?: "primary" | "success" | "warning" | "accent"; className?: string }) {
  const color = {
    primary: "from-primary to-accent",
    success: "from-success to-secondary",
    warning: "from-warning to-destructive",
    accent: "from-accent to-primary",
  }[tone];
  return (
    <div className={cn("h-1.5 rounded-full bg-white/[0.06] overflow-hidden", className)}>
      <div className={cn("h-full bg-gradient-to-r", color)} style={{ width: `${Math.min(100, Math.max(0, value))}%`, transition: "width .6s ease" }} />
    </div>
  );
}
