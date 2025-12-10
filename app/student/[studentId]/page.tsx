// app/student/[studentId]/page.tsx
import PatientInfoCard from "@/components/PatientInfoCard";
import ClinicVisitsList from "@/components/ClinicVisitsList";
import MedicationsList from "@/components/MedicationsList"; // import medications
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ClinicVisit {
  _id?: string;
  id: string;
  student_name?: string;
  student_id?: string;
  visit_time?: string;
  status: string;
  reason?: string;
  recommendation?: string;
  doctor_name?: string;
  notes?: string;
  created_at?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule: string;
  notes?: string;
  created_at?: string;
}

export default async function StudentPage({
  params,
}: {
  params: { studentId: string }; // fix: not a Promise
}) {
  const studentId = params.studentId?.trim();
  if (!studentId) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Student ID</h1>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("medcare_db");

  // Fetch patient
  const rawPatient = await db.collection("patients").findOne(
    { student_id: studentId },
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
        <p className="text-gray-600 mt-2">No records for ID: {studentId}</p>
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
    profileImageUrl: rawPatient.profile_image?.buffer
      ? `data:image/png;base64,${Buffer.from(rawPatient.profile_image.buffer).toString(
          "base64"
        )}`
      : null,
    qr_code: rawPatient.qr_code?.buffer
      ? `data:image/png;base64,${Buffer.from(rawPatient.qr_code.buffer).toString(
          "base64"
        )}`
      : null,
  };

  // Fetch visits, medications
  const [rawVisits, rawMedications] = await Promise.all([
    db
      .collection("clinic_visits")
      .find({ studentRef: studentId })
      .sort({ visitDate: -1 })
      .toArray(),
    db
      .collection("medications")
      .find({ patient_id: studentId })
      .sort({ created_at: -1 })
      .toArray(),
  ]);

  // Map visits to ClinicVisit[]
  const visits: ClinicVisit[] = rawVisits.map((v: any) => ({
    _id: v._id?.toString(),
    id: v._id?.toString(),
    student_name: v.student_name,
    student_id: v.student_id,
    visit_time: v.visitDate?.toISOString(),
    status: v.status || "Pending",
    reason: v.reason,
    recommendation: v.recommendation,
    doctor_name: v.doctor_name,
    notes: v.notes,
    created_at: v.created_at?.toISOString(),
  }));

  // Map medications to Medication[]
  const medications: Medication[] = rawMedications.map((m: any) => ({
    id: m._id?.toString(),
    name: m.name,
    dosage: m.dosage,
    frequency: m.frequency,
    schedule: m.schedule,
    notes: m.notes,
    created_at: m.created_at?.toISOString(),
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />

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
