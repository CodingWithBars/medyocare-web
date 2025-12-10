"use client";

import { CalendarDays, Clock, FileText } from "lucide-react";

interface Appointment {
  _id?: string;
  patient_id: string;
  name: string; // Reason / Purpose
  dosage?: string;
  frequency?: string;
  schedule?: string;
  notes?: string;
}

interface PatientAppointmentsListProps {
  appointments: Appointment[];
}

export default function PatientAppointmentsList({ appointments }: PatientAppointmentsListProps) {
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
    <div className="bg-white shadow-lg rounded-2xl max-w-5xl mx-auto p-8 space-y-10">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id || appt.patient_id + appt.name}
              className="p-4 border rounded-xl bg-yellow-50 hover:bg-yellow-100 transition cursor-pointer shadow-sm"
            >
              {/* Top: Reason / Name */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-yellow-700 font-medium">
                  <CalendarDays className="w-5 h-5" />
                  <span>{appt.name}</span>
                </div>
              </div>

              {/* Dosage / Frequency */}
              {(appt.dosage || appt.frequency) && (
                <div className="flex items-start gap-2 mb-2 text-gray-700">
                  <Clock className="w-5 h-5 mt-1 text-yellow-600" />
                  <div>
                    {appt.dosage && <p><strong>Dosage:</strong> {appt.dosage}</p>}
                    {appt.frequency && <p><strong>Frequency:</strong> {appt.frequency}</p>}
                  </div>
                </div>
              )}

              {/* Schedule */}
              {appt.schedule && (
                <div className="flex items-start gap-2 mb-2 text-gray-700">
                  <Clock className="w-5 h-5 mt-1 text-yellow-600" />
                  <div>
                    <p><strong>Schedule:</strong> {appt.schedule}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {appt.notes && (
                <div className="flex items-start gap-2 text-gray-700">
                  <FileText className="w-5 h-5 mt-1 text-yellow-600" />
                  <div>
                    <p><strong>Notes:</strong> {appt.notes}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No appointments found.</p>
      )}
    </div>
  );
}
