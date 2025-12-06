"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      router.replace("/dashboard");
    }
  }, [router]);

  const sendCode = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !studentId) {
      setError("Please enter both email and student ID.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/request-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, studentId }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "Invalid email or student ID");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to verification page after a short delay
      setTimeout(() => {
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Student Login</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && (
          <p className="text-green-600 mb-2">
            Verification code sent to <b>{email}</b>!
          </p>
        )}

        <form onSubmit={sendCode} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Student Email"
            value={email}
            className="border p-3 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            className="border p-3 rounded"
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
