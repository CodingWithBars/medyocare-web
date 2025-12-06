export default function About() {
  return (
    <main className="bg-blue-50 min-h-screen text-blue-900">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <h1 className="text-4xl font-bold mb-6">About Our Clinic</h1>
        <p className="text-gray-700 mb-4">
          At the DOrSU Banay-Banay Campus Clinic, we provide student-focused healthcare with a compassionate approach.
        </p>
        <p className="text-gray-700 mb-10">
          Our team of professionals ensures that every student receives medical care promptly and safely, promoting a healthy campus community.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>General medical consultations</li>
          <li>Emergency care</li>
          <li>Vaccinations and immunizations</li>
          <li>Health education and wellness programs</li>
        </ul>
      </div>
    </main>
  );
}
