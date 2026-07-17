import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useCandidateDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/candidate-dashboard")
      .then((res) => {
        console.log(res.data);   // <-- add this
        setDashboard(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { dashboard, loading };
}