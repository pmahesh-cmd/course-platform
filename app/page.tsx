import Link from 'next/link'
import { SignInButton, SignUpButton, SignOutButton, UserButton, SignIn, SignUp } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">CoursePlatform</h1>
        <div className="flex gap-4 items-center">
          {!userId ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Learn Anything</h2>
        <p className="text-xl text-gray-500 mb-8">Access top courses and level up your skills</p>
        {!userId ? (
          <SignUpButton mode="modal">
            <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
              Get Started Free
            </button>
          </SignUpButton>
        ) : (
          <Link href="/courses">
            <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700">
              Browse Courses
            </button>
          </Link>
        )}
      </section>
    </main>
  )
}
