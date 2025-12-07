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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-900 text-center">Student Login</h1>

        {message && (
          <p className={`mb-2 ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={sendCode} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            required
          />
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
