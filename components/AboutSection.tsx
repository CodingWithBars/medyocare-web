"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="home-about" className="section py-16 bg-white text-blue-900 scroll-mt-[90px]">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left Image */}
          <div className="w-full lg:w-1/2 relative">
            <Image
              src="/images/facilities-1.png"
              alt="Modern Healthcare Facility"
              width={600}
              height={500}
              className="rounded-3xl shadow-lg mb-6"
            />
            <div className="absolute -bottom-6 left-6 bg-teal-600 text-white rounded-lg px-4 py-2 text-center">
              <span className="block text-2xl font-bold">25+</span>
              <span className="block text-sm">Years of Excellence</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Committed to Exceptional Patient Care
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat magna eu accumsan mattis. Duis non augue in tortor facilisis tincidunt ac sit amet sapien. Suspendisse id risus non nisi sodales condimentum.
            </p>

            {/* Feature Items */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex gap-4 items-start">
                <div className="text-teal-600 text-3xl mt-1">❤️</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Compassionate Care</h4>
                  <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-teal-600 text-3xl mt-1">⭐</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Medical Excellence</h4>
                  <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Learn More About Us
              </Link>
              <Link href="/team" className="border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-lg transition">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>

        {/* Certifications Row */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold mb-6">Our Accreditations</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image src="/images/clients-1.png" alt="Certification" width={120} height={60} className="object-contain"/>
            <Image src="/images/clients-2.png" alt="Certification" width={120} height={60} className="object-contain"/>
            <Image src="/images/clients-3.png" alt="Certification" width={120} height={60} className="object-contain"/>
            <Image src="/images/clients-4.png" alt="Certification" width={120} height={60} className="object-contain"/>
          </div>
        </div>

      </div>
    </section>
  );
}
