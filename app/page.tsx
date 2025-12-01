"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      router.push(`/student/${studentId.trim()}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-gray-900 font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center gap-12 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-bold text-teal-700 dark:text-teal-400 text-center">
          MedyoCare Student Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Access student medical records, clinic visits, and reports. Enter a student ID below.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID (e.g., 2023-6015)"
            className="w-full sm:w-auto flex-1 border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Go
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-8">
          MedyoCare &copy; 2025 – Developed with Next.js & MongoDB
        </p>
      </main>
    </div>
  );
}
