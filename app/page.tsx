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
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-gray-900 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 p-8 text-center bg-teal-50 dark:bg-gray-800">
        <h1 className="text-5xl font-bold text-teal-700 dark:text-teal-400 mb-4">
          MedyoCare for DorSu Banay-Banay Campus Clinic
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-8">
          Your one-stop portal for student medical records, announcements, and campus health updates.  
          Enter a student ID below to view the student's profile securely.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID (e.g., 2023-6015)"
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Go
          </button>
        </form>
      </section>

      {/* Announcements Section */}
      <section className="p-8 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-6">
          MedyoCare Bulletin Board
        </h2>

        {/* Main Announcement Jumbotron */}
        <div className="flex flex-col md:flex-row bg-teal-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6 shadow-lg">
          <img
            src="/images/main-announcement.jpg"
            alt="Main Announcement"
            className="w-full md:w-1/3 h-48 object-cover"
          />
          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">Free Health Check-Up for 3rd-Year Students</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">Dec 10, 2025 – Campus Clinic</p>
            <p className="text-gray-600 dark:text-gray-300">
              All 3rd-year students are invited for a free health check-up. Ensure your records are up-to-date and bring your student ID.
            </p>
          </div>
        </div>

        {/* Other Announcements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded shadow">
            <h4 className="font-semibold mb-1">Clinic Hours Update</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Mondays to Fridays, 8:00 AM - 5:00 PM</p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded shadow">
            <h4 className="font-semibold mb-1">Vaccination Schedule</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Mandatory vaccinations updated for all students</p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded shadow">
            <h4 className="font-semibold mb-1">Dental Camp</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Dec 15, 2025 – Clinic Room 101</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="p-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-6">
          Upcoming MedyoCare Events & Activities
        </h2>

        {/* Main Event Jumbotron */}
        <div className="flex flex-col md:flex-row bg-teal-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6 shadow-lg">
          <img
            src="/images/main-event.jpg"
            alt="Main Event"
            className="w-full md:w-1/3 h-48 object-cover"
          />
          <div className="p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2">Blood Donation Drive</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">Dec 12, 2025 – Campus Gym</p>
            <p className="text-gray-600 dark:text-gray-300">
              Join us for a campus-wide blood donation drive. Save lives and contribute to the community.
            </p>
          </div>
        </div>

        {/* Other Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h4 className="font-semibold mb-1">Dental Check-Up</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Dec 15, 2025 – Clinic Room 101</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h4 className="font-semibold mb-1">Mental Health Seminar</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Dec 20, 2025 – Auditorium</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <h4 className="font-semibold mb-1">Immunization Camp</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Jan 5, 2026 – Campus Clinic</p>
          </div>
        </div>
      </section>

      {/* About the Clinic */}
      <section className="p-8 bg-white dark:bg-gray-800 text-center">
        <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-400 mb-4">
          About MedyoCare – DorSu Campus Clinic
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          MedyoCare at DorSu Banay-Banay Campus provides comprehensive healthcare services to students including routine check-ups, immunizations, emergency care, and health education. Our mission is to ensure the well-being of every student on campus.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
        MedyoCare – DorSu Banay-Banay Campus Clinic &copy; 2025 – Developed with Next.js & MongoDB
      </footer>
    </div>
  );
}
