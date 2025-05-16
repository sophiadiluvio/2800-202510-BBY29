import { getCurrentUser } from "./getCurrentUser";
import clientPromise from '@/app/api/db';
import { ObjectId } from 'mongodb';

export async function getUserShelter() {
    const user = await getCurrentUser();
    const shelterId = user.shelterId;

    if (shelterId) {
        const client = await clientPromise;
        const shelter = await client.db('ShelterLink').collection('Shelters').findOne({ _id: new ObjectId(shelterId) });

        return shelter;
    }
}