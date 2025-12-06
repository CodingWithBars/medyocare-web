"use client"; // Must be first line

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

      const data = await res.json().catch(() => {
        throw new Error("Invalid server response.");
      });

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      localStorage.setItem("session", JSON.stringify(data.user));
      setSuccess(true);
      setLoading(false);

      setTimeout(() => router.replace("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 shadow-lg rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-900 text-center">
          Verify Your Code
        </h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">Code verified! Redirecting...</p>}

        <form onSubmit={verifyCode} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={4}
            required
          />

          <button
            type="submit"
            className={`bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm text-center">
          Code sent to: <b>{emailParam || "your email"}</b>
        </p>
      </div>
    </div>
  );
}
