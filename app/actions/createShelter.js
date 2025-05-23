'use server';

// Import redirect from next/navigation to navigate after shelter creation
import { redirect } from 'next/navigation';
// Import database client promise for MongoDB connection
import clientPromise from '@/app/api/db';
// Import helper to get currently authenticated user
import { getCurrentUser } from '@/lib/getCurrentUser';

// Server action to handle shelter creation form submission
export async function createShelter(formData) {
  // Retrieve the current user object
  const user = await getCurrentUser();
  // Extract form fields: shelter name, address, user role, coordinates, and website
  const name = formData.get('name');
  const address = formData.get('address');
  const role = formData.get('type');
  const lat = parseFloat(formData.get('lat'));
  const lon = parseFloat(formData.get('lon'));
  const website = formData.get('website');

  // Connect to MongoDB and get the ShelterLink database
  const client = await clientPromise;
  const db = client.db("ShelterLink");
  // Get references to the Shelters and Users collections
  const shelterCollection = db.collection("Shelters");
  const userCollection = db.collection("Users");

  // Insert a new shelter document with the provided details
  const resultShelter = await shelterCollection.insertOne({
    name,
    address,
    role,
    lat,
    lon,
    website,
    admin_id: user._id // Link shelter to the creating admin user
  });

  // Update the user document to set their shelterId to the newly created shelter's ID
  await userCollection.updateOne(
    { _id: user._id },
    { $set: { shelterId: resultShelter.insertedId } }
  );

  // After setup, redirect user to the inventory initialization page for their shelter
  redirect('/Organization/createShelter/inventoryInitialization');
}
