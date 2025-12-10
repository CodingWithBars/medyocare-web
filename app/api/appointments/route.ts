// /app/api/appointments/route.ts
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

    const appointments = await db
      .collection("appointments")
      .find({ patient_id: studentId })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({ success: true, appointments });
  } catch (err) {
    console.error("Appointments API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
