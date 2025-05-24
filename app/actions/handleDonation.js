// app/actions/handleDonation/handleDonation.js
'use server'

import { getUserShelter } from '@/lib/getUserShelter'
import clientPromise from '@/app/api/db'

/**
 * Remove a pending donation entry for the given community member (by email)
 * under the shelter owned by the currently logged-in organization user.
 */
export async function rejectDonation(email) {
  // get the org user's shelter
  const shelter = await getUserShelter()
  if (!shelter) {
    throw new Error('Organization user has no shelter attached')
  }

  //string‑ify the shelter _id (keys in `accepted` are strings)
  const shelterId = shelter._id.toString()

  //connect to Mongo and $unset that accepted.<shelterId> field
  const client = await clientPromise
  const usersCol = client.db('ShelterLink').collection('Users')

  await usersCol.updateOne(
    { email },
    { $unset: { [`accepted.${shelterId}`]: '' } }
  )
}

/**
 * Accept a pending donation: update shelter inventories (inv, req)
 * then remove the donation record from the user’s accepted field.
 */
export async function receivedDonation(email) {
  //identify the org user’s shelter
  const shelter = await getUserShelter()
  if (!shelter) throw new Error('Organization user has no shelter attached')

  const shelterId = shelter._id.toString()
  const client    = await clientPromise
  const db        = client.db('ShelterLink')
  const usersCol  = db.collection('Users')

  //fetch the pending donation details for that email
  const userDoc = await usersCol.findOne(
    { email },
    { projection: { [`accepted.${shelterId}.donation`]: 1 } }
  )
  if (!userDoc?.accepted?.[shelterId]?.donation) {
    throw new Error('No pending donation found for this user')
  }
  const donation = userDoc.accepted[shelterId].donation

  // apply increments to shelter.inv and decrements to shelter.req
  const shelterCol = db.collection('Shelters')
  const incOps = {}
  for (const [item, qty] of Object.entries(donation)) {
    incOps[`inv.${item}`] = qty
    incOps[`req.${item}`] = -qty
  }
  await shelterCol.updateOne(
    { _id: shelter._id },
    { $inc: incOps }
  )

  //remove the accepted.<shelterId> from the donor’s record
  await usersCol.updateOne(
    { email },
    { $unset: { [`accepted.${shelterId}`]: '' } }
  )
}