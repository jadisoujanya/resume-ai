import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useJobMatches(
  skills: string[],
  role: string,
  score: number
) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!skills?.length) {
      setLoading(false);
      return;
    }

    console.log("Sending skills:", skills);

    api
      .post("/recommend-jobs", {
        skills,
        role,
        score,
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("Job API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [skills, role, score]);

  return {
    jobs,
    loading,
  };
}