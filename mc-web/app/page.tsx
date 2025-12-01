import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center gap-12 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image src="/next.svg" alt="Next.js Logo" width={60} height={20} className="dark:invert" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">MedyoCare Portal</h1>
        </div>

        {/* Intro */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Welcome to the Student Medical Portal
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl">
            Access student medical records, clinic visits, reports, and documents. Use the student ID to navigate directly to a student profile.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/student"
            className="flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-white font-semibold transition hover:bg-teal-700"
          >
            View Students
          </Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Documentation
          </a>
        </div>

        {/* Footer / Info */}
        <p className="text-gray-500 dark:text-gray-400 mt-8 text-sm">
          MedyoCare &copy; 2025 – Developed with Next.js & MongoDB
        </p>
      </main>
    </div>
  );
}
