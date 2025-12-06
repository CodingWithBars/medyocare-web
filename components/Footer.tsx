"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-50 text-blue-900 relative">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* About */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              MedyoCare
            </Link>
            <div className="mt-4 space-y-1 text-sm text-blue-900">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-2"><strong>Phone:</strong> +1 5589 55488 55</p>
              <p><strong>Email:</strong> info@example.com</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-blue-900">
              <a href="#" className="hover:text-teal-600 transition">🐦</a>
              <a href="#" className="hover:text-teal-600 transition">📘</a>
              <a href="#" className="hover:text-teal-600 transition">📸</a>
              <a href="#" className="hover:text-teal-600 transition">🔗</a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-teal-600 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-600 transition">About us</Link></li>
              <li><Link href="/services" className="hover:text-teal-600 transition">Services</Link></li>
              <li><Link href="/terms" className="hover:text-teal-600 transition">Terms of service</Link></li>
              <li><Link href="/privacy" className="hover:text-teal-600 transition">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-600 transition">Web Design</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Web Development</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Product Management</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Marketing</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Graphic Design</Link></li>
            </ul>
          </div>

          {/* Extra Links */}
          <div>
            <h4 className="font-semibold mb-4">Extras</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-teal-600 transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Support</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-teal-600 transition">Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-100 py-6 text-center text-sm text-blue-900">
        <p>
          © <span>Copyright</span> <strong className="px-1">MedyoCare</strong> All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
