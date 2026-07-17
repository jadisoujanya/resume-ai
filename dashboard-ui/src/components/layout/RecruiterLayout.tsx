import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function RecruiterLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-[#0B1120]">
      <Sidebar role="recruiter" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar role="recruiter" />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}