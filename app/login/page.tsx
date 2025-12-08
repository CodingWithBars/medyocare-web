"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) router.replace("/dashboard");
  }, [router]);

  const sendCode = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !studentId.trim()) {
      setMessage({ type: "error", text: "Please enter both email and student ID." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/request-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, studentId }),
      });

      const data = await res.json().catch(() => {
        throw new Error("Invalid server response");
      });

      if (!res.ok || !data.ok) {
        setMessage({ type: "error", text: data?.message || "Invalid email or student ID." });
        setLoading(false);
        return;
      }

      // Save pending login in localStorage
      localStorage.setItem("pendingLogin", JSON.stringify({ email, studentId }));

      setMessage({ type: "success", text: `Verification code sent to ${email}!` });
      setTimeout(() => router.push(`/verify?email=${encodeURIComponent(email)}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">

      {/* LEFT COLUMN */}
      <div className="bg-blue-600 text-white p-10 flex flex-col items-center justify-center space-y-6">
        <h2 className="text-3xl font-bold text-center">
          Welcome Student!
        </h2>
        <p className="text-blue-100 text-center leading-relaxed">
          Log in to manage your student account, view your dashboard,
          and update personal information.
        </p>

        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/student-login-illustration-download-in-svg-png-gif-file-formats--sign-in-web-mobile-pack-flat-style-5009880.png"
          alt="Student illustration"
          className="max-w-xs opacity-90"
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6 text-blue-900 text-center">
          Student Login
        </h1>

        {message && (
          <p className={`mb-4 text-center ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={sendCode} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Student Email
            </label>
            <input
              type="email"
              placeholder="name@student.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-1">
              Student ID
            </label>
            <input
              type="text"
              placeholder="e.g. 2023-00125"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={loading}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition shadow-md ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending Code..." : "Send Verification Code"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-5">
          By continuing, you agree to our policies.
        </p>
      </div>
    </div>
  </div>
);

}
