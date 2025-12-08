"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, User } from "lucide-react";

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
    <header className="bg-blue-50 text-blue-900 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* <Image
            src="/images/logo-trans.png"
            alt="MedyoCare Logo"
            width={50}
            height={50}
            className="w-20 h-20 object-contain"
          /> */}
          MedyoCare
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg">
          <li><Link href="/" className="hover:text-teal-600 transition-colors">Home</Link></li>
          <li><Link href="/services" className="hover:text-teal-600 transition-colors">Services</Link></li>
          <li><Link href="/about" className="hover:text-teal-600 transition-colors">About</Link></li>
          <li><Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link></li>
        </ul>

        {/* User Section */}
        {user ? (
          <div className="hidden md:flex items-center gap-4 relative">
            <button className="flex items-center gap-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.profile_image ? (
                <img
                  src={`/${user.profile_image}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-blue-900" />
              )}
              <span className="font-semibold">{user.name}</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-14 right-0 bg-white border shadow-lg rounded-lg w-48 py-2 z-50">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-blue-50 text-blue-900 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Login
          </Link>
        )}

        {/* Mobile Toggle */}
        <button className="md:hidden text-blue-900" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white py-4 px-6 space-y-4 shadow-inner rounded-b-lg">
          <Link href="/" className="block hover:text-teal-600 transition-colors">Home</Link>
          <Link href="/services" className="block hover:text-teal-600 transition-colors">Services</Link>
          <Link href="/about" className="block hover:text-teal-600 transition-colors">About</Link>
          <Link href="/contact" className="block hover:text-teal-600 transition-colors">Contact</Link>

          {user ? (
            <Fragment>
              <Link href="/dashboard" className="block hover:text-teal-600 transition-colors">Dashboard</Link>

              {user.role === "admin" && (
                <Link href="/admin" className="block hover:text-teal-600 transition-colors">Admin Panel</Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </Fragment>
          ) : (
            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition w-full text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
