import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] relative overflow-hidden flex items-center justify-center">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-center text-slate-400 mt-3">
          We'll send a reset link to your email.
        </p>

        <form className="mt-8 space-y-6">

          <div>

            <label className="text-sm text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-violet-500"
            />

          </div>

          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 transition font-semibold"
          >
            Send Reset Link
          </button>

        </form>

        <div className="text-center mt-8">

          <Link
            to="/login"
            className="text-violet-400 hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}