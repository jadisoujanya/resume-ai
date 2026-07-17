import { useState } from "react";
import { api } from "@/lib/api";

export function useResumeRewrite() {

  const [rewriteLoading, setRewriteLoading] = useState(false);

  const [fullResumeLoading, setFullResumeLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const [fullResume, setFullResume] = useState("");

 const rewrite = async (
    resume_text: string,
    target_role: string,
    mode: "rewrite" | "full"
) => {

    if (mode === "rewrite")
    setRewriteLoading(true);

else
    setFullResumeLoading(true);

    try {

    const res = await api.post("/rewrite-resume", {
        resume_text,
        target_role,
    });

    console.log(res.data);

    setResult(res.data);

    setFullResume(res.data.full_resume);

}
catch(err){

    console.error(err);

}
finally{

    if(mode==="rewrite")
        setRewriteLoading(false);
    else
        setFullResumeLoading(false);

}

  };

return {

    rewrite,

    result,

    fullResume,

    setFullResume,

    rewriteLoading,

    fullResumeLoading,

};
}