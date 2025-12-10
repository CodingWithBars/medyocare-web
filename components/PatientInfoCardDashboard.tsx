"use client";

import {
  FaExclamationTriangle,
  FaPhoneAlt,
  FaUserMd,
  FaFileMedical,
  FaUpload,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface Patient {
  firstname?: string;
  lastname?: string;
  email?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  blood_type?: string;
  gender?: string;
  allergies?: string;
  profileImageUrl?: string | null;
  studentId?: string;
}

interface UploadedFile {
  filename: string;
  metadata: {
    type: string;
    original_filename: string;
    student_id: string;
    upload_date: string;
  };
}

interface PatientDashboardCardProps {
  patient: Patient;
}

export default function PatientDashboardCard({
  patient,
}: PatientDashboardCardProps) {
  if (!patient) return null;

  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const fullName = `${patient.firstname || ""} ${patient.lastname || ""}`.trim();

  // Fetch uploaded files
  const fetchUploadedFiles = async () => {
    if (!patient.studentId) return;
    try {
      const res = await fetch(`/api/files?student_id=${patient.studentId}`);
      const data = await res.json();
      if (data.success && data.files) setUploadedFiles(data.files);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  // File upload handler
  const handleUpload = async (type: string) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,application/pdf";
    fileInput.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      setUploadMessage(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("student_id", patient.studentId || "unknown");
      formData.append("type", type);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setUploadMessage({
            type: "error",
            text: data.error || "Upload failed",
          });
        } else {
          setUploadMessage({
            type: "success",
            text: `${type} uploaded successfully!`,
          });
          fetchUploadedFiles();
        }
      } catch (err) {
        console.error(err);
        setUploadMessage({
          type: "error",
          text: "Something went wrong. Please try again.",
        });
      } finally {
        setUploading(false);
      }
    };
    fileInput.click();
  };

  // Emergency contact
  const handleNotifyEmergencyContact = async () => {
    const loadingToast = toast.loading("Sending notification...");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: fullName,
          contactName: patient.emergency_contact_name,
          contactPhone: patient.emergency_contact_phone,
        }),
      });
      toast.dismiss(loadingToast);
      if (res.ok) toast.success("Emergency contact notified via SMS!");
      else toast.error("Failed to send SMS notification.");
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl max-w-5xl mx-auto p-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {patient.profileImageUrl ? (
            <img
              src={patient.profileImageUrl}
              alt={fullName}
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-3xl font-bold text-teal-700 shadow">
              {patient.firstname?.[0] || "?"}
              {patient.lastname?.[0] || ""}
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold text-teal-700">{fullName}</h2>
            <p className="text-gray-700 text-lg">{patient.email}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[320px]">
          <button
            onClick={handleNotifyEmergencyContact}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
          >
            <FaExclamationTriangle className="text-lg" /> Notify Emergency
            Contact
          </button>
          <a
            href={`tel:${patient.emergency_contact_phone}`}
            className="w-full py-3 px-4 bg-white text-teal-700 rounded-xl shadow hover:bg-teal-100 transition flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
          >
            <FaPhoneAlt className="text-lg" /> Call Emergency Contact
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {patient.emergency_contact_name && (
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaUserMd className="text-teal-600 text-xl" />
            <span className="text-gray-900">
              <strong>Emergency Contact:</strong>{" "}
              {patient.emergency_contact_name}
            </span>
          </div>
        )}
        {patient.emergency_contact_phone && (
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaPhoneAlt className="text-teal-600 text-xl" />
            <span className="text-gray-900 break-all">
              <strong>Emergency Phone:</strong>{" "}
              <a
                href={`tel:${patient.emergency_contact_phone}`}
                className="text-teal-700 hover:underline"
              >
                {patient.emergency_contact_phone}
              </a>
            </span>
          </div>
        )}
        {patient.blood_type && (
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaUserMd className="text-teal-600 text-xl" />
            <span className="text-gray-900">
              <strong>Blood Type:</strong> {patient.blood_type}
            </span>
          </div>
        )}
        {patient.gender && (
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
            <FaUserMd className="text-teal-600 text-xl" />
            <span className="text-gray-900">
              <strong>Gender:</strong> {patient.gender}
            </span>
          </div>
        )}
        {patient.allergies && (
          <div className="bg-yellow-50 p-4 rounded-xl shadow-sm flex items-center gap-3 sm:col-span-2">
            <FaExclamationTriangle className="text-yellow-500 text-xl" />
            <span className="text-gray-900">
              <strong>Allergies / Alerts:</strong> {patient.allergies}
            </span>
          </div>
        )}
      </div>

      {/* Medical Records Upload */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-teal-700 flex items-center gap-2">
          <FaFileMedical /> Medical Records
        </h3>

        {uploadMessage && (
          <p
            className={`text-center ${
              uploadMessage.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {uploadMessage.text}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Medical Certificate",
            "Medical Laboratory Test",
            "X-Ray Result",
          ].map((type) => (
            <button
              key={type}
              onClick={() => handleUpload(type)}
              disabled={uploading}
              className={`bg-white border-2 border-teal-500 text-teal-700 py-3 rounded-xl shadow text-center font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2 ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <FaUpload /> Upload {type}
            </button>
          ))}
        </div>
          {/* Uploaded Files */}
        {/* Uploaded Files */}
        {/* {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-lg text-teal-700 mb-2">
              Uploaded Files
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedFiles.map((file) => {
                const displayName =
                  file.metadata?.original_filename || file.filename;
                const fileType = file.metadata?.type || "";

                // Check if the file is an image
                const isImage =
                  displayName.match(/\.(jpg|jpeg|png|gif)$/i) !== null;

                return isImage ? (
                  <img
                    key={file.filename}
                    src={`/api/files/${file.filename}`}
                    alt={displayName}
                    className="w-full h-32 object-cover rounded-xl border shadow"
                  />
                ) : (
                  <a
                    key={file.filename}
                    href={`/api/files/${file.filename}`}
                    target="_blank"
                    className="block p-4 bg-gray-100 rounded-xl border shadow text-center text-gray-700 font-medium"
                  >
                    {displayName}
                  </a>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
