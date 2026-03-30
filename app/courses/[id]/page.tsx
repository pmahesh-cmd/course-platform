async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`);
  return res.json();
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const courses = await getCourses();
  const course = courses.find((c: any) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{course.title}</h1>

        <iframe
          width="100%"
          height="500"
          src={course.video}  // ✅ FIXED
          title="Course Video"
          allowFullScreen
          className="rounded-xl shadow-lg"
        />
      </div>
    </main>
  );
}