// /app/api/dashboard/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ success: false, message: "Student ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("medcare_db");

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
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    const patient = {
      firstname: rawPatient.firstname || "",
      lastname: rawPatient.lastname || "",
      email: rawPatient.email || "",
      emergency_contact_name: rawPatient.emergency_contact_name || "",
      emergency_contact_phone: rawPatient.emergency_contact_phone || "",
      blood_type: rawPatient.blood_type || "",
      gender: rawPatient.gender || "",
      allergies: rawPatient.allergies || "",
      updated_at: rawPatient.updated_at instanceof Date ? rawPatient.updated_at.toISOString() : null,
      date_of_birth: rawPatient.date_of_birth instanceof Date ? rawPatient.date_of_birth.toISOString() : null,
      profileImageUrl: rawPatient.profile_image?.buffer
        ? `data:image/png;base64,${Buffer.from(rawPatient.profile_image.buffer).toString("base64")}`
        : null,
      qr_codeUrl: rawPatient.qr_code?.buffer
        ? `data:image/png;base64,${Buffer.from(rawPatient.qr_code.buffer).toString("base64")}`
        : null,
    };

    const [visits, reports] = await Promise.all([
      db.collection("clinic_visits").find({ studentRef: studentId }).sort({ visitDate: -1 }).toArray(),
      db.collection("reports").find({ studentRef: studentId }).sort({ createdAt: -1 }).toArray(),
    ]);

    return NextResponse.json({ success: true, patient, visits, reports });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
