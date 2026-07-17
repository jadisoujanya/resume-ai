import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="logo"
                className="w-12 h-12 rounded-xl"
              />

              <h1 className="text-4xl font-bold text-violet-500">
                ResumeIQ
              </h1>
            </div>

            <nav className="hidden lg:flex gap-10 font-medium text-gray-300">
              <a className="hover:text-white cursor-pointer">
                Upload Resume
              </a>

              <a className="hover:text-white cursor-pointer">
                Resume Analysis
              </a>

              <a className="hover:text-white cursor-pointer">
                JD Matching
              </a>

              <a className="hover:text-white cursor-pointer">
                Resume Comparison
              </a>
            </nav>

            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
              >
                Signup
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main className="max-w-7xl mx-auto px-8">
          <section className="min-h-[88vh] flex items-center">
            <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

              {/* LEFT SIDE */}

              <div>
                <p className="uppercase tracking-[4px] text-violet-400 font-semibold mb-6">
                  AI Powered Resume Intelligence
                </p>

                <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
                  Hire with Evidence.
                  <br />
                  Apply with Confidence.
                </h1>

                <h2 className="mt-8 text-3xl font-semibold text-blue-400">
                  AI-Powered Resume Intelligence Platform
                </h2>

                <p className="mt-8 text-xl leading-9 text-slate-300 max-w-xl">
                  ResumeIQ is an AI-powered Resume Intelligence Platform that
                  helps students, professionals and recruiters evaluate,
                  optimize and compare resumes using Artificial Intelligence.

                  <br />
                  <br />

                  Get ATS Compatibility, Resume Ranking, Skill Gap Detection,
                  Career Prediction, Resume Comparison, JD Matching and AI
                  Career Guidance inside one intelligent platform.
                </p>

                <div className="mt-10">
                  <Link
                    to="/signup"
                    className="px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 font-bold text-black shadow-2xl hover:scale-105 transition"
                  >
                    🚀 Try Free Trial
                  </Link>
                </div>

                {/* Badges */}

                <div className="flex flex-wrap gap-4 mt-10">
                  <div className="px-5 py-2 rounded-full bg-white/10">
                    🔒 Secure Upload
                  </div>

                  <div className="px-5 py-2 rounded-full bg-white/10">
                    🤖 AI Powered
                  </div>

                  <div className="px-5 py-2 rounded-full bg-white/10">
                    📄 ATS Friendly
                  </div>

                  <div className="px-5 py-2 rounded-full bg-white/10">
                    ⚡ Instant Analysis
                  </div>

                  <div className="px-5 py-2 rounded-full bg-white/10">
                    💳 Free Trial
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}

              <div className="hidden lg:flex justify-center">
                <div className="w-[430px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8">

                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-semibold text-xl">
                      Resume Analysis
                    </h3>

                    <span className="text-green-400 font-semibold">
                      Completed
                    </span>
                  </div>

                  <div className="space-y-6">

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>ATS Compatibility</span>
                        <span>92%</span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-white/10">
                        <div className="w-[92%] h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Resume Score</span>
                        <span>87%</span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-white/10">
                        <div className="w-[87%] h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span>JD Match</span>
                        <span>81%</span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-white/10">
                        <div className="w-[81%] h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                      </div>
                    </div>

                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-gray-400">
                        Skills Found
                      </p>

                      <p className="text-2xl font-bold">
                        18
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-4">
                      <p className="text-sm text-gray-400">
                        Missing Skills
                      </p>

                      <p className="text-2xl font-bold">
                        6
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}