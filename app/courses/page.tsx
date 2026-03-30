import Link from 'next/link'

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Courses</h1>
        <p className="text-gray-500 text-lg">Pick a course and start learning today</p>
      </div>
      <section className="max-w-5xl mx-auto py-16 px-8">
        <div className="grid grid-cols-3 gap-6">
          {[
            { id: '1', title: 'React Course', desc: 'Learn React from scratch', emoji: '⚛️' },
            { id: '2', title: 'JavaScript Course', desc: 'Master JavaScript fundamentals', emoji: '🟨' },
          ].map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="text-4xl mb-4">{course.emoji}</div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h4>
                <p className="text-gray-500 text-sm">{course.desc}</p>
                <span className="mt-4 inline-block text-blue-600 text-sm font-medium">Start Learning →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}