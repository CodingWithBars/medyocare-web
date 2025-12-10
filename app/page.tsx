"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/PatientAppointmentsList";
import SearchStudent from "@/components/SearchStudent";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState<any>(null);
  const [visits, setVisits] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setLoading(true);
    setError("");
    setStudentData(null);
    setVisits([]);
    setReports([]);

    try {
      const res = await fetch(`/api/students/${encodeURIComponent(studentId.trim())}`);
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Student not found.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setStudentData(data.patient);
      setVisits(data.visits);
      setReports(data.reports);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching student data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <Hero />

      <SearchStudent />

      {/* Footer */}
      <Footer />
    </div>
  );
}
