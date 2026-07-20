import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { MessagesSquare, Play } from "lucide-react";

export const Route = createFileRoute("/interview-prep")({
  head: () => ({ meta: [{ title: "Interview Prep · Career Intelligence" }] }),
  component: Page,
});



function Page() {

const [technicalQuestions, setTechnicalQuestions] = useState<string[]>([]);
const [hrQuestions, setHrQuestions] = useState<string[]>([]);

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);


useEffect(() => {

async function loadQuestions(){

try{

const res = await fetch(
"http://127.0.0.1:8000/interview/generate",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

user_id:user.id,
role:"Frontend Developer",
difficulty:"Medium"

})
}
);


const data = await res.json();


console.log(
"Interview questions:",
data
);


setTechnicalQuestions(data);


}
catch(err){

console.error(
"Interview API failed",
err
);

}

}


if(user.id){

loadQuestions();

}

},[]);

  return (
    <AppLayout>
      <PageHeader eyebrow="Interview Intelligence" title="Interview Preparation" subtitle="AI-generated question bank tailored to your resume, target role, and target company." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[["Coverage","94%"],["Est. difficulty","7.4 / 10"],["Prep sessions","3 completed"]].map(([k,v]) => (
          <div key={k} className="glass rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div><div className="text-2xl font-semibold mt-1">{v}</div></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <GlassCard className="lg:col-span-7" title="Technical" description="Expected questions for Staff ML Engineer">
          <div className="space-y-2">
            {technicalQuestions.map((q, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-border/50 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary grid place-items-center text-xs font-mono">Q{i+1}</div>
                <div className="flex-1 text-sm leading-relaxed">{q}</div>
                <button className="text-[10px] px-2 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] inline-flex items-center gap-1"><Play className="w-3 h-3" /> Practice</button>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-5" title="HR & Behavioral">
          <div className="space-y-2">
           {technicalQuestions.slice(0,5).map((q,i)=>(
              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-border/50">
                <div className="flex items-center gap-2 mb-1"><Badge tone="accent">HR</Badge><span className="text-[10px] text-muted-foreground">STAR-friendly</span></div>
                <div className="text-sm">{q}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg gradient-primary-bg text-sm font-medium text-white">
            <MessagesSquare className="w-4 h-4" /> Start mock interview
          </button>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
