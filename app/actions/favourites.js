'use server';

import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { ObjectId } from 'mongodb';

export async function addFavourite(formData) {
    const user = await getCurrentUser();
    console.log(user);
    const client = await clientPromise;

    const usersCollection = await client.db('ShelterLink').collection('Users');

    const shelterId = formData.get('shelterId');
    const shelterObjectId = new ObjectId(shelterId);

    const result = await usersCollection.updateOne({ _id: user._id }, { $addToSet: { favourites: shelterObjectId } });
}

export async function removeFavourite(formData) {
    const user = await getCurrentUser();
    console.log(user);
    const client = await clientPromise;

    const usersCollection = await client.db('ShelterLink').collection('Users');

    const shelterId = formData.get('shelterId');
    const shelterObjectId = new ObjectId(shelterId);

    const result = await usersCollection.updateOne({ _id: user._id }, { $pull: { favourites: shelterObjectId } });
}