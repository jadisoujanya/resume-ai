import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  email: "",
  password: "",
});

function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
}

async function handleLogin() {

  try {

    setLoading(true);

    const result = await login({
      email: form.email,
      password: form.password,
    });

    // Save logged-in user
    localStorage.setItem(
      "user",
      JSON.stringify(result.user)
    );

    // Save role separately
    localStorage.setItem(
      "role",
      result.user.role
    );

    alert(result.message);

    // Redirect to dashboard
if (result.user.role === "candidate") {
  window.location.href = "/candidate";
} else {
  window.location.href = "/recruiter";
}
  } catch (err: any) {

    alert(err.message);

  } finally {

    setLoading(false);

  }

}

  return (
    <div className="min-h-screen bg-[#0B1120] relative overflow-hidden flex items-center justify-center">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Login to ResumeIQ
        </p>

        <form className="mt-10 space-y-6">

          <div>

            <label className="text-sm text-slate-300">
              Email Address
            </label>

          <input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Enter your email"
  className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-violet-500"
/>

          </div>

          <div>

            <label className="text-sm text-slate-300">
              Password
            </label>

           <input
  type="password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="Enter password"
  className="mt-2 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-violet-500"
/>

          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex gap-2 items-center text-slate-300">

              <input type="checkbox" />

              Remember me

            </label>

            <Link
              to="/forgot-password"
              className="text-violet-400 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

        <button
  onClick={handleLogin}
  type="button"
  disabled={loading}
  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 transition font-semibold"
>
  {loading ? "Logging In..." : "Login"}
</button>

        </form>

        <p className="mt-8 text-center text-slate-400">

          Don't have an account?

          <Link
            to="/signup"
            className="text-violet-400 ml-2 hover:underline"
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}