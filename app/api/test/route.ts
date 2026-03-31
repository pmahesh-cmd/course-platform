import { getPrisma } from '@/lib/prisma'

export async function GET() {
  try {
    const prisma = getPrisma()
    const users = await prisma.user.findMany()
    return Response.json({ success: true, users })
  } catch (error) {
    return Response.json({ success: false, error: String(error) })
  }
}