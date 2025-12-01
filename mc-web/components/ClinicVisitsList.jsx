export default function ClinicVisitsList({ visits }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">Clinic Visits</h2>
      {visits.length > 0 ? (
        <ul className="space-y-3">
          {visits.map((v) => (
            <li key={v.id} className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">{new Date(v.visit_date).toLocaleDateString()}</p>
              <p>Purpose: {v.purpose}</p>
              <p>Doctor: {v.doctor_name || "N/A"}</p>
              <p className="text-gray-500">{v.notes || ""}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No clinic visits found.</p>
      )}
    </div>
  );
}
