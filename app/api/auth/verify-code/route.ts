import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    const cleanEmail = email?.toLowerCase().trim();
    const cleanCode = code?.trim();

    if (!cleanEmail || !cleanCode) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("medcare_db");

    // Look up login token
    const tokenDoc = await db.collection("login_tokens").findOne({
      email: cleanEmail,
      code: cleanCode,
    });

    if (!tokenDoc) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code." },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date() > new Date(tokenDoc.expiresAt)) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired." },
        { status: 400 }
      );
    }

    // Fetch FULL patient data
    const patient = await db.collection("patients").findOne({ email: cleanEmail });

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found." },
        { status: 404 }
      );
    }

    // Delete the used token
    await db.collection("login_tokens").deleteOne({ _id: tokenDoc._id });

    // Convert ObjectId → string
    const user = {
      ...patient,
      _id: patient._id.toString(),
    };

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("verify-code API error:", err);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
