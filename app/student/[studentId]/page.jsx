export const dynamic = "force-dynamic";
export const revalidate = 0;

import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/ReportsList";
import clientPromise from "@/lib/mongodb";

export default async function StudentPage({ params }) {
  const studentId = params?.studentId?.trim();

  if (!studentId) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Student ID</h1>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("medcare_db");

  // Fetch data in parallel for performance
  const [patient, visits, reports] = await Promise.all([
    db.collection("patients").findOne({ student_id: studentId }),

    db
      .collection("clinic_visits")
      .find({ student_id: studentId })
      .sort({ visit_date: -1 })
      .toArray(),

    db
      .collection("reports")
      .find({ student_id: studentId })
      .sort({ created_at: -1 })
      .toArray(),
  ]);

  if (!patient) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Student Not Found</h1>
        <p className="text-gray-600 mt-2">No records for ID: {studentId}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />

      {visits?.length > 0 ? (
        <ClinicVisitsList visits={visits} />
      ) : (
        <p className="text-gray-500 text-center italic">
          No clinic visit history
        </p>
      )}

      {reports?.length > 0 ? (
        <ReportsList reports={reports} />
      ) : (
        <p className="text-gray-500 text-center italic">
          No reports available
        </p>
      )}
    </div>
  );
}
