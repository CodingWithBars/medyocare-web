// app/student/[studentId]/page.tsx
import PatientInfoCard from "@/components/PatientInfoCard";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface StudentPageProps {
  params: { studentId: string } | Promise<{ studentId: string }>;
}

// Helper: Convert Mongo Binary → base64 string safely
function convertBinaryToBase64(binary: any): string | null {
  if (!binary) return null;
  try {
    // MongoDB Binary has .buffer (ArrayBuffer) and .sub_type
    const uint8 = new Uint8Array(binary.buffer);
    return Buffer.from(uint8).toString("base64");
  } catch (err) {
    console.error("Binary conversion failed:", err);
    return null;
  }
}

export default async function StudentPage(props: StudentPageProps) {
  // unwrap promise params
  const resolvedParams =
    props.params instanceof Promise ? await props.params : props.params;

  const studentId = resolvedParams.studentId?.trim();

  if (!studentId) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Student ID</h1>
      </div>
    );
  }

  // Connect to DB
  const client = await clientPromise;
  const db = client.db("medcare_db");

  // Fetch patient
  const rawPatient = await db.collection("patients").findOne(
    { student_id: studentId },
    {
      projection: {
        firstname: 1,
        lastname: 1,
        email: 1,
        phone: 1,
        address: 1,
        gender: 1,
        date_of_birth: 1,
        blood_type: 1,
        allergies: 1,
        medical_history: 1,
        emergency_contact_name: 1,
        emergency_contact_phone: 1,
        profile_image: 1,
        qr_code: 1,
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

  // Convert fields
  const patient: any = {
    firstname: rawPatient.firstname || "",
    lastname: rawPatient.lastname || "",
    email: rawPatient.email || "",
    phone: rawPatient.phone || "",
    address: rawPatient.address || "",
    emergency_contact_name: rawPatient.emergency_contact_name || "",
    emergency_contact_phone: rawPatient.emergency_contact_phone || "",
    blood_type: rawPatient.blood_type || "",
    gender: rawPatient.gender || "",
    allergies: rawPatient.allergies || "",
    medical_history: rawPatient.medical_history || "",

    // Convert Dates
    updated_at: rawPatient.updated_at
      ? new Date(rawPatient.updated_at).toISOString()
      : null,

    date_of_birth: rawPatient.date_of_birth
      ? new Date(rawPatient.date_of_birth).toISOString()
      : null,

    // Convert MongoDB Binary to base64 strings
    profile_image: convertBinaryToBase64(rawPatient.profile_image),
    qr_code: convertBinaryToBase64(rawPatient.qr_code),
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PatientInfoCard patient={patient} />
    </div>
  );
}
