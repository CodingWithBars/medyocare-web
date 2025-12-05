import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { patientName, contactName, contactPhone } = await req.json();

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS
    await client.messages.create({
      body: `Emergency Alert: ${patientName} needs assistance. Contact has been notified.`,
      from: process.env.TWILIO_PHONE,
      to: contactPhone, // Must be VERIFIED in trial mode
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("TWILIO ERROR:", error);

return NextResponse.json(
  { error: error.message, details: error },
  { status: 500 }
);

  }
}
