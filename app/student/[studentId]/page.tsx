// app/student/[studentId]/page.tsx
import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import ReportsList from "@/components/ReportsList";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudentPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;

  const normalizedId = studentId?.trim();
  if (!normalizedId) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Student ID</h1>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("medcare_db");

  const rawPatient = await db.collection("patients").findOne(
    { student_id: normalizedId },
    {
      projection: {
        profile_image: 1,
        qr_code: 1,
        firstname: 1,
        lastname: 1,
        email: 1,
        emergency_contact_name: 1,
        emergency_contact_phone: 1,
        blood_type: 1,
        gender: 1,
        allergies: 1,
        date_of_birth: 1,
        updated_at: 1,
      },
    }
  );

  if (!rawPatient) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Student Not Found</h1>
        <p className="text-gray-600 mt-2">No records for ID: {normalizedId}</p>
      </div>
    );
  }

  const patient: any = {
    firstname: rawPatient.firstname || "",
    lastname: rawPatient.lastname || "",
    email: rawPatient.email || "",
    emergency_contact_name: rawPatient.emergency_contact_name || "",
    emergency_contact_phone: rawPatient.emergency_contact_phone || "",
    blood_type: rawPatient.blood_type || "",
    gender: rawPatient.gender || "",
    allergies: rawPatient.allergies || "",
    updated_at:
      rawPatient.updated_at instanceof Date
        ? rawPatient.updated_at.toISOString()
        : null,
    date_of_birth:
      rawPatient.date_of_birth instanceof Date
        ? rawPatient.date_of_birth.toISOString()
        : null,
  };

  patient.profileImageUrl =
    rawPatient.profile_image?.buffer
      ? `data:image/png;base64,${Buffer.from(
          rawPatient.profile_image.buffer
        ).toString("base64")}`
      : null;

  patient.qr_code =
    rawPatient.qr_code?.buffer
      ? `data:image/png;base64,${Buffer.from(
          rawPatient.qr_code.buffer
        ).toString("base64")}`
      : null;

  const [visits, reports] = await Promise.all([
    db
      .collection("clinic_visits")
      .find({ studentRef: normalizedId })
      .sort({ visitDate: -1 })
      .toArray(),

    db
      .collection("reports")
      .find({ studentRef: normalizedId })
      .sort({ createdAt: -1 })
      .toArray(),
  ]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />

      {visits?.length > 0 ? (
        <ClinicVisitsList visits={visits} />
      ) : (
        <p className="text-gray-500 text-center italic">No clinic visit history</p>
      )}

      {reports?.length > 0 ? (
        <ReportsList reports={reports} />
      ) : (
        <p className="text-gray-500 text-center italic">No reports available</p>
      )}
    </div>
  );
}
