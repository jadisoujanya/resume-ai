import {

Copy,

Download,

X

} from "lucide-react";

type Props = {
  open: boolean;
  resume: string;
  onClose: () => void;
};

export default function ResumePreviewModal({
  open,
  resume,
  onClose,
}: Props) {

  if (!open) return null;

  const copyResume = async () => {
    await navigator.clipboard.writeText(resume);
    alert("Resume copied!");
  };

  const downloadResume = () => {

  const blob = new Blob([resume], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "AI_Rewritten_Resume.txt";

  a.click();

  URL.revokeObjectURL(url);

};

  return (
<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start overflow-y-auto py-6">

<div
className="
bg-[#111827]
rounded-2xl
w-[96vw]
max-w-6xl
h-fit
max-h-[calc(100vh-48px)]
flex
flex-col
overflow-hidden
shadow-2xl
">

<div className="overflow-y-auto p-6">
              <h2 className="text-2xl font-bold">
            AI Generated Resume
          </h2>

          <div className="flex gap-3">

           <button
onClick={copyResume}
className="p-2 rounded-lg hover:bg-white/10"
>

<Copy size={18}/>

</button>

<button
onClick={downloadResume}
className="p-2 rounded-lg hover:bg-white/10"
>
<Download size={18}/>
</button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10"
            >
              <X />
            </button>

          </div>

        </div>

<div
className="
p-8
max-h-[80vh]
overflow-y-auto
"
>   
          <pre
className="
whitespace-pre-wrap
font-sans
text-[15px]
leading-8
tracking-wide
"
>

            {resume}
          </pre>

        </div>

      </div>

    </div>
  );
}