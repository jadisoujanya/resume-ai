import { createFileRoute } from "@tanstack/react-router";

import CandidateDashboard from "@/components/dashboards/CandidateDashboard";
import { AppLayout } from "@/components/layout/AppLayout";

export const Route = createFileRoute("/candidate/")({
  component: CandidatePage,
});

function CandidatePage() {
  return (
    <AppLayout>
      <CandidateDashboard />
    </AppLayout>
  );
}
