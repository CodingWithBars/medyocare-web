"use client";

import {
  FaBirthdayCake,
  FaVenusMars,
  FaTint,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaUserMd,
} from "react-icons/fa";

export default function PatientInfoCard({ patient }) {
  if (!patient) return null;

  const handleNotifyEmergencyContact = () => {
    alert(`Emergency contact for ${patient.firstname} has been notified!`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        {patient.profile_image ? (
          <img
            src={patient.profile_image}
            alt={`${patient.firstname} ${patient.lastname}`}
            className="w-32 h-32 rounded-full object-cover border-2 border-teal-200 shadow-sm"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600">
            {patient.firstname?.[0]}
            {patient.lastname?.[0]}
          </div>
        )}

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          {patient.firstname} {patient.lastname}
        </h2>

        <p className="text-gray-700 mt-1 text-base">{patient.student_id}</p>
        <p className="text-gray-700 mt-1 text-base">{patient.email}</p>

        {/* Clickable Phone */}
        <p className="text-gray-700 mt-2 flex items-center gap-2 text-base">
          <FaPhoneAlt className="text-teal-500" />
          <a href={`tel:${patient.phone}`} className="text-teal-600 hover:underline break-all">
            {patient.phone}
          </a>
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaVenusMars className="text-teal-500 text-xl" />
          <span className="text-gray-900">
            <strong>Gender:</strong> {patient.gender || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaBirthdayCake className="text-teal-400 text-xl" />
          <span className="text-gray-900">
            <strong>DOB:</strong> {patient.date_of_birth || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaTint className="text-red-400 text-xl" />
          <span className="text-gray-900">
            <strong>Blood Type:</strong> {patient.blood_type || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 text-xl" />
          <span className="text-gray-900">
            <strong>Allergies:</strong> {patient.allergies || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-start gap-3 sm:col-span-2">
          <FaUserMd className="text-teal-600 text-xl mt-1" />
          <span className="text-gray-900">
            <strong>Medical History:</strong> {patient.medical_history || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
          <FaUserMd className="text-teal-500 text-xl" />
          <span className="text-gray-900">
            <strong>Emergency Contact:</strong> {patient.emergency_contact_name || "N/A"}
          </span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
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
      </div>

      {/* Notify Button */}
      <button
        onClick={handleNotifyEmergencyContact}
        className="w-full bg-teal-600 text-white py-3 rounded-xl shadow hover:bg-teal-700 transition flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <FaPhoneAlt /> Notify Emergency Contact
      </button>
    </div>
  );
}
