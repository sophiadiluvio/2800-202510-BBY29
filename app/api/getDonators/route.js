// app/api/getDonators/route.js
import { NextResponse } from 'next/server'
import { getUserShelter } from '@/lib/getUserShelter'
import clientPromise from '@/app/api/db'

export async function GET() {
  // 1️⃣ find the shelter attached to the currently‐logged‐in org user
  const shelter = await getUserShelter()
  if (!shelter) {
    // if they somehow aren’t tied to a shelter, just return an empty list
    return NextResponse.json([], { status: 200 })
  }

  // 2️⃣ convert its ObjectId to string (that’s how keys live in `accepted`)
  const shelterId = shelter._id.toString()

  // 3️⃣ grab all users who have an `accepted.<shelterId>` field
  const client = await clientPromise
  const usersCollection = client.db('ShelterLink').collection('Users')
  const donorsRaw = await usersCollection
    .find(
      { [`accepted.${shelterId}`]: { $exists: true } },
      {
        projection: {
          name: 1,
          email: 1,
          // only pull in the one nested accepted entry
          [`accepted.${shelterId}`]: 1
        }
      }
    )
    .toArray()

  // 4️⃣ reshape into exactly what the front end needs
  const donors = donorsRaw.map(u => {
    const info = u.accepted[shelterId]
    return {
      name:     u.name,
      email:    u.email,
      donation: info.donation,  // { itemKey: number, … }
      opening:  info.opening,   // e.g. "2025-05-25"
      closing:  info.closing    // e.g. "2025-05-27"
    }
  })

  return NextResponse.json(donors)
}
