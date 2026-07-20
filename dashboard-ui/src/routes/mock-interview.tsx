import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { Bot } from "lucide-react";
import {
  generateInterview,
  getInterviewFeedback,
} from "@/lib/api";



export const Route = createFileRoute("/mock-interview")({
  head: () => ({ meta: [{ title: "Mock Interview · Career Intelligence" }] }),
  component: Page,
});
function Page() {

  const [questions, setQuestions] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const startInterview = async () => {
    try {
      setLoading(true);

      const q = await generateInterview(
        1,
        "Software Engineer"
      );

      setQuestions(q);
      setCurrent(0);
      setStarted(true);

    } finally {
      setLoading(false);
    }
  };

  const evaluate = async () => {

    if (!answer.trim()) return;

    setLoading(true);

    try {

      const res = await getInterviewFeedback(
        questions[current],
        answer
      );

      setFeedback(res.feedback);

    } finally {

      setLoading(false);

    }

  };

  const nextQuestion = () => {

    setAnswer("");
    setFeedback("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }

  };


  return (
  <AppLayout>
    <PageHeader
      eyebrow="AI Interview"
      title="Mock Interview Session"
      subtitle="Practice interviews with AI and get instant feedback."
    />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">

      {/* LEFT PANEL */}
      <GlassCard className="lg:col-span-8">

        <div className="flex flex-col items-center text-center space-y-6 py-8">

          <div className="w-24 h-24 rounded-full gradient-primary-bg grid place-items-center">
            <Bot className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-lg font-semibold">
            AI Interviewer
          </h2>

          {!started ? (

            <>
              <p className="text-sm text-muted-foreground">
                Ready to begin your mock interview?
              </p>

              <button
                onClick={startInterview}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-primary text-white"
              >
                {loading ? "Starting..." : "Start Interview"}
              </button>
            </>

          ) : (

            <div className="w-full space-y-5">

              <Badge tone="danger">
                Live
              </Badge>

              <div className="text-lg font-medium">
                Question {current + 1}
              </div>

              <div className="text-sm">
                {questions[current]}
              </div>

              <textarea
                rows={6}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full rounded-xl bg-white/5 border border-border p-4"
              />

              <button
                onClick={evaluate}
                disabled={loading}
                className="px-5 py-2 rounded-lg bg-primary text-white"
              >
                {loading ? "Evaluating..." : "Submit Answer"}
              </button>

            </div>

          )}

        </div>

      </GlassCard>

      {/* RIGHT PANEL */}

      <div className="lg:col-span-4 space-y-4">

        <GlassCard title="Interview Progress">

          <div className="grid place-items-center py-2">

            <Ring
              value={
started && questions.length > 0
? Math.round(((current + 1) / questions.length) * 100)
: 0
}
              tone="success"
              label="Completed"
            />

          </div>

        </GlassCard>

        <GlassCard title="AI Feedback">

          {!feedback ? (

            <p className="text-sm text-muted-foreground">
              Submit an answer to receive feedback.
            </p>

          ) : (

            <div className="space-y-4">

              <div className="rounded-lg bg-white/5 p-4 text-sm whitespace-pre-wrap">
                {feedback}
              </div>

              {current < questions.length - 1 ? (

                <button
                  onClick={nextQuestion}
                  className="w-full rounded-lg bg-green-600 text-white py-2"
                >
                  Next Question
                </button>

              ) : (

                <div className="text-green-400 font-medium">
                  Interview Completed 🎉
                </div>

              )}

            </div>

          )}

        </GlassCard>

      </div>

    </div>

  </AppLayout>
);
}