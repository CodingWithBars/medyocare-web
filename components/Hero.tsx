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

      {/* Soft White / Light Blue Overlay */}
      <div className="absolute inset-0 bg-[#e8f4f8]/70" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Image Illustration */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/images/school-clinic.png"
              alt="School Clinic Illustration"
              width={900}
              height={900}
              className="rounded-2xl shadow-lg object-cover border border-white/60"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full mb-4 text-sm tracking-wide shadow">
              Trusted Campus Health Services
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-blue-900">
              Caring for the Health of Every Student
            </h1>

            <p className="text-gray-700 mb-8 max-w-xl">
              The DOrSU Banay-Banay Clinic provides professional, accessible, and student-centered medical care, ensuring every student stays healthy and supported throughout their campus life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="/appointment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm"
              >
                Book Appointment
              </a>

              <a
                href="/services"
                className="px-6 py-3 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition shadow-sm"
              >
                Explore Services
              </a>
            </div>

            {/* Info Badges */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-4">
                <div className="text-blue-600 text-3xl">📞</div>
                <div>
                  <span className="text-gray-600 text-sm">Clinic Hotline</span>
                  <p className="font-bold text-lg text-blue-900">+63 912 345 6789</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-blue-600 text-3xl">⏰</div>
                <div>
                  <span className="text-gray-600 text-sm">Operating Hours</span>
                  <p className="font-bold text-lg text-blue-900">Mon–Fri: 8AM–5PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <div className="text-blue-600 text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">General Checkups</h3>
            <p className="text-gray-600">Regular health assessments for students and staff.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <div className="text-blue-600 text-4xl mb-4">💉</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">Vaccinations</h3>
            <p className="text-gray-600">Ensuring immunization compliance and campus safety.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <div className="text-blue-600 text-4xl mb-4">🩹</div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">Emergency Care</h3>
            <p className="text-gray-600">Immediate attention for injuries and urgent medical needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
