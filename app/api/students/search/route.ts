import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // IMPORTANT

export async function GET(req: NextRequest) {
  const studentId = req.nextUrl.searchParams.get("studentId")?.trim();
  if (!studentId) {
    return NextResponse.json(
      { success: false, message: "Student ID is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("medcare_db");

    const student = await db.collection("patients").findOne({
      student_id: studentId,
    });

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    const visits = await db
      .collection("clinic_visits")
      .find({ student_id: studentId })
      .sort({ visit_date: -1 })
      .toArray();

    const reports = await db
      .collection("reports")
      .find({ student_id: studentId })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      student,
      visits,
      reports,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
