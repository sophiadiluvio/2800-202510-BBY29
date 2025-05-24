'use server';

// Import the MongoDB client promise for establishing a database connection
import clientPromise from '@/app/api/db';
// Import helper to retrieve the currently authenticated user
import { getCurrentUser } from '@/lib/getCurrentUser';
// Import helper to retrieve the shelter associated with the current user
import { getUserShelter } from '@/lib/getUserShelter';

/**
 * Server action: Edit the current user's basic profile information.
 * @param {FormData} formData - Contains the new name and email to update.
 * @throws {Error} If the new email is already in use by another user.
 */
export async function editUser(formData) {
    // Fetch the authenticated user; throws if unauthenticated
    const user = await getCurrentUser();
    console.log('Editing profile for user:', user);

    // Establish a connection to the ShelterLink database
    const client = await clientPromise;
    const userCollection = client.db('ShelterLink').collection('Users');

    // Extract updated fields from the form data
    const newName = formData.get('name');   // Updated display name
    const newEmail = formData.get('email'); // Updated email address

    // Check for email conflicts: find any user with the new email
    const existing = await userCollection.findOne({ email: newEmail });
    // If another user already has this email, prevent collision
    if (existing && existing._id.toString() !== user._id.toString()) {
        throw new Error("That email is already in use.");
    }

    // Perform the database update: set the new name and email
    const result = await userCollection.updateOne(
        { _id: user._id },
        { $set: { name: newName, email: newEmail } }
    );
    // Optionally, you could inspect `result.matchedCount` and `result.modifiedCount` here
}

/**
 * Server action: Edit the shelter details associated with the current user.
 * @param {FormData} formData - Contains updated shelter name, address, and role.
 */
export async function editShelter(formData) {
    // Retrieve the shelter document linked to the current user
    const shelter = await getUserShelter();

    // Connect to the ShelterLink database and select the Shelters collection
    const client = await clientPromise;
    const shelterCollection = client.db('ShelterLink').collection('Shelters');

    // Extract updated shelter fields from the form data
    const name = formData.get('name');       // New shelter name
    const address = formData.get('address'); // New shelter address
    const role = formData.get('role');       // New shelter role/type

    // Update the shelter document with the new details
    await shelterCollection.updateOne(
        { _id: shelter._id },
        { $set: { name, address, role } }
    );
}

/**
 * Server action: Replace the user's accepted donations object.
 * @param {object} updatedAccepted - New accepted donations mapping.
 * @returns {{ success: boolean }} A confirmation of successful update.
 * @throws {Error} If the user is not authenticated.
 */
export async function updateAcceptedDonations(updatedAccepted) {
  // Ensure the user is authenticated
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  // Connect to the ShelterLink database and select the Users collection
  const client = await clientPromise;
  const userCollection = client.db('ShelterLink').collection('Users');

  // Update the `accepted` field with the new donations object
  await userCollection.updateOne(
    { _id: user._id },
    { $set: { accepted: updatedAccepted } }
  );

  // Return a success indicator to the caller
  return { success: true };
}
