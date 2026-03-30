export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-500 text-lg">We are on a mission to make education free for everyone</p>
      </div>

      {/* Content */}
      <section className="max-w-3xl mx-auto py-16 px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission 🎯</h2>
            <p className="text-gray-500 leading-relaxed">
              At LearnHub, we believe everyone deserves access to quality education.
              We provide free, high quality courses to help you build real world skills
              and advance your career.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">What We Offer 📚</h2>
            <p className="text-gray-500 leading-relaxed">
              From web development to data science, our courses are designed by
              industry experts to give you practical, job ready skills.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose Us? ⭐</h2>
            <ul className="text-gray-500 space-y-2">
              <li>✅ Free to start</li>
              <li>✅ Expert instructors</li>
              <li>✅ Learn at your own pace</li>
              <li>✅ Real world projects</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  )
}