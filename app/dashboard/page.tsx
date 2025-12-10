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
        setVisits(data.visits);
        setReports(data.reports);

        // Fetch appointments separately
        const apptRes = await fetch(`/api/appointments?studentId=${encodeURIComponent(studentId)}`);
        const apptData = await apptRes.json();
        if (apptData.success && apptData.appointments) {
          setAppointments(apptData.appointments);
        }

        // Fetch medications separately
        const medsRes = await fetch(`/api/medications?studentId=${encodeURIComponent(studentId)}`);
        const medsData = await medsRes.json();
        if (medsData.success && medsData.medications) {
          setMedications(medsData.medications);
        }
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

      {/* Appointments */}
      {appointments.length > 0 ? (
        <PatientAppointmentsList appointments={appointments} />
      ) : (
        <p className="text-gray-500 text-center italic">No appointments</p>
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
