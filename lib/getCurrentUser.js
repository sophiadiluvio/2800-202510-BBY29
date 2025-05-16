// lib/getCurrentUser.js
import clientPromise from '@/app/api/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { ObjectId } from 'mongodb';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getCurrentUser() {
  // await the cookies() call itself
  const cookieStore = await cookies();

  // now you can synchronously .get() from that store
  const token = cookieStore.get('Token')?.value;
  if (!token) return null;

  let payload;
  try {
    ({ payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] }));
  } catch {
    return null;
  }

  const userId = payload.sub;
  if (!userId) return null;

  const client = await clientPromise;
  const user = await client
    .db('ShelterLink')
    .collection('Users')           // match your actual collection name
    .findOne({ _id: new ObjectId(userId) });

  if (!user) return null;
  delete user.hashedPassword;      // strip out sensitive fields
  return user;
}
