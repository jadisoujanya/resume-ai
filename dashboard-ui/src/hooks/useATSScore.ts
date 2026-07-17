import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useATSScore() {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<any>(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const resume =
          localStorage.getItem("resume_text");

        if (!resume) {
          setLoading(false);
          return;
        }

        const res = await api.post("/resume-score", {
          resume_text: resume,
        });

        setScore(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, []);

  return {
    score,
    loading,
  };
}