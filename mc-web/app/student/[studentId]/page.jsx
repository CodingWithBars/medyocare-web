export const dynamic = "force-dynamic"; // ensure runtime rendering

import PatientInfoCard from "@/components/PatientInfoCard";
import DocumentsList from "@/components/DocumentsList";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/ReportsList";
import clientPromise from "@/lib/mongodb";

export default async function StudentPage({ params }) {
  const studentId = params.studentId;

  const client = await clientPromise;
  const db = client.db("medcare_db");

  const patient = await db.collection("patients").findOne({ patient_id: studentId });

  if (!patient) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Student Not Found</h1>
        <p className="text-gray-600 mt-2">No records for ID: {studentId}</p>
      </div>
    );
  }

  // const documents = await db.collection("patient_documents").find({ patient_id: patient.patient_id }).toArray();
  const visits = await db.collection("clinic_visits").find({ patient_id: patient.patient_id }).sort({ visit_date: -1 }).toArray();
  const reports = await db.collection("reports").find({ patient_id: patient.patient_id }).sort({ created_at: -1 }).toArray();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />
      {/* <DocumentsList documents={documents} /> */}
      <ClinicVisitsList visits={visits} />
      <ReportsList reports={reports} />
    </div>
  );
}
