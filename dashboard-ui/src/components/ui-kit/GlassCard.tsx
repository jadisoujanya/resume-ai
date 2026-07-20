import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children, className, title, description, action, padded = true,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
  padded?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl glass relative overflow-hidden", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 px-5 pt-5">
          <div>
            {title && <h3 className="text-sm font-semibold tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn(padded ? "p-5" : "")}>{children}</div>
    </div>
  );
}

export function Ring({ value, size = 120, stroke = 10, label, sublabel, tone = "primary" }: {
  value: number; size?: number; stroke?: number; label?: string; sublabel?: string;
  tone?: "primary" | "success" | "warning" | "accent";
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = {
    primary: "oklch(0.65 0.2 260)",
    success: "oklch(0.72 0.17 152)",
    warning: "oklch(0.78 0.16 75)",
    accent: "oklch(0.76 0.14 220)",
  }[tone];

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${tone}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} strokeWidth={stroke} stroke="oklch(1 0 0 / 0.06)" fill="none" />
        <circle
          cx={size/2} cy={size/2} r={r}
          strokeWidth={stroke} stroke={`url(#ring-${tone})`} fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-2xl font-semibold tracking-tight">{value}<span className="text-xs text-muted-foreground">/100</span></div>
          {label && <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{label}</div>}
          {sublabel && <div className="text-[10px] text-muted-foreground/70">{sublabel}</div>}
        </div>
      </div>
    </div>
  );
}
