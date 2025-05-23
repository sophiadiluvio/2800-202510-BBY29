'use server';

// Import the MongoDB client promise for establishing a database connection
import clientPromise from '@/app/api/db';
// Import helper to retrieve the currently authenticated user
import { getCurrentUser } from '@/lib/getCurrentUser';

/**
 * Server action: Record a donation request for a given shelter.
 * Stores donation details under the user's `accepted` map keyed by shelter ID.
 *
 * @param {string} id          - The unique identifier of the shelter or donation entry.
 * @param {Object} donation    - An object detailing items and quantities donated.
 * @param {string} opening     - ISO timestamp or date string when donation window opens.
 * @param {string} closing     - ISO timestamp or date string when donation window closes.
 */
export async function makeDonation(id, donation, opening, closing) {
  // Ensure the user is authenticated; throws if unauthenticated
  const user = await getCurrentUser();

  // Connect to MongoDB and select the Users collection
  const client = await clientPromise;
  const usersCollection = client.db('ShelterLink').collection('Users');

  // Build the field path for this shelter's accepted donations using bracket notation
  const fieldPath = `accepted.${id}`;

  // Update the user's document: set the donation details for this shelter ID
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        [fieldPath]: {
          donation, // Donation object: { itemKey: quantity, ... }
          opening,  // Opening date/time for the donation window
          closing   // Closing date/time for the donation window
        }
      }
    }
  );
}
