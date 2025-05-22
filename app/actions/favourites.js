'use server';

import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { ObjectId } from 'mongodb';

export async function addFavourite(formData) {
  const user = await getCurrentUser();
  const client = await clientPromise;
  const usersCollection = client.db('ShelterLink').collection('Users');

  const shelterId = formData.get('shelterId');
  const shelterObjectId = new ObjectId(shelterId);

  await usersCollection.updateOne(
    { _id: user._id },
    { $addToSet: { favourites: shelterObjectId } }
  );

  return { success: true };
}

export async function removeFavourite(formData) {
  const user = await getCurrentUser();
  const client = await clientPromise;
  const usersCollection = client.db('ShelterLink').collection('Users');

  const shelterId = formData.get('shelterId');
  const shelterObjectId = new ObjectId(shelterId);

  await usersCollection.updateOne(
    { _id: user._id },
    { $pull: { favourites: shelterObjectId } }
  );
  return { success: true };
}
