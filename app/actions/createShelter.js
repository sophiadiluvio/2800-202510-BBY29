'use server';

import { redirect } from 'next/navigation';
import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function createShelter(formData) {
    const user = await getCurrentUser();
    const name = formData.get('name');
    const address = formData.get('address');
    const role = formData.get('type');

    console.log("This is from the createShelter route:");
    console.log("name: ", name);
    console.log("address ", address);
    console.log("role: ", role);
    console.log("User Id: ", user._id);

    const client = await clientPromise;
    const db = await client.db("ShelterLink");
    const shelterCollection = db.collection("Shelters");
    const userCollection = db.collection("Users");

    const resultShelter = await shelterCollection.insertOne({
      name,
      address,
      role,
      admin_id: user._id
    });

    console.log("Item Id: ", resultShelter.insertedId);

    const resultUser = await userCollection.updateOne({ _id: user._id }, { $set: { shelterId: resultShelter.insertedId } })

    redirect('/Organization/profile');
}