'use server';

import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';
import { getUserShelter } from '@/lib/getUserShelter';

export async function editUser(formData) {
    const user = await getCurrentUser();
    console.log(user);
    console.log(user._id);

    const client = await clientPromise;
    const userCollection = await client.db('ShelterLink').collection('Users');

    const newName = formData.get('name');
    const newEmail = formData.get('email');

    const existing = await userCollection.findOne({ email: newEmail });
    if (existing && existing._id.toString() !== user._id.toString()) {
        throw new Error("That email is already in use.");
    }

    const result = await userCollection.updateOne({ _id: user._id }, {
        $set: {
            name: newName,
            email: newEmail
        },
    })
}

export async function editShelter(formData) {
    const shelter = await getUserShelter();

    const client = await clientPromise;
    const shelterCollection = await client.db('ShelterLink').collection('Shelters');

    const name = formData.get("name");
    const address = formData.get("address");
    const role = formData.get("role");

    await shelterCollection.updateOne(
        { _id: shelter._id },
        { $set: { name, address, role } }
    );
}


export async function updateAcceptedDonations(updatedAccepted) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const client = await clientPromise;
  const userCollection = await client.db('ShelterLink').collection('Users');

  await userCollection.updateOne(
    { _id: user._id },
    { $set: { accepted: updatedAccepted } }
  );

  return { success: true };
}
