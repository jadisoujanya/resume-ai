import { Search, Bell, Command, ChevronDown, Sparkles } from "lucide-react";
import { useMode } from "@/lib/mode-store";
import { useUser } from "@/hooks/useUser";

export function Topbar() {

  const { mode } = useMode();

const user = useUser();

const initials =
  (user?.name ?? "User")
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="h-full px-6 flex items-center gap-4">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <button className="w-full group flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-border/70 hover:border-border transition-colors text-left">
            <Search className="w-4 h-4 text-muted-foreground" />
           <span className="text-sm text-muted-foreground">
  {mode === "candidate"
    ? "Search jobs, resumes, skills..."
    : "Search candidates, roles, skills..."}
</span>
            <span className="ml-auto hidden md:inline-flex items-center gap-1 text-[10px] text-muted-foreground/80">
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-border/60 font-mono">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-border/60 font-mono">K</kbd>
            </span>
          </button>
        </div>

        {/* AI Assistant chip */}
        <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-xs font-medium hover:from-primary/30 hover:to-accent/30 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Ask AI
        </button>

        {/* Command */}
        <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors" aria-label="Command palette">
          <Command className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors" aria-label="Notifications">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive ring-2 ring-background animate-pulse-glow" />
        </button>

        {/* User */}
      <button className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl hover:bg-white/[0.04] transition-colors">

  <div className="w-8 h-8 rounded-lg gradient-primary-bg grid place-items-center text-xs font-semibold text-white">
    {initials}
  </div>

  <div className="hidden md:block text-left leading-tight">
   <div className="text-xs font-medium">
  {user?.name || "User"}
</div>

    <div className="text-[10px] text-muted-foreground">
      {mode === "candidate"
        ? "Candidate"
        : "Recruiter"}
    </div>
  </div>

  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />

</button>

      </div>
    </header>
  );
}
