"use client";
import Link from "next/link";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-white text-blue-900">
      <div className="container mx-auto px-6 lg:px-16 py-16">

        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-10">
          Last Updated: January 2025
        </p>

        <p className="mb-6">
          Welcome to <strong>MedyoCare</strong>. By accessing or using this platform, you agree to comply with the terms provided below.
          These terms govern access to the medical record system for students, administrators, and clinic personnel.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By logging in, submitting information, or accessing medical records,
          you acknowledge and agree to these Terms of Use.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">2. Authorized Use</h2>
        <p className="mb-4">You agree to use MedyoCare only for legitimate medical-related purposes, such as:</p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Viewing your own medical information</li>
          <li>Updating valid contact information</li>
          <li>Accessing health visit records</li>
          <li>Providing legitimate documentation</li>
          <li>Clinic staff use for student evaluation</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">3. Prohibited Actions</h2>

        <ul className="list-disc pl-8 space-y-2">
          <li>False registration or impersonation of another individual</li>
          <li>Unauthorized access to another user’s record</li>
          <li>Sharing login access or credentials</li>
          <li>Uploading falsified documents</li>
          <li>Using the system maliciously to cause harm or misinformation</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">4. Access Rights and Termination</h2>
        <p className="mb-4">
          MedyoCare reserves the right to suspend access if misuse,
          unauthorized login attempts, or fraudulent activity is detected.
          Students lose access when they graduate unless extended by the institution.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">5. Accuracy of Submitted Information</h2>
        <p className="mb-4">
          Users agree that information provided such as symptoms, emergency contacts,
          or uploaded documents must be accurate and truthful.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          MedyoCare is provided as a digital medical record management system.
          The system is not a substitute for professional diagnosis or treatment.
        </p>

        <p className="mb-4">
          Misuse of provided information by the user is not the responsibility of the platform developers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">7. System Availability</h2>
        <p className="mb-4">
          The system may undergo scheduled maintenance or downtime for improvements,
          which may temporarily restrict access.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">8. Modifications</h2>
        <p className="mb-4">
          The Terms of Use may change periodically to adapt to institutional needs or system improvements.
        </p>

        <p className="mb-10">
          Updated versions will be posted on this page.
        </p>

        <hr className="my-10 border-gray-200" />

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
