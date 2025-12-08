"use client";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-blue-900">
      <div className="container mx-auto px-6 lg:px-16 py-16">
        
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last Updated: January 2025
        </p>

        <p className="mb-6">
          Welcome to <strong>MedyoCare</strong>. This Privacy Policy outlines how we collect, use, and protect the personal data of students, administrators, and medical staff when using the platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>

        <ul className="list-disc pl-8 space-y-2">
          <li>Basic user information (name, email, student ID).</li>
          <li>Medical visit logs and consultation records.</li>
          <li>Emergency contact information.</li>
          <li>Uploaded medical documents.</li>
          <li>QR-generated access history.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">The collected information is used to:</p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Help clinic staff properly manage patient cases</li>
          <li>Generate official medical reports</li>
          <li>Track student health records efficiently</li>
          <li>Improve system performance and safety</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p className="mb-4">
          MedyoCare takes reasonable steps to ensure that all medical records and personal information are secure. Only authorized staff within the institution can access clinic records.
        </p>

        <p className="mb-4">
          Access to student records requires valid authentication and permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Who Can Access Your Records?</h2>

        <ul className="list-disc pl-8 space-y-2">
          <li>Clinic officers</li>
          <li>System administrators</li>
          <li>You (the patient)</li>
        </ul>

        <p className="mt-2">No outsider is granted access without permission.</p>

        <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Storage Duration</h2>
        <p className="mb-4">
          Records remain available for reference for academic and medical purposes unless removal is formally requested.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>

        <ul className="list-disc pl-8 space-y-2">
          <li>You may request correction of inaccurate information.</li>
          <li>You may request access to your medical record.</li>
          <li>You may request removal of data no longer needed.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>

        <p className="mb-6">
          For concerns regarding data confidentiality, record access, or corrections, contact:
        </p>

        <p>
          📧 Email: <strong>medyocare2025@gmail.com</strong>
        </p>
        <p>
          🏫 Campus: <strong>DOrSU Banaybanay Campus</strong>
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
