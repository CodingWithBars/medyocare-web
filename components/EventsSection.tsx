"use client";
import Image from "next/image";
import Link from "next/link";

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: "Health Awareness Workshop",
      date: "Dec 12, 2025",
      location: "Main Clinic Hall",
      image: "/images/events/event-1.png",
      description: "Join us for a workshop on preventive healthcare and wellness tips.",
    },
    {
      id: 2,
      title: "Free Cardiology Checkup Camp",
      date: "Jan 5, 2026",
      location: "Downtown Clinic",
      image: "/images/events/event-2.png",
      description: "Get a free heart health screening by our cardiology specialists.",
    },
    {
      id: 3,
      title: "Pediatrics Immunization Drive",
      date: "Feb 18, 2026",
      location: "City Pediatric Center",
      image: "/images/events/event-3.png",
      description: "Free immunization for children under 12 years old.",
    },
  ];

  return (
    <section id="events" className="section py-16 bg-white text-blue-900 scroll-mt-[90px]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Stay updated with our latest health initiatives and community programs</p>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-[#f9fafd] rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
              
              {/* Event Image */}
              <div className="relative w-full h-60">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Event Info */}
              <div className="p-6">
                <span className="text-sm text-teal-600 font-semibold">{event.date} | {event.location}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <Link
                  href="/events"
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
