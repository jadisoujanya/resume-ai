import { createFileRoute } from "@tanstack/react-router";

import RecruiterDashboard from "@/components/dashboards/RecruiterDashboard";
import { AppLayout } from "@/components/layout/AppLayout";

export const Route = createFileRoute("/recruiter/")({
  component: RecruiterPage,
});

function RecruiterPage() {
  return (
    <AppLayout>
      <RecruiterDashboard />
    </AppLayout>
  );
}