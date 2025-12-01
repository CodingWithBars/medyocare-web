export default function DocumentsList({ documents }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">Documents</h2>
      {documents.length > 0 ? (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a
                href={doc.file_path}
                target="_blank"
                className="text-blue-600 underline"
              >
                {doc.document_type}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No documents uploaded.</p>
      )}
    </div>
  );
}
