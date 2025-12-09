"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";

interface UserType {
  name: string;
  email: string;
  role?: "student" | "admin";
  profile_image?: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const loadUser = () => {
    const session = localStorage.getItem("session");
    setUser(session ? JSON.parse(session) : null);
  };

  useEffect(() => {
    loadUser();
    const handleStorage = () => loadUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    loadUser();
    window.location.href = "/login";
  };

  return (
    <header className="bg-blue-50 text-blue-900 sticky top-0 z-50 shadow-md border-b border-blue-100 backdrop-blur-sm">
      <nav className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-wide hover:text-teal-600 transition">
          MedyoCare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
          <li><Link href="/" className="hover:text-teal-600 transition">Home</Link></li>
          <li><Link href="/services" className="hover:text-teal-600 transition">Services</Link></li>
          <li><Link href="/about" className="hover:text-teal-600 transition">About</Link></li>
          <li><Link href="/contact" className="hover:text-teal-600 transition">Contact</Link></li>
        </ul>

        {/* User Section */}
        {user ? (
          <div className="hidden md:flex items-center gap-4 relative">
            <button
              className="flex items-center gap-2 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.profile_image ? (
                <img
                  src={`/${user.profile_image}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-teal-400 object-cover shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm border border-teal-300">
                  <User size={20} />
                </div>
              )}
              <span className="font-semibold">{user.name}</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div
                className="absolute top-14 right-0 bg-white border border-blue-100 shadow-lg rounded-xl w-56 py-2 animate-fadeSlide z-50"
              >
                <p className="px-4 py-2 text-sm text-gray-500 border-b">
                  Signed in as <br /> <strong>{user.email}</strong>
                </p>

                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
                >
                  My Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-red-600 transition flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Login
          </Link>
        )}

        {/* Mobile Toggle */}
        <button className="md:hidden text-blue-900" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white py-5 px-6 space-y-3 shadow-inner border-t border-blue-100 rounded-b-xl">
          <Link href="/" className="block hover:text-teal-600 transition">Home</Link>
          <Link href="/services" className="block hover:text-teal-600 transition">Services</Link>
          <Link href="/about" className="block hover:text-teal-600 transition">About</Link>
          <Link href="/contact" className="block hover:text-teal-600 transition">Contact</Link>

          {user ? (
            <Fragment>
              <Link href="/dashboard" className="block hover:text-teal-600 transition">Dashboard</Link>

              {user.role === "admin" && (
                <Link href="/admin" className="block hover:text-teal-600 transition">
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition w-full"
              >
                <LogOut size={18} /> Logout
              </button>
            </Fragment>
          ) : (
            <Link
              href="/login"
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-5 py-2 rounded-lg transition font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
