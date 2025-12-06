export default function Contact() {
  return (
    <main className="bg-blue-50 min-h-screen text-blue-900">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-10">
          Reach out to our campus clinic for appointments, inquiries, or emergency assistance.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-700">DOrSU Banay-Banay Campus</p>
            <p className="text-gray-700">Banay-Banay, Philippines</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-gray-700">Phone: +63 912 345 6789</p>
            <p className="text-gray-700">Email: info@dorsuclinic.ph</p>
          </div>
        </div>

        <form className="mt-10 grid gap-4 max-w-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded border border-blue-200"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded border border-blue-200"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full p-3 rounded border border-blue-200"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
