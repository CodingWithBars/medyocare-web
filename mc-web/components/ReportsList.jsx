export default function ReportsList({ reports }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">Reports</h2>
      {reports.length > 0 ? (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r.id} className="border p-3 rounded-lg">
              <p className="font-semibold">{r.report_type}</p>
              <p>Status: {r.status}</p>
              <p className="text-gray-500">{r.notes || ""}</p>
              <p className="text-gray-400 text-sm">{new Date(r.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reports found.</p>
      )}
    </div>
  );
}
