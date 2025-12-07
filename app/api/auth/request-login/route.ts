import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email: string; studentId: string };
    const email = body.email?.toLowerCase().trim();
    const studentId = body.studentId?.trim();

    if (!email || !studentId) {
      return NextResponse.json(
        { ok: false, message: "Email and student ID are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("medcare_db");

    // Check student exists
    const student = await db.collection("patients").findOne({ email, student_id: studentId });
    if (!student) {
      return NextResponse.json(
        { ok: false, message: "Student not found." },
        { status: 404 }
      );
    }

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // Save token to DB (expires in 5 minutes)
    await db.collection("login_tokens").insertOne({
      email,
      code,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Send email
    await sendEmail(email, "Your MedyoCare Verification Code", `<h2>Your login code is</h2><h1>${code}</h1>`);

    // ✅ Return JSON only
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("request-login API error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
