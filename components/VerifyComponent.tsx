"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) router.replace("/dashboard");
  }, [router]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleBack = (index: number) => {
    if (digits[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyCode = async (e: FormEvent) => {
    e.preventDefault();

    const code = digits.join("");

    if (code.length !== 4) {
      setError("Please enter a 4-digit code.");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      localStorage.setItem("session", JSON.stringify(data.userSession));
      localStorage.removeItem("pendingLogin");

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
          <div className="flex justify-center gap-4">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                type="text"
                maxLength={1}
                value={digit}
                className="border w-14 h-14 text-center text-2xl rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") handleBack(i);
                }}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white p-3 rounded font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
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
