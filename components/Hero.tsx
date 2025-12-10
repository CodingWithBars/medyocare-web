"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [studentId, setStudentId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    // Navigate to the student page
    router.push(`/student/${encodeURIComponent(studentId.trim())}`);
  };

  return (
    <section
  id="hero"
  className="relative overflow-hidden bg-blue-50 text-gray-800 py-20"
>
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/bg.jpg"
      alt="Medical Background"
      fill
      priority
      className="object-cover opacity-30"
    />
  </div>

  {/* Soft Overlay */}
  <div className="absolute inset-0 bg-[#e8f4f8]/70" />

  <div className="relative container mx-auto px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row items-center gap-12">

      {/* Left Image */}
      <div className="w-full lg:w-1/2">
        <Image
          src="/images/heroimage.jpg"
          alt="School Clinic Illustration"
          width={900}
          height={900}
          className="rounded-2xl shadow-lg object-cover border border-white/60"
        />
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2">
        <span className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full mb-4 text-sm tracking-wide shadow">
          Welcome to MedyoCare
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-blue-900">
          Your Digital Student Health Record and Monitoring System
        </h1>

        <p className="text-gray-700 mb-8 max-w-xl">
          MedyoCare provides secure access to your school health records, medical visit history, prescriptions, and emergency contact notifications. Designed exclusively for students and clinic staff of DOrSU Banaybanay Campus.
        </p>

        {/* Quick Steps */}
        <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg mb-8 text-sm">
          <p className="font-semibold text-blue-900 mb-2">To get started:</p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Enter your Student ID to view your medical record</li>
            <li>Book an appointment for clinic visit</li>
            <li>Receive updates regarding medications and notifications</li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href="/appointment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm"
          >
            Book Appointment
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition shadow-sm"
          >
            Login to Portal
          </a>
        </div>
      </div>
    </div>

    {/* ABOUT SYSTEM SECTION */}
    <div className="bg-white shadow-lg rounded-2xl p-8 mt-20 border-l-4 border-blue-400">
      <h2 className="text-3xl font-bold text-blue-900 mb-4">About MedyoCare</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        MedyoCare is a student health information and monitoring system developed to improve the management of clinic records at Davao Oriental State University – Banaybanay Campus. Traditional paper-based health recording often leads to delayed retrieval, misplaced files, incomplete records, and inaccurate medical histories. These challenges affect the clinic’s ability to provide fast and accurate treatment, especially during emergencies.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        This system modernizes record-keeping by digitizing student medical profiles, immunizations, medications, clinic visits, and guardian information. With a secure and centralized platform, clinic personnel can document and update records efficiently, generate reports instantly, and notify guardians when needed.
      </p>

      <p className="text-gray-700 leading-relaxed font-semibold">
        MedyoCare improves clinic services by promoting accuracy, accessibility, and real-time information.
      </p>
    </div>

    {/* HOW TO USE SECTION */}
    <div className="grid lg:grid-cols-3 gap-10 mt-16">
      <div className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-3">1. Access Your Profile</h3>
        <p className="text-gray-700 text-sm">
          Students log in using their Student ID to view past medical visits, prescriptions, immunizations, and recorded incidents.
        </p>
      </div>

      <div className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-3">2. Clinic Records Management</h3>
        <p className="text-gray-700 text-sm">
          Clinic staff can add records, update medical information, track illnesses, record treatment, and update medicine inventory.
        </p>
      </div>

      <div className="bg-blue-50 p-8 rounded-xl shadow-sm border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-3">3. Notifications & Reports</h3>
        <p className="text-gray-700 text-sm">
          Real-time notifications are sent to guardians for urgent medical cases. Monthly logs and summaries can be printed instantly.
        </p>
      </div>
    </div>
  </div>
</section>

  );
}
