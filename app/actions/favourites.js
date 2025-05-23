'use server';

// Import the MongoDB client promise for establishing a database connection
import clientPromise from '@/app/api/db';
// Import helper to retrieve the currently logged-in user
import { getCurrentUser } from '@/lib/getCurrentUser';
// Import ObjectId constructor to convert string IDs into MongoDB ObjectId objects
import { ObjectId } from 'mongodb';

/**
 * Server action: Add a shelter to the current user's list of favourites.
 * Uses MongoDB's $addToSet operator to avoid duplicate entries.
 * @param {FormData} formData - Contains the shelterId to add.
 * @returns {{ success: boolean }} Confirmation of a successful update.
 */
export async function addFavourite(formData) {
  // Retrieve the authenticated user; throws if not authenticated
  const user = await getCurrentUser();
  
  // Connect to MongoDB and select the Users collection
  const client = await clientPromise;
  const usersCollection = client.db('ShelterLink').collection('Users');

  // Extract the shelterId from the form data (string representation)
  const shelterId = formData.get('shelterId');
  // Convert the string ID into a MongoDB ObjectId instance
  const shelterObjectId = new ObjectId(shelterId);

  // Update the user document by adding the shelterObjectId to the favourites array
  // If the array doesn't exist, MongoDB will create it. $addToSet ensures no duplicates.
  await usersCollection.updateOne(
    { _id: user._id },
    { $addToSet: { favourites: shelterObjectId } }
  );

  // Return a success indicator
  return { success: true };
}

/**
 * Server action: Remove a shelter from the current user's favourites list.
 * Uses MongoDB's $pull operator to remove the matching ObjectId.
 * @param {FormData} formData - Contains the shelterId to remove.
 * @returns {{ success: boolean }} Confirmation of a successful update.
 */
export async function removeFavourite(formData) {
  // Retrieve the authenticated user; throws if not authenticated
  const user = await getCurrentUser();

  // Connect to MongoDB and select the Users collection
  const client = await clientPromise;
  const usersCollection = client.db('ShelterLink').collection('Users');

  // Extract and convert the shelterId as before
  const shelterId = formData.get('shelterId');
  const shelterObjectId = new ObjectId(shelterId);

  // Update the user document by pulling the shelterObjectId from the favourites array
  await usersCollection.updateOne(
    { _id: user._id },
    { $pull: { favourites: shelterObjectId } }
  );

  // Return a success indicator
  return { success: true };
}
