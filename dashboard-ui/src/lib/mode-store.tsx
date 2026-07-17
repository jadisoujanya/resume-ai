import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AppMode = "candidate" | "recruiter";

type Ctx = {
  mode: AppMode;
};

const ModeContext = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>("candidate");

  useEffect(() => {
    const role = localStorage.getItem("role");

    const candidateRoles = [
      "student",
      "working_professional",
      "job_seeker",
      "candidate",
    ];

    if (role && candidateRoles.includes(role.toLowerCase())) {
      setMode("candidate");
    } else {
      setMode("recruiter");
    }
  }, []);

  return (
    <ModeContext.Provider value={{ mode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);

  if (!ctx) {
    throw new Error("useMode must be used inside ModeProvider");
  }

  return ctx;
}