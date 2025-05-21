'use server';

import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { ObjectId } from 'mongodb';

export async function makeDonation(id, donation) {
    const user = await getCurrentUser();
    const client = await clientPromise;

    const usersCollection = await client.db('ShelterLink').collection('Users');

    const result = await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        [`accepted.${id}`]: donation
      }
    }
  );
}