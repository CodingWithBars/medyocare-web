"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if user already logged in
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) router.replace("/dashboard");
  }, [router]);

  const verifyCode = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, code }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        setError("Server returned an invalid response.");
        setLoading(false);
        return;
      }

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      // Save full user data
      localStorage.setItem("session", JSON.stringify(data.user));

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Verification error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Verify Your Code</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">Code verified! Redirecting...</p>}

        <form onSubmit={verifyCode} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-3 rounded"
            maxLength={4}
            required
          />

          <button
            type="submit"
            className={`bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm">
          Code sent to: <b>{emailParam}</b>
        </p>
      </div>
    </div>
  );
}
