"use client";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule: string;
  notes?: string;
  created_at?: string;
}

interface MedicationsListProps {
  medications: Medication[];
}

export default function MedicationsList({ medications }: MedicationsListProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl max-w-5xl mx-auto p-8">
      <h2 className="text-xl font-semibold mb-4">Medications</h2>

      {medications.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto pb-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex-shrink-0 w-full sm:w-[48%] p-4 border rounded-xl bg-green-50 hover:bg-green-100 transition shadow-sm"
            >
              <p className="font-semibold text-green-700 text-lg">{med.name}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Frequency:</strong> {med.frequency}</p>
              <p><strong>Schedule:</strong> {med.schedule}</p>
              {med.notes && <p className="text-gray-600"><strong>Notes:</strong> {med.notes}</p>}
              {med.created_at && (
                <p className="text-gray-400 text-sm mt-2">
                  Added on: {new Date(med.created_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center italic">No medications found.</p>
      )}
    </div>
  );
}
