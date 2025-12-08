"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-blue-900 relative border-t border-blue-100">
      <div className="container mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* About */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-wide">
              MedyoCare
            </Link>

            <div className="mt-4 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4" /> DOrSU Banaybanay Campus
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-4" /> medyocare2025@gmail.com
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4" /> (Available upon request)
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5 text-blue-900">
              <a href="#" className="hover:text-teal-600 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-teal-600 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-teal-600 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-teal-600 transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-teal-600 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-600 transition">About MedyoCare</Link></li>
              <li><Link href="/login" className="hover:text-teal-600 transition">Patient Login</Link></li>
              <li><Link href="/terms" className="hover:text-teal-600 transition">Terms of Use</Link></li>
              <li><Link href="/privacy" className="hover:text-teal-600 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold mb-4">System Features</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-600 transition">Student Medical Records</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Clinic Visit Tracking</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Online Consultation Logs</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Health Report Generator</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">QR-Based Patient Access</Link></li>
            </ul>
          </div>

          {/* Extras */}
          <div>
            <h4 className="font-semibold mb-4">System Access</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-600 transition">Admin Panel</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Clinic Staff Login</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Download Desktop App</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">User Help Guide</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">System Updates</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-blue-100 py-5 text-center text-sm text-blue-900">
        <p>
          © {new Date().getFullYear()} <strong className="px-1">MedyoCare</strong> •  
          A Smart Medical Record System — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
