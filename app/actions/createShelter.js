'use server';

import { redirect } from 'next/navigation';
import clientPromise from '@/app/api/db';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function createShelter(formData) {
  const user = await getCurrentUser();
  const name = formData.get('name');
  const address = formData.get('address');
  const role = formData.get('type');
  const lat = parseFloat(formData.get('lat'));
  const lon = parseFloat(formData.get('lon'));
  const website = formData.get('website');

  console.log("CreateShelter input:");
  console.log("Name:", name);
  console.log("Address:", address);
  console.log("Role:", role);
  console.log("Lat:", lat);
  console.log("Lon:", lon);
  console.log("User ID:", user._id);

  const client = await clientPromise;
  const db = client.db("ShelterLink");
  const shelterCollection = db.collection("Shelters");
  const userCollection = db.collection("Users");

  const resultShelter = await shelterCollection.insertOne({
    name,
    address,
    role,
    lat,
    lon,
    website,
    admin_id: user._id
  });

  await userCollection.updateOne(
    { _id: user._id },
    { $set: { shelterId: resultShelter.insertedId } }
  );

  redirect('/Organization/profile');
}
