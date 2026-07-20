import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { useState, useRef, useEffect } from "react";
import { askCareerCoach } from "@/lib/api";
import {
  Sparkles,
  Send,
  Paperclip,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/career-coach")({
  head: () => ({ meta: [{ title: "AI Career Coach · Career Intelligence" }] }),
  component: Page,
});

const SUGGESTED = [
  "How can I improve my resume?",
  "How can I increase my ATS score?",
  "Am I ready for placements?",
  "Help me prepare for interviews.",
  "What technical skills should I learn next?",
  "Suggest certifications for my career.",
  "Recommend projects for my resume.",
  "Create a 3-month learning roadmap.",
  "How do I build a strong LinkedIn profile?",
  "What career path suits my skills?"
];

function Page() {

  const [messages, setMessages] = useState<any[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedPrompt, setSelectedPrompt] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
   
  const [showPrompts, setShowPrompts] = useState(false);

const bottomRef = useRef<HTMLDivElement>(null);

const sendMessage = async (text?: string) => {

    const message = (text ?? input).trim();

    if (!message) return;

    setLoading(true);

    setInput("");

    setMessages(prev => [
        ...prev,
        {
            role: "user",
            content: message
        }
    ]);

    try {

        const res = await askCareerCoach(1, message);

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                content: res.reply
            }
        ]);

    } catch {

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                content: "Sorry, I couldn't respond."
            }
        ]);

    }

    setLoading(false);

};


  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

return (
  <AppLayout>
    <PageHeader
      eyebrow="Personal AI"
      title="AI Career Coach"
      subtitle="Your always-on career strategist."
    />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

      {/* ================= CHAT ================= */}

      <GlassCard className="lg:col-span-8" padded={false}>
        <div className="p-5 h-[520px] flex flex-col">

          {/* Chat Area */}

          <div className="flex-1 overflow-y-auto space-y-4">

            {messages.map((m, i) => (

              <div
                key={i}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white/[0.06] border border-border text-white"
                  }`}
                >
                  {m.content}
                </div>

              </div>

            ))}

            {loading && (

              <div className="flex gap-3">

                <div className="w-8 h-8 rounded-lg gradient-primary-bg grid place-items-center">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                </div>

                <div className="bg-white/[0.04] border border-border rounded-2xl px-4 py-3">

                  <span className="inline-flex gap-1">

                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />

                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: ".2s" }}
                    />

                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: ".4s" }}
                    />

                  </span>

                </div>

              </div>

            )}

            {/* AUTO SCROLL */}
            <div ref={bottomRef} />

          </div>

          {/* INPUT BAR */}

          <div className="mt-3 rounded-2xl bg-white/[0.03] border border-border/70 p-2 flex items-center gap-2">

            {/* Upload */}

            <button
              className="p-2 rounded-lg hover:bg-white/[0.05]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) => {

                const file = e.target.files?.[0];

                if (!file) return;

                setMessages(prev => [

                  ...prev,

                  {
                    role: "user",
                    content: `📎 Uploaded: ${file.name}`,
                  },

                  {
                    role: "assistant",
                    content:
                      "Thanks! I received your file. File analysis isn't enabled yet, but you can ask me questions about it and I'll do my best to help.",
                  },

                ]);

              }}
            />

            {/* Message */}

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."

              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  e.preventDefault();

                  sendMessage();

                }

              }}

              className="flex-1 bg-transparent outline-none text-sm px-2"
            />

            {/* Send */}

            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>

          </div>

        </div>
      </GlassCard>

      {/* ================= RIGHT PANEL ================= */}

      <div className="lg:col-span-4 space-y-4">

    <GlassCard>

    <div className="flex items-center justify-between mb-3">

        <h3 className="font-semibold">
            Suggested Prompts
        </h3>

        <ChevronDown className="w-4 h-4 text-muted-foreground"/>

    </div>

    <select

        value={selectedPrompt}

        onChange={(e)=>{

            setSelectedPrompt(e.target.value);

            setInput(e.target.value);

        }}

        className="w-full rounded-xl bg-white/[0.04] border border-border p-3 text-sm outline-none"

    >

        <option value="">
            Choose a prompt...
        </option>

        {SUGGESTED.map((s)=>(

            <option
                key={s}
                value={s}
            >
                {s}
            </option>

        ))}

    </select>

</GlassCard>

     

     <GlassCard title="AI Career Coach">

    <p className="text-sm text-muted-foreground leading-6">

        👋 Hi! I'm your AI Career Coach.

        <br /><br />

        I can help you improve your resume, prepare for interviews,
        explore career paths, recommend skills to learn, suggest
        projects, explain certifications, and answer placement-related
        questions in a simple and friendly way.

    </p>

</GlassCard>
      </div>

    </div>

  </AppLayout>
);

}