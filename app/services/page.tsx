export default function Services() {
  return (
    <main className="bg-blue-50 min-h-screen text-blue-900">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-gray-700 mb-10">
          Explore the wide range of healthcare services available for students.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">General Checkups</h3>
            <p className="text-gray-600">Regular health assessments for students and staff.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">Vaccinations</h3>
            <p className="text-gray-600">Ensuring immunization compliance and campus safety.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-blue-100">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">Emergency Care</h3>
            <p className="text-gray-600">Immediate attention for injuries and urgent medical needs.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
