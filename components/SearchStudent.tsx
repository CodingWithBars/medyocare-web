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
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Search Student Medical Records
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Search Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID (e.g., 2023-6015)"
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>

        {/* Right Column: Student Info */}
        <div>
          <div className="space-y-6">
            <PatientInfoCard patient={studentData || placeholderStudent} />
            
          </div>
        </div>
      </div>
    </div>
  );
}
