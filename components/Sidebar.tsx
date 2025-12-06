"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-blue-100 h-screen p-6 text-blue-900 fixed">
      <h2 className="text-xl font-bold mb-6">My Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/student" className="hover:text-teal-600 transition">Home</Link>
        <Link href="/student/profile" className="hover:text-teal-600 transition">Profile</Link>
        <Link href="/student/appointments" className="hover:text-teal-600 transition">Appointments</Link>
        <Link href="/student/transactions" className="hover:text-teal-600 transition">Transactions</Link>
      </nav>
    </aside>
  );
}
