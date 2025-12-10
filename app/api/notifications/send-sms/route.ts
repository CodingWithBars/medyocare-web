// /app/api/notifications/send-sms/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student_id, message, phone } = body;

    if (!student_id || !message || !phone) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Send SMS via Android phone gateway
    const phoneGatewayUrl = "http://YOUR_PHONE_IP:PORT/send";
    const smsRes = await fetch(phoneGatewayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message }),
    });

    const smsData = await smsRes.json();

    // Log notification to MongoDB
    const client = await clientPromise;
    const db = client.db("medcare_db");

    await db.collection("notifications").insertOne({
      student_id,
      message,
      status: smsData.success ? "sent" : "failed",
      created_at: new Date(),
    });

    return NextResponse.json({ success: smsData.success, data: smsData });
  } catch (err) {
    console.error("Send SMS error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
