import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import ResumePreviewModal from "@/components/ResumePreviewModal";
import { PenLine, Sparkles, Wand2, Copy } from "lucide-react";
import { useResumeRewrite } from "@/hooks/useResumeRewrite";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/resume-rewriter")({
  head: () => ({ meta: [{ title: "Resume Rewriter · Career Intelligence" }] }),
  component: Page,
});

function Page() {



  const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  } catch {
    alert("Failed to copy");
  }
};


  const {

    rewrite,

    result,

    fullResume,

    setFullResume,

    rewriteLoading,

    fullResumeLoading

} = useResumeRewrite();

  const [resumeText, setResumeText] = useState("");



  useEffect(() => {

    const savedResume =
        localStorage.getItem("resume_text");

    if (savedResume) {

        setResumeText(savedResume);

    }

}, []);


  const [showModal, setShowModal] = useState(false);

  const [targetRole, setTargetRole] =
useState("")

  return (
    <AppLayout>
      <PageHeader
        eyebrow="AI Rewriting"
        title="Resume Rewriter"
        subtitle="Our LLM rewrites each bullet with quantified impact, keyword coverage, and recruiter-optimized phrasing."
        actions={
          <button

onClick={async () => {

    await rewrite(
        resumeText,
        targetRole,
        "full"
    );

    setShowModal(true);

}}

disabled={fullResumeLoading}

className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white shadow-[var(--shadow-glow-primary)]"

>

<Wand2 className="w-4 h-4" />

{fullResumeLoading ? "Generating..." : "Rewrite All"}


</button>
        }
      />

      <div className="glass rounded-2xl p-5 mb-6 space-y-4">

  <textarea
    value={resumeText}
    onChange={(e) => setResumeText(e.target.value)}
    rows={12}
    placeholder="Paste your resume..."
    className="w-full rounded-xl bg-black/20 p-4 border border-border"
  />

  <input
    value={targetRole}
    onChange={(e) => setTargetRole(e.target.value)}
    placeholder="Enter your target role"
    className="w-full rounded-xl bg-black/20 p-3 border border-border"
  />

 <button
    onClick={() =>
        rewrite(
            resumeText,
            targetRole,
            "rewrite"
        )
    }

    disabled={rewriteLoading}

    className="px-5 py-3 rounded-xl gradient-primary-bg text-white"
  >
{rewriteLoading ? "Rewriting..." : "Rewrite Resume"}
  </button>

</div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[["ATS uplift", `${result?.summary?.ats_gain ?? 0} pts`],["Keyword coverage", `${result?.summary?.keyword_coverage ?? 0}%`],["Impact bullets", result?.summary?.impact_bullets ?? "-"]].map(([k,v]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-2xl font-semibold mt-1 gradient-text">{v}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {result?.sections?.map((r: any, i: number) => (
          <GlassCard key={i}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-primary" />
                <div className="text-sm font-semibold">{r.title}</div>
              </div>
              <Badge tone="success">+{r.ats_gain} ATS</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div
className="
p-4
rounded-xl
bg-white/[0.02]
border border-border/50
max-h-[450px]
overflow-y-auto
"
>            
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Before</div>

<div
className="
text-sm
text-muted-foreground
leading-7
whitespace-pre-wrap
"
>
  {r.before}
</div>              </div>

<div
className="
p-4
rounded-xl
bg-gradient-to-br
from-primary/10
to-accent/10
border
border-primary/25
max-h-[450px]
overflow-y-auto
"
>
  
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-medium flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Rewrite</div>
<button
    onClick={() => copyText(r.after)}
    className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
>
    <Copy className="w-3 h-3" />
    Copy
</button>                </div>

<div
className="
text-sm
leading-7
whitespace-pre-wrap
"
>
  {r.after}
</div>
              </div>
            </div>
          </GlassCard>
        ))}

      </div>
<ResumePreviewModal

open={showModal}

resume={fullResume}

onClose={() => setShowModal(false)}

/>

    </AppLayout>
  );
}
