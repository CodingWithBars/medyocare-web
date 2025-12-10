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

    // Fetch medications for the student
    const medications = await db
      .collection("medications")
      .find({ patient_id: studentId })
      .sort({ created_at: -1 })
      .toArray();

    // Format data for frontend
    const formattedMedications = medications.map((med) => ({
      id: med._id?.toString() || "",
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      schedule: med.schedule,
      notes: med.notes || "",
      created_at: med.created_at,
    }));

    return NextResponse.json({ success: true, medications: formattedMedications });
  } catch (err) {
    console.error("Medications API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
