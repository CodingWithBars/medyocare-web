"use client";

import {
  FaExclamationTriangle,
  FaPhoneAlt,
  FaUserMd,
} from "react-icons/fa";
import toast from "react-hot-toast";

// Define Patient type
interface Patient {
  firstname: string;
  lastname: string;
  email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  blood_type?: string;
  gender?: string;
  allergies?: string;
  profile_image?: string;
}

// Helper functions for masking
function maskName(name: string) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts.map(p => p[0] + "*".repeat(Math.max(1, p.length - 1))).join(" ");
}

function maskEmail(email: string) {
  if (!email) return "";
  const [user, domain] = email.split("@");
  const maskedUser = user.slice(0, 3) + "***";
  const [domainName, extension] = domain.split(".");
  const maskedDomain = domainName.slice(0, 3) + "***";
  return `${maskedUser}@${maskedDomain}.${extension}`;
}

interface PatientInfoCardProps {
  patient: Patient;
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  if (!patient) return null;

  const safeName = maskName(`${patient.firstname} ${patient.lastname}`);
  const safeEmail = maskEmail(patient.email);

  const handleNotifyEmergencyContact = async () => {
    const loadingToast = toast.loading("Sending notification...");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: safeName,
          contactName: patient.emergency_contact_name,
          contactPhone: patient.emergency_contact_phone,
        }),
      });

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Emergency contact notified via SMS!");
      } else {
        toast.error("Failed to send SMS notification.");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-teal-50 shadow-lg rounded-2xl max-w-4xl mx-auto p-6 space-y-6">
      {/* Header / Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-2xl font-bold text-teal-600 shadow">
          {patient.firstname?.[0]}{patient.lastname?.[0]}
        </div>

        <h2 className="mt-4 text-2xl font-bold text-teal-700">
          {safeName}
        </h2>

        <p className="text-gray-700 mt-1">{safeEmail}</p>
      </div>

      {/* Emergency / Medical Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaUserMd className="text-teal-500 text-xl" />
          <span className="text-gray-900">
            <strong>Emergency Contact:</strong> {patient.emergency_contact_name || "N/A"}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaPhoneAlt className="text-teal-500 text-xl" />
          <span className="text-gray-900 break-all">
            <strong>Emergency Phone:</strong>{" "}
            <a
              href={`tel:${patient.emergency_contact_phone}`}
              className="text-teal-600 hover:underline"
            >
              {patient.emergency_contact_phone || "N/A"}
            </a>
          </span>
        </div>

        {patient.blood_type && (
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaUserMd className="text-teal-500 text-xl" />
            <span className="text-gray-900">
              <strong>Blood Type:</strong> {patient.blood_type}
            </span>
          </div>
        )}

        {patient.gender && (
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaUserMd className="text-teal-500 text-xl" />
            <span className="text-gray-900">
              <strong>Gender:</strong> {patient.gender}
            </span>
          </div>
        )}

        {patient.allergies && (
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3 sm:col-span-2">
            <FaExclamationTriangle className="text-yellow-500 text-xl" />
            <span className="text-gray-900">
              <strong>Allergies / Alerts:</strong> {patient.allergies}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={handleNotifyEmergencyContact}
          className="flex-1 bg-teal-600 text-white py-3 rounded-xl shadow hover:bg-teal-700 transition flex items-center justify-center gap-2 font-semibold"
        >
          <FaExclamationTriangle /> Notify Emergency Contact
        </button>

        <a
          href={`tel:${patient.emergency_contact_phone}`}
          className="flex-1 block bg-white text-teal-700 py-3 rounded-xl shadow hover:bg-teal-100 transition text-center font-semibold"
        >
          <FaPhoneAlt className="inline mr-2" /> Call Emergency Contact
        </a>
      </div>
    </div>
  );
}
