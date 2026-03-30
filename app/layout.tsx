import { ClerkProvider, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnHub',
  description: 'Learn Without Limits',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* Navbar on every page */}
          <nav className="flex justify-between items-center px-8 py-4 border-b shadow-sm sticky top-0 bg-white z-10">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600">LearnHub</h1>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/courses" className="text-gray-600 hover:text-blue-600">Courses</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
              {!userId ? (
                <div className="flex gap-3">
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
                </div>
              ) : (
                <UserButton />
              )}
            </div>
          </nav>

          {children}

          {/* Footer on every page */}
          <footer className="py-8 px-8 border-t text-center text-gray-400 text-sm">
            © 2026 LearnHub. All rights reserved.
          </footer>

        </body>
      </html>
    </ClerkProvider>
  )
}