export const dynamic = "force-dynamic";
export const revalidate = 0;

import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/ReportsList";
import clientPromise from "@/lib/mongodb";

export default async function StudentPage({ params }) {
  const studentId = params.studentId;

  const client = await clientPromise;
  const db = client.db("medyocare_db");

  // FIX: use student_id instead of patient_id
  const patient = await db.collection("patients").findOne({ student_id: studentId });

  if (!patient) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Student Not Found</h1>
        <p className="text-gray-600 mt-2">No records for ID: {studentId}</p>
      </div>
    );
  }

  // FIX: also query visits using student_id
  const visits = await db.collection("clinic_visits")
    .find({ student_id: studentId })
    .sort({ visit_date: -1 })
    .toArray();

  // FIX: query reports using student_id
  const reports = await db.collection("reports")
    .find({ student_id: studentId })
    .sort({ created_at: -1 })
    .toArray();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />
      <ClinicVisitsList visits={visits} />
      <ReportsList reports={reports} />
    </div>
  );
}
