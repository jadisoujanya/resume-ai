import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { signup } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {

 const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "Male",
    role: "Student",
    country: "",
    state: "",
    city: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
}
async function handleSignup() {

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {

    setLoading(true);

    const result = await signup({
      name: form.name,
      dob: form.dob,
      gender: form.gender,
      role: form.role,
      country: form.country,
      state: form.state,
      city: form.city,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    alert(result.message);

    window.location.href = "/login";

  } catch (err: any) {

    alert(err.message);

  } finally {

    setLoading(false);

  }
}

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-5xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-white mb-10">
          Create Your Account
        </h1>

    
{/* Row 1 */}
<div className="grid md:grid-cols-2 gap-6">
  {/* Full Name */}
  <div>
    <label>Full Name</label>
   <input
type="text"
name="name"
value={form.name}
onChange={handleChange}
className="w-full mt-2 rounded-xl border p-3"
/>
  </div>

  {/* DOB */}
  <div>
    <label>Date of Birth</label>
    <input
      type="date"
      name="dob"
value={form.dob}
onChange={handleChange}
      className="w-full mt-2 rounded-xl border p-3"
    />
  </div>
</div>

{/* Row 2 */}
<div className="grid md:grid-cols-2 gap-6 mt-4">
  <div>
    <label>Gender</label>
    <select
  name="gender"
  value={form.gender}
  onChange={handleChange}
  className="w-full mt-2 rounded-xl border p-3"
>
  <option>Male</option>
  <option>Female</option>
  <option>Other</option>
</select>
</div>
  <div>
    <label>Role</label>
 <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full mt-2 rounded-xl border p-3"
>
  <option>Student</option>
  <option>Job Seeker</option>
  <option>Recruiter</option>
  <option>Professional</option>
</select>
  </div>
</div>

{/* Row 3 */}
<div className="grid md:grid-cols-3 gap-6 mt-4">

  <div>
    <label>Country</label>
    <input
      type="text"
      name="country"
value={form.country}
onChange={handleChange}
      placeholder="Country"
      className="w-full mt-2 rounded-xl border p-3"
    />
  </div>

  <div>
    <label>State</label>
<input
  type="text"
  name="state"
  value={form.state}
  onChange={handleChange}
  placeholder="State"
  className="w-full mt-2 rounded-xl border p-3"
/>
  </div>

  <div>
    <label>City</label>
 <input
  type="text"
  name="city"
  value={form.city}
  onChange={handleChange}
  placeholder="City"
  className="w-full mt-2 rounded-xl border p-3"
/>
  </div>

</div>

{/* Row 4 */}
<div className="grid grid-cols-2 gap-4 mt-4">

  <div>
    <label className="block mb-1 text-sm font-medium">
      Email
    </label>

    <input
      type="email"
      name="email"
value={form.email}
onChange={handleChange}
      placeholder="Enter Email"
      className="w-full rounded-lg border border-border bg-white/5 px-3 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 text-sm font-medium">
      Phone Number
    </label>

    <div className="flex">
      <select
        className="rounded-l-lg border border-border bg-white/5 px-2 py-2 w-20"
      >
        <option>+91</option>
      </select>

      <input
        type="tel"
        name="phone"
value={form.phone}
onChange={handleChange}
        placeholder="Phone Number"
        className="flex-1 rounded-r-lg border border-l-0 border-border bg-white/5 px-3 py-2"
      />
    </div>
  </div>

</div>

{/* Row 5 */}
<div className="grid md:grid-cols-2 gap-6 mt-4">

  <div>
    <label>Password</label>
    <input
      type="password"
      name="password"
value={form.password}
onChange={handleChange}
      className="w-full mt-2 rounded-xl border p-3"
    />
  </div>

  <div>
    <label>Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
value={form.confirmPassword}
onChange={handleChange}
      className="w-full mt-2 rounded-xl border p-3"
    />
  </div>

</div>

   <button
type="button"
onClick={handleSignup}
disabled={loading}
className="w-full mt-10 rounded-xl bg-violet-600 py-4 text-white font-semibold hover:bg-violet-700"
>

{loading ? "Creating Account..." : "Create Account"}

</button>

        <p className="text-center text-gray-400 mt-4">

          Already have an account?{" "}

          <Link to="/login" className="text-blue-400">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}