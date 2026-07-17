import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, ShieldCheck, Sparkles, Target, Route as RouteIcon,
  GraduationCap, PenLine, MessagesSquare, Bot, Briefcase, Bookmark, BarChart3,
  User, Settings, Bell, Users, Layers, GitCompare, ScanSearch, Building2,
  UserCheck, CalendarCheck2, FileBarChart, Sparkle,
} from "lucide-react";
import { useMode } from "@/lib/mode-store";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string };

const CANDIDATE_NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Resume Intelligence",
    items: [
      { to: "/resume-analyzer", label: "Resume Analyzer", icon: FileText },
      { to: "/ats-score", label: "ATS Score", icon: ShieldCheck },
      { to: "/resume-rewriter", label: "Resume Rewriter", icon: PenLine, badge: "AI" },
    ],
  },
  {
    group: "Career Intelligence",
    items: [
      { to: "/career-prediction", label: "Career Prediction", icon: Sparkles },
      { to: "/skill-gap", label: "Skill Gap", icon: Target },
      { to: "/career-roadmap", label: "Career Roadmap", icon: RouteIcon },
      { to: "/learning", label: "Learning", icon: GraduationCap },
    ],
  },
  {
    group: "Interview & Coach",
    items: [
      { to: "/interview-prep", label: "Interview Prep", icon: MessagesSquare },
      { to: "/mock-interview", label: "Mock Interview", icon: Bot, badge: "Live" },
      { to: "/career-coach", label: "AI Career Coach", icon: Sparkle },
    ],
  },
  {
    group: "Jobs",
    items: [
      { to: "/job-matches", label: "Job Matches", icon: Briefcase, badge: "24" },
      { to: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
    ],
  },
  {
    group: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: User },
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

const RECRUITER_NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/hiring-analytics", label: "Hiring Analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Candidates",
    items: [
      { to: "/resume-library", label: "Resume Library", icon: Layers, badge: "1.2k" },
      { to: "/compare-candidates", label: "Compare Candidates", icon: GitCompare },
      { to: "/shortlist", label: "Shortlisted", icon: UserCheck, badge: "86" },
      { to: "/talent-pool", label: "Talent Pool", icon: Users },
    ],
  },
  {
    group: "Screening",
    items: [
      { to: "/jd-matching", label: "JD Matching", icon: Target },
      { to: "/bulk-screening", label: "Bulk Screening", icon: ScanSearch, badge: "AI" },
    ],
  },
  {
    group: "Pipeline",
    items: [
      { to: "/scheduler", label: "Interview Scheduler", icon: CalendarCheck2 },
      { to: "/reports", label: "Reports", icon: FileBarChart },
    ],
  },
  {
    group: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: Building2 },
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { mode } = useMode();
  const groups = mode === "candidate" ? CANDIDATE_NAV : RECRUITER_NAV;
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border/60 bg-sidebar/60 backdrop-blur-xl sticky top-0 h-screen">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-border/50">
        <div className="w-9 h-9 rounded-xl gradient-primary-bg grid place-items-center shadow-[var(--shadow-glow-primary)]">
          <Sparkles className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Career Intelligence</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Smart Hiring · v2.4</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {groups.map((g) => (
          <div key={g.group}>
            <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">{g.group}</div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const active = pathname === it.to;
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all",
                        active
                          ? "bg-primary/15 text-foreground shadow-[inset_0_0_0_1px_oklch(0.58_0.2_260/0.35)]"
                          : "text-sidebar-foreground/80 hover:text-foreground hover:bg-white/[0.04]",
                      )}
                    >
                      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full gradient-primary-bg" />}
                      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.badge && (
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-md font-medium",
                          it.badge === "AI" || it.badge === "Live"
                            ? "bg-secondary/15 text-secondary"
                            : "bg-white/[0.06] text-muted-foreground",
                        )}>{it.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-border/50">
        <div className="glass rounded-xl p-3 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative">
            <div className="text-xs font-semibold">Upgrade to Enterprise</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Unlimited screening, priority AI</div>
            <button className="mt-2 w-full text-xs font-medium py-1.5 rounded-md gradient-primary-bg text-white shadow-[var(--shadow-glow-primary)]">
              View plans
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
