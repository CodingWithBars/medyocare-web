"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (err) {
        console.error("Invalid session data");
        localStorage.removeItem("session");
      }
    }
  }, []);

  if (!user) return null;

  // Normalize paths for frontend (remove windows drive letters, etc.)
  const fixPath = (path: string) => {
    if (!path) return "";
    return path.replace(/^[A-Z]:/, "").replace(/\\/g, "/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-blue-50 p-6">
        

        {/* ==============================
              HEADER + PROFILE
        =============================== */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 max-w-4xl mx-auto flex gap-6">

          {/* Profile Photo */}
          <img
            src={`/${fixPath(user.profile_image)}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
          />

          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              {user.firstname} {user.lastname}
            </h1>

            <p className="text-lg text-gray-700">Student ID: {user.student_id}</p>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-gray-700">Phone: {user.phone}</p>
          </div>
        </div>



        {/* ==============================
              PERSONAL INFORMATION
        =============================== */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Personal Information</h2>

          <div className="grid grid-cols-2 gap-4 text-gray-800">
            <p><b>Gender:</b> {user.gender}</p>
            <p><b>Date of Birth:</b> {user.date_of_birth}</p>
            <p><b>Address:</b> {user.address}</p>
            <p><b>Blood Type:</b> {user.blood_type}</p>
          </div>
        </div>



        {/* ==============================
              MEDICAL INFORMATION
        =============================== */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Medical Information</h2>

          <p className="mb-2"><b>Allergies:</b> {user.allergies}</p>
          <p><b>Medical History:</b> {user.medical_history}</p>
        </div>



        {/* ==============================
              EMERGENCY CONTACT
        =============================== */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Emergency Contact</h2>

          <p><b>Name:</b> {user.emergency_contact_name}</p>
          <p><b>Phone:</b> {user.emergency_contact_phone}</p>
        </div>



        {/* ==============================
              QR CODE
        =============================== */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Your QR Code</h2>

          <img
            src={`/${fixPath(user.qr_code_path)}`}
            alt="QR Code"
            className="w-48 h-48 border rounded-lg"
          />
        </div>



        {/* ==============================
              MEDICAL DOCUMENTS
        =============================== */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Medical Documents</h2>

          {user.documents?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {user.documents.map((doc: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 shadow">
                  <p className="font-semibold capitalize">{doc.type}</p>
                  <p className="text-sm text-gray-600">{doc.upload_date}</p>

                  <img
                    src={`/${fixPath(doc.file_path)}`}
                    alt={doc.type}
                    className="mt-3 w-full h-40 object-contain border rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No documents available.</p>
          )}
        </div>

      </div>
    </ProtectedRoute>
  );
}
