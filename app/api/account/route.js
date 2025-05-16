// app/api/account/route.js

import { getCurrentUser } from '@/lib/getCurrentUser'   // or wherever your helper lives

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return Response.json(
      { error: 'Unauthenticated' },
      { status: 401 }
    )
  }
  return Response.json({ user })
}
