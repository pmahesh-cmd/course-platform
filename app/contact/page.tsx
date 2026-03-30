export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-500 text-lg">We would love to hear from you!</p>
      </div>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto py-16 px-8">
        <div className="bg-white border rounded-xl shadow-sm p-8">

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>

        </div>

        {/* Contact Info */}
        <div className="mt-10 grid grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-bold text-gray-800 mb-1">Email</h3>
            <p className="text-gray-500 text-sm">hello@learnhub.com</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-bold text-gray-800 mb-1">Location</h3>
            <p className="text-gray-500 text-sm">Hyderabad, India</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-bold text-gray-800 mb-1">Support</h3>
            <p className="text-gray-500 text-sm">Mon - Fri, 9am - 6pm</p>
          </div>
        </div>

      </section>

    </main>
  )
}
