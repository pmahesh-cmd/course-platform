async function getCourses() {
  const res = await fetch("http://localhost:3000/api/courses")
  return res.json()
}

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const courses = await getCourses()
  const course = courses.find((c: any) => c.id === id)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{course.title}</h1>
        <iframe
          width="100%"
          height="500"
          src={`${course.video}?origin=http://localhost:3000`}
          title="Course Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl shadow-lg"
        />
      </div>
    </main>
  )
}