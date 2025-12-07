// /app/api/verify-login/route.ts
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ success: false, message: "Email and code required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = code.trim();

    const client = await clientPromise;
    const db = client.db("medcare_db");

    const tokenDoc = await db.collection("login_tokens").findOne({
      email: cleanEmail,
      code: cleanCode,
    });

    if (!tokenDoc) {
      return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 400 });
    }

    if (new Date() > new Date(tokenDoc.expiresAt)) {
      return NextResponse.json({ success: false, message: "Code expired" }, { status: 400 });
    }

    const student = await db.collection("patients").findOne({ email: cleanEmail });

    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    await db.collection("login_tokens").deleteOne({ _id: tokenDoc._id });

    const userSession = {
      _id: student._id.toString(),
      email: student.email,
      studentId: student.student_id,
      firstname: student.firstname,
      lastname: student.lastname,
      profileImageUrl: student.profile_image?.buffer
        ? `data:image/png;base64,${Buffer.from(student.profile_image.buffer).toString("base64")}`
        : null,
      qr_codeUrl: student.qr_code?.buffer
        ? `data:image/png;base64,${Buffer.from(student.qr_code.buffer).toString("base64")}`
        : null,
    };

    return NextResponse.json({ success: true, userSession });
  } catch (err) {
    console.error("verify-login API error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
