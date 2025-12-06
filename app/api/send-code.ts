import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  const { email, studentId } = req.body;

  if (!email || !studentId)
    return res.status(400).json({ message: "Missing email or studentId" });

  const client = await clientPromise;
  const db = client.db("medyocare");

  // Check student
  const student = await db.collection("students").findOne({
    email,
    studentId,
  });

  if (!student)
    return res.status(404).json({ message: "Student not found" });

  // Generate 4-digit code
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  // Save login token
  await db.collection("login_tokens").insertOne({
    email,
    code,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // expires in 5 minutes
  });

  // Email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: '"MedyoCare Clinic" <no-reply@medyocare.com>',
    to: email,
    subject: "Your Verification Code",
    text: `Your MedyoCare login code is: ${code}`,
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Your MedyoCare Verification Code</h2>
        <p>Use this code to complete your login:</p>
        <h1 style="font-size: 40px; letter-spacing: 6px;">${code}</h1>
      </div>
    `,
  });

  return res.json({ ok: true });
}
