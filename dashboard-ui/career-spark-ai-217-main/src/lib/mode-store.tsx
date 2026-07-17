import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AppMode = "candidate" | "recruiter";

type Ctx = {
  mode: AppMode;
  setMode: (m: AppMode) => void;
  toggle: () => void;
};

const ModeContext = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>("candidate");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("app-mode") as AppMode | null;
    if (saved === "candidate" || saved === "recruiter") setMode(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("app-mode", mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, toggle: () => setMode(mode === "candidate" ? "recruiter" : "candidate") }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used inside ModeProvider");
  return ctx;
}
