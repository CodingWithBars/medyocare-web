"use client";

import { CalendarDays, User, FileText, Stethoscope } from "lucide-react";

interface ClinicVisit {
  _id?: string;
  id: string;
  student_name?: string;
  student_id?: string;
  visit_time?: string; // From JavaFX record
  status: string;
  reason?: string;
  recommendation?: string;
  doctor_name?: string; // optional
  notes?: string; // optional
  created_at?: string;
}

interface ClinicVisitsListProps {
  visits: ClinicVisit[];
}

export default function ClinicVisitsList({ visits }: ClinicVisitsListProps) {
  const formatDate = (value?: string) => {
    if (!value) return "Unknown date";

    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return value;

    return parsed.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl max-w-5xl mx-auto p-8">
      <h2 className="text-xl font-semibold mb-4">Clinic Visits</h2>

      {visits.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {visits.map((v: ClinicVisit) => (
            <div
              key={v.id}
              className="flex-shrink-0 w-full sm:w-[48%] p-4 border rounded-xl bg-blue-50 hover:bg-blue-100 transition cursor-pointer shadow-sm"
            >
              {/* Top: Date + Status */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <CalendarDays className="w-5 h-5" />
                  <span>{formatDate(v.visit_time || v.created_at)}</span>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    v.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : v.status === "Pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {v.status}
                </span>
              </div>

              {/* Reason */}
              {v.reason && (
                <div className="flex items-start gap-2 mb-2 text-gray-700">
                  <FileText className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="font-semibold">Reason</p>
                    <p>{v.reason}</p>
                  </div>
                </div>
              )}

              {/* Recommendation */}
              {v.recommendation && (
                <div className="flex items-start gap-2 mb-2 text-gray-700">
                  <Stethoscope className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="font-semibold">Recommendation</p>
                    <p>{v.recommendation}</p>
                  </div>
                </div>
              )}

              {/* Optional Doctor Name */}
              {v.doctor_name && (
                <div className="flex items-start gap-2 mb-2 text-gray-700">
                  <User className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="font-semibold">Doctor</p>
                    <p>{v.doctor_name}</p>
                  </div>
                </div>
              )}

              {/* Optional Notes */}
              {v.notes && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FileText className="w-5 h-5 mt-1 text-blue-600" />
                  <div>
                    <p className="font-semibold">Notes</p>
                    <p>{v.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No clinic visits found.</p>
      )}
    </div>
  );
}
