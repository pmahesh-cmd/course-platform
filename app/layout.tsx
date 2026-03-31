import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import './globals.css'
import { PHProvider } from './providers/PostHogProvider'

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
          {/* Navbar is now empty or you can remove this entire <nav> block */}
          <nav className="border-b shadow-sm sticky top-0 bg-white z-10 min-h-[1px]">
            <div className="flex justify-end items-center px-8 py-4">
              {userId && <UserButton />}
            </div>
          </nav>

          <PHProvider>
            {children}
          </PHProvider>

          
        </body>
      </html>
    </ClerkProvider>
  )
}