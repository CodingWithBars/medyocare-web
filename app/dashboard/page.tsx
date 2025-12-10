"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import PatientAppointmentsList from "@/components/PatientAppointmentsList";
import PatientDashboardCard from "@/components/PatientInfoCardDashboard";
import MedicationsList from "@/components/MedicationsList"; // import medications component

export default function DashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [visits, setVisits] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]); // new state for medications
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboard = async () => {
    const sessionStr = localStorage.getItem("session");
    if (!sessionStr) return router.replace("/login");

    const session = JSON.parse(sessionStr);
    const studentId = session.studentId || session.student_id;
    if (!studentId) return router.replace("/login");

    try {
      // Fetch main dashboard data
      const res = await fetch(`/api/dashboard?studentId=${encodeURIComponent(studentId)}`);
      const data = await res.json();
      if (!res.ok || !data.success) return router.replace("/login");

      setPatient(data.patient);

      // Map raw visits to ClinicVisit type
      const formattedVisits = (data.visits || []).map((v: any) => ({
        _id: v._id?.toString(),
        id: v.id || v._id?.toString(),
        student_name: v.student_name,
        student_id: v.student_id,
        visit_time: v.visit_time,
        status: v.status || "Pending",
        reason: v.reason,
        recommendation: v.recommendation,
        doctor_name: v.doctor_name,
        notes: v.notes,
        created_at: v.created_at,
      }));
      setVisits(formattedVisits);

      // Map medications to Medication type
      const formattedMeds = (await fetch(`/api/medications?studentId=${encodeURIComponent(studentId)}`)
        .then((r) => r.json())
        .then((m) => m.medications || [])).map((med: any) => ({
        id: med._id?.$oid || med.id || "",
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        schedule: med.schedule,
        notes: med.notes,
        created_at: med.created_at,
      }));
      setMedications(formattedMeds);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, [router]);

  if (loading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (!patient)
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>
          Please <a href="/login" className="text-blue-600 underline">login</a>
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-blue-50 min-h-screen space-y-6">
      {/* Patient Info + Upload Buttons */}
      <PatientDashboardCard patient={patient} />

      {/* Clinic Visits */}
      {visits.length > 0 ? (
        <ClinicVisitsList visits={visits} />
      ) : (
        <p className="text-gray-500 text-center italic">No clinic visits</p>
      )}

      {/* Medications */}
      {medications.length > 0 ? (
        <MedicationsList medications={medications} />
      ) : (
        <p className="text-gray-500 text-center italic">No medications</p>
      )}
    </div>
  );
}
