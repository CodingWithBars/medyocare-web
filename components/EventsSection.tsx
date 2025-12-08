"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Launching of MedyoCare: Smart Medical Record System",
      date: "Dec 12, 2025",
      time: "9:00 AM — 11:00 AM",
      limitedSlots: false,
      location: "Main Auditorium",
      image: "/images/event-launch.jpg",
      description:
        "Experience MedyoCare — a modern medical platform combining JavaFX Desktop Clinic Management and Next.js Web Patient Access. Learn how doctors can view records in real-time, students can access medical histories securely, and clinics become fully automated.",
    },
    {
      id: 2,
      title: "Mobile Enrollment & Digital Health Card Registration",
      date: "Jan 6, 2026",
      time: "8:00 AM — 3:00 PM",
      limitedSlots: true,
      location: "School Clinic Lobby",
      image: "/images/event-registration.jpg",
      description:
        "On-site registration and digital health card issuance. Students receive their QR-linked Medical ID synced to MedyoCare Patient Portal.",
    },
    {
      id: 3,
      title: "Wellness & Preventive Health Drive",
      date: "Feb 21, 2026",
      time: "10:00 AM — 4:00 PM",
      limitedSlots: false,
      location: "Medical Center Lobby",
      image: "/images/event-blood.jpg",
      description:
        "Free check-ups, consultations, and record creation directly inside the MedyoCare HRMIS Medical System. Designed to assist students, faculty, and staff.",
    },
  ];

  return (
    <section
      id="events"
      className="section py-20 bg-gradient-to-b from-blue-100 to-blue-50 text-blue-900 scroll-mt-[90px]"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            MedyoCare Promotions & Events
          </h2>

          <p className="text-gray-700 max-w-xl mx-auto">
            Discover community programs related to student healthcare, system adoption,
            and digital medical transformation powered by JavaFX & Next.js.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300 border border-blue-100"
            >
              {/* Image */}
              <div className="relative w-full h-64">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
                {event.limitedSlots && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                    Limited Seats
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-6 space-y-3">
                {/* Date */}
                <div className="flex items-center gap-2 text-blue-700 font-medium text-sm">
                  <Calendar className="w-4" /> {event.date} — {event.time}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-blue-900 leading-tight">
                  {event.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
                  <MapPin className="w-4" /> {event.location}
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <Link
                    href="/promo"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition"
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href="/registration"
                    className="border border-blue-600 text-blue-700 px-5 py-2 rounded-lg hover:bg-blue-50 text-sm font-semibold transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
