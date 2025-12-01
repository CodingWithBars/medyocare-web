import { FaBirthdayCake, FaVenusMars, FaTint, FaExclamationTriangle, FaPhoneAlt, FaUserMd } from "react-icons/fa";

export default function PatientInfoCard({ patient }) {
  if (!patient) return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center md:col-span-1">
        {patient.profile_image ? (
          <img
            src={patient.profile_image}
            alt={`${patient.firstname} ${patient.lastname}`}
            className="w-32 h-32 rounded-full object-cover border-2 border-teal-200 shadow-sm"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600">
            {patient.firstname?.[0]}{patient.lastname?.[0]}
          </div>
        )}
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{patient.firstname} {patient.lastname}</h2>
        <p className="text-gray-700 mt-1">{patient.student_id}</p>
        <p className="text-gray-700 mt-1">{patient.email}</p>
        <p className="text-gray-700 mt-1 flex items-center gap-1"><FaPhoneAlt className="text-teal-500"/> {patient.phone}</p>
      </div>

      {/* Basic Info */}
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        
        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaVenusMars className="text-teal-500"/>
          <span className="text-gray-900"><strong>Gender:</strong> {patient.gender || "N/A"}</span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaBirthdayCake className="text-teal-400"/>
          <span className="text-gray-900"><strong>DOB:</strong> {patient.date_of_birth || "N/A"}</span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaTint className="text-red-400"/>
          <span className="text-gray-900"><strong>Blood Type:</strong> {patient.blood_type || "N/A"}</span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500"/>
          <span className="text-gray-900"><strong>Allergies:</strong> {patient.allergies || "N/A"}</span>
        </div>

        <div className="col-span-2 bg-teal-50 p-4 rounded-xl shadow-sm flex items-start gap-2">
          <FaUserMd className="text-teal-600 mt-1"/>
          <span className="text-gray-900"><strong>Medical History:</strong> {patient.medical_history || "N/A"}</span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaUserMd className="text-teal-500"/>
          <span className="text-gray-900"><strong>Emergency Contact:</strong> {patient.emergency_contact_name || "N/A"}</span>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2">
          <FaPhoneAlt className="text-teal-500"/>
          <span className="text-gray-900"><strong>Emergency Phone:</strong> {patient.emergency_contact_phone || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
