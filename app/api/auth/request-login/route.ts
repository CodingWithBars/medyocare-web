import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email: string; studentId: string };
    const rawEmail = body.email;
    const rawStudentId = body.studentId;

    // Normalize inputs
    const email = rawEmail?.toLowerCase().trim();
    const studentId = rawStudentId?.trim();

    const client = await clientPromise;
    const db = client.db("medcare_db");

    const student = await db.collection("patients").findOne({
      email,
      student_id: studentId,
    });

    if (!student) {
      return NextResponse.json({ ok: false, message: "Student not found" }, { status: 404 });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    await db.collection("login_tokens").insertOne({
      email,
      code,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
    });

    await sendEmail(email, "Your MedyoCare Verification Code", `<h2>Your login code is</h2><h1>${code}</h1>`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in request-login:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
