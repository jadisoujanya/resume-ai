import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { MessagesSquare, Play } from "lucide-react";

export const Route = createFileRoute("/interview-prep")({
  component: Page,
});

function Page() {
  const user = useUser();

  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const res = await api.post("/interview/generate", {
        user_id: user.id,
        role: "Software Engineer",
        difficulty: "Medium",
      });

      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, [user]);

  return (
    <AppLayout>
      <PageHeader
        eyebrow="Interview Intelligence"
        title="Interview Preparation"
        subtitle="AI generated interview questions based on your resume."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        <GlassCard
          className="lg:col-span-12"
          title="Technical Interview Questions"
        >

          {loading && (
            <div className="text-sm text-muted-foreground">
              Generating interview questions...
            </div>
          )}

          {!loading && questions.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No questions generated.
            </div>
          )}

          <div className="space-y-3">

            {questions.map((q, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.03] border border-border/50 flex gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary grid place-items-center text-xs font-mono">
                  Q{i + 1}
                </div>

                <div className="flex-1">

                  <div className="text-sm">
                    {q}
                  </div>

                  <button className="mt-3 text-xs px-3 py-1 rounded-md bg-primary text-white inline-flex items-center gap-2">

                    <Play className="w-3 h-3" />

                    Practice

                  </button>

                </div>

              </div>
            ))}

          </div>

        </GlassCard>

      </div>

    </AppLayout>
  );
}