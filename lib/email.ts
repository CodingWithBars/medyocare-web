// lib/email.ts
import nodemailer from "nodemailer";

/**
 * Send email via Gmail with App Password
 */
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your 16-char App Password
      },
    });

    const mailOptions = {
      from: `"MedyoCare" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);
    return result;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
