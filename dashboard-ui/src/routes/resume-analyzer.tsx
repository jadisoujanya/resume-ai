import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "@/hooks/useUser";
import { AppLayout, PageHeader } from "@/components/layout/AppLayout";
import { GlassCard, Ring } from "@/components/ui-kit/GlassCard";
import { Badge } from "@/components/ui-kit/atoms";
import { Trash2 } from "lucide-react";

import {
  UploadCloud,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";


type ResumeResult = {
  resume_score: number;
  ats_score: number;
  detected_role: string;
  career_level: string;
  resume_rank: string;
  skills_found: string[];
  missing_skills: string[];

  ai_suggestions: string[];
  career_roadmap: string[];
  learning_roadmap: string[];

  professional_summary: string;

  readiness_score: number;

  recommended_tools: string[];
  recommended_certifications: string[];
  salary_range: string;
  resume_text: string;

};

function ResumeAnalyzer() {

const user = useUser();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);

  const [uploadedFileName, setUploadedFileName] = useState("");
  

  useEffect(() => {

  const storedAnalysis =
    localStorage.getItem("resume_analysis");

  const storedFile =
    localStorage.getItem("resume_file");

  if (storedAnalysis) {

    setResult(JSON.parse(storedAnalysis));

  }

  if (storedFile) {

    setUploadedFileName(storedFile);

  }

}, []);


  async function handleUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

if (!file) return;

setUploadedFileName(file.name);

  const formData = new FormData();

 if (!user?.id) {
  alert("Please login again");
  return;
}

formData.append("user_id", String(user.id));

formData.append("file", file);

setLoading(true);

  try {

    const res = await fetch(
      "http://127.0.0.1:8000/upload-resume/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();


localStorage.setItem("resume_file", file.name);

console.log("Saved resume analysis:", data);


  if (data.success === false) {
   throw new Error(data.error || "Upload failed");
}


localStorage.setItem(
  "resume_analysis",
  JSON.stringify(data)
);


localStorage.setItem(
    "detected_role",
    data.detected_role
);

localStorage.setItem(
    "resume_score",
    data.resume_score.toString()
);

localStorage.setItem(
    "resume_skills",
    JSON.stringify(data.skills_found)
);

localStorage.setItem(
    "resume_text",
    data.resume_text
);


console.log("Resume API response:");
console.log(data);
console.log("career_roadmap =", data.career_roadmap);
console.log("type =", typeof data.career_roadmap);
console.log("isArray =", Array.isArray(data.career_roadmap));

console.log(JSON.stringify(data, null, 2));

console.log("Resume API response:", data);

setResult(data);

console.log("Saved skills");

console.log(
    localStorage.getItem("resume_skills")
);
   

  } catch (err) {

    console.error(err);

    alert("Upload failed");

  }

  setLoading(false);
}

  return (
    <AppLayout>
    <PageHeader
  eyebrow="Resume Intelligence"
  title="Resume Analyzer"
  subtitle="Upload your resume to receive AI-powered ATS analysis."
  actions={
    <button
      onClick={() =>
        window.open(
          "http://127.0.0.1:8000/download-report",
          "_blank"
        )
      }
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
    >
      <Download className="w-4 h-4" />
      Download Report
    </button>
  }
/>

      <div className="grid grid-cols-12 gap-6">
        <GlassCard
          className="col-span-8"
          title="Upload Resume"
          description="PDF only"
        >

<div className="border-2 border-dashed rounded-xl p-8 text-center">

          {uploadedFileName ? (

  <div className="space-y-5">

    <FileText className="mx-auto h-10 w-10 text-blue-500" />

    <div>

      <h3 className="font-semibold text-lg">
        {uploadedFileName}
      </h3>

      <p className="text-sm text-muted-foreground">
        Resume uploaded successfully
      </p>

    </div>

   <div className="flex justify-center gap-3">
  <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg">
    Replace Resume
    <input
      hidden
      type="file"
      accept=".pdf"
      onChange={handleUpload}
    />
  </label>

  <button
    onClick={() => {
      setUploadedFileName("");
      setResult(null);

      localStorage.removeItem("resume_file");
      localStorage.removeItem("resume_analysis");
    }}
    className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 text-white"
    title="Delete Resume"
  >
    <Trash2 size={18} />
  </button>
</div>
  </div>

) : (

  <>
    <UploadCloud className="mx-auto h-10 w-10 mb-4" />

    <p className="font-semibold">
      Upload Resume
    </p>

    <label className="inline-block mt-6 cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg">

      Browse Resume

      <input
        hidden
        type="file"
        accept=".pdf"
        onChange={handleUpload}
      />

    </label>

  </>

)}

          </div>

        </GlassCard>

        <GlassCard
          className="col-span-4"
          title="Overall Scores"
          description="Generated after upload"
        >

          <div className="flex justify-around">

            <Ring
              value={result?.resume_score ?? 0}
              tone="primary"
              size={100}
              label="Resume"
            />

            <Ring
              value={result?.ats_score ?? 0}
              tone="success"
              size={100}
              label="ATS"
            />

          </div>

        </GlassCard>

      </div>
            <div className="grid grid-cols-12 gap-6 mt-6">

        {/* Extracted Skills */}

        <GlassCard
          className="col-span-7"
          title="Extracted Skills"
          description="Skills detected from your resume"
        >

          {result ? (

            <div className="grid grid-cols-2 gap-3">

              {(result.skills_found ?? []).map((skill) => (

                <div
                  key={skill}
                  className="rounded-lg border border-border p-3 bg-white/5"
                >
                  {skill}
                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-muted-foreground">
              Upload a resume to view extracted skills.
            </p>

          )}

        </GlassCard>

        {/* Missing Skills */}

        <GlassCard
          className="col-span-5"
          title="Missing Skills"
          description="Recommended skills for your target role"
        >

          {result ? (

            <div className="space-y-3">

              {(result?.missing_skills?.length ?? 0) === 0 ? (

                <Badge tone="success">
                  No missing skills 🎉
                </Badge>

              ) : (

                (result.missing_skills ?? []).map((skill) => (

                  <div
                    key={skill}
                    className="rounded-lg border border-border p-3 bg-white/5"
                  >
                    {skill}
                  </div>

                ))

              )}

            </div>

          ) : (

            <p className="text-sm text-muted-foreground">
              Upload a resume first.
            </p>

          )}

        </GlassCard>

      </div>

      {/* Resume Summary */}

      {result && (

        <GlassCard
          className="mt-6"
          title="Resume Summary"
          description="AI generated information"
        >

          <div className="grid grid-cols-3 gap-5">

            <div>

              <h4 className="font-semibold">
                Detected Role
              </h4>

              <p className="mt-2">
                {result.detected_role}
              </p>

            </div>

            <div>

              <h4 className="font-semibold">
                Career Level
              </h4>

              <p className="mt-2">
                {result.career_level}
              </p>

            </div>

            <div>

              <h4 className="font-semibold">
                Resume Rank
              </h4>

              <p className="mt-2">
                {result.resume_rank}
              </p>

            </div>

          </div>

        </GlassCard>

      )}



<GlassCard
className="mt-6"
title="Career Readiness"
>

{result && (

<div className="flex justify-center">

<Ring

value={result.readiness_score}

tone="success"

size={130}

label="Ready"

sublabel="AI Prediction"

/>

</div>

)}

</GlassCard>

<GlassCard
  className="mt-6"
  title="Estimated Salary"
  description="Based on detected role"
>
  {result && (
    <div className="text-2xl font-semibold text-primary">
      {result.salary_range}
    </div>
  )}
</GlassCard>




<GlassCard
  className="mt-6"
  title="Recommended Certifications"
>

{result && (

<div className="grid grid-cols-2 gap-3">

{result.recommended_certifications.map((cert,i)=>(

<div
key={i}
className="rounded-lg border border-border p-3 bg-white/[0.03]"
>

🏆 {cert}

</div>

))}

</div>

)}

</GlassCard>



<GlassCard
className="mt-6"
title="Professional Summary"
>

{result && (

<p className="leading-7">

{result.professional_summary}

</p>

)}

</GlassCard>



            {/* AI Suggestions */}

    <GlassCard
  className="mt-6"
  title="AI Suggestions"
  description="Generated by Career AI"
>
  {result ? (
    <div className="space-y-3">

      {(result.ai_suggestions ?? []).map((item, index) => (

        <div
          key={index}
          className="rounded-xl border border-border bg-white/[0.03] p-4"
        >
          <div className="flex items-center gap-2 mb-2">

            <Sparkles className="h-4 w-4 text-primary"/>

            <h4 className="font-medium">
              Suggestion {index + 1}
            </h4>

          </div>

          <p className="text-sm text-muted-foreground">
            {item}
          </p>

        </div>

      ))}

    </div>
  ) : (
    <p>Upload your resume first.</p>
  )}
</GlassCard>

<GlassCard
  className="mt-6"
  title="Career Roadmap"
  description="Recommended next steps"
>
  {result && (
    <div className="space-y-3">
      {Array.isArray(result.career_roadmap) &&
        (result.career_roadmap ?? []).map((step, index) => (
          <div
            key={index}
            className="rounded-lg border border-border p-3 bg-white/[0.03]"
          >
            <strong>Step {index + 1}</strong>

            <p className="text-sm mt-1">{step}</p>
          </div>
        ))}
    </div>
  )}
</GlassCard>

<GlassCard
className="mt-6"
title="Recommended Tools"
>

{result && (

<div className="flex flex-wrap gap-3">

{result.recommended_tools.map((tool,index)=>(

<Badge key={index}>

{tool}

</Badge>

))}

</div>

)}

</GlassCard>


<GlassCard
className="mt-6"
title="Learning Roadmap"
>

{result && (

<div className="space-y-3">

{(result.learning_roadmap ?? []).map((step,i)=>(

<div
key={i}
className="p-3 rounded-lg border border-border bg-white/[0.03]"
>

📘 {step}

</div>

))}

</div>

)}

</GlassCard>



    </AppLayout>

  );
}

export const Route = createFileRoute("/resume-analyzer")({
  component: ResumeAnalyzer,
});
