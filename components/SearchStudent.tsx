"use client";

import { useState } from "react";
import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/ReportsList";

export default function SearchStudent() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState<any>(null);
  const [visits, setVisits] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setLoading(true);
    setError("");
    setStudentData(null);
    setVisits([]);
    setReports([]);

    try {
      const res = await fetch(`/api/students/search?studentId=${studentId.trim()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Student not found");
        setLoading(false);
        return;
      }

      setStudentData(data.student);
      setVisits(data.visits);
      setReports(data.reports);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Placeholder student data (to show initially or if no search yet)
  const placeholderStudent = {
    firstname: "First",
    lastname: "Last",
    email: "example@***.com",
    emergency_contact_name: "G*** T**",
    emergency_contact_phone: "09*********",
    blood_type: "",
    gender: "",
    allergies: "",
    profile_image: "",
  };

  return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
    <div className="max-w-7xl mx-auto">
      
      {/* Title & Summary */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm">
          Student Health Records Lookup
        </h1>
        <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
          Search for a student to view their clinic visits, medical reports, emergency contacts and health profile.
        </p>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Search Student</h2>
          <p className="text-gray-600 text-sm mb-4">
            To retrieve medical records, enter the student's official ID number assigned by the campus.
          </p>

          <form onSubmit={handleSearch} className="space-y-5">
            <div>
              <label className="font-medium text-sm text-gray-800">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g., 2023-6015"
                className="border p-3 mt-1 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 w-full text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search Student Record"}
            </button>
          </form>

          {error && (
            <p className="text-red-600 mt-4 text-sm bg-red-100 p-2 rounded-lg">
              ⚠ {error}
            </p>
          )}

          {/* Guidelines */}
          <div className="border-t border-gray-200 mt-6 pt-4 text-sm text-gray-600 space-y-2">
            <p className="font-semibold text-blue-900">Important Reminders</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Student ID must match official record.</li>
              <li>Data access is limited to authorized personnel.</li>
              <li>Ensure confidentiality when viewing records.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* STUDENT CARD SECTION */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Student Information
            </h2>

            {!studentData && (
              <p className="text-gray-500 text-sm italic">
                No student selected yet. Please search a student ID.
              </p>
            )}

            <div className="mt-4">
              <PatientInfoCard patient={studentData || placeholderStudent} />
            </div>

            {studentData && (
              <div className="flex gap-3 pt-4 justify-end">
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                  Print Profile
                </button>

                <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700">
                  Download Report
                </button>
              </div>
            )}
          </div>

          {/* VISITS & REPORTS */}
          {studentData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Clinic Visits */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-5">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  🩺 Clinic Visits
                </h3>

                {visits.length > 0 ? (
                  <ClinicVisitsList visits={visits} />
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No clinic visits recorded for this student.
                  </p>
                )}
              </div>

              {/* Reports */}
              <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-5">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  📄 Medical Reports
                </h3>

                {reports.length > 0 ? (
                  <ReportsList reports={reports} />
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No medical reports found for this student.
                  </p>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
