// app/actions/ItemActions.js
'use server';

// Import the MongoDB client promise for establishing a database connection
import clientPromise from '@/app/api/db';
// Import ObjectId constructor to convert string IDs into MongoDB ObjectId objects
import { ObjectId } from 'mongodb';
// Import helper to retrieve the shelter document linked to the current user
import { getUserShelter } from '@/lib/getUserShelter';

/**
 * Create or set an inventory item quantity for the current shelter.
 * @param {FormData} formData - Form data containing 'itemKey' and 'quantity'.
 * @throws {Error} If data is missing or shelter not found.
 */
export async function createInvItem(formData) {
  // Extract item key and quantity from the submitted form
  const itemKey = formData.get('itemKey');
  const quantity = parseInt(formData.get('quantity'), 10);
  // Validate presence and numeric value
  if (!itemKey || isNaN(quantity)) throw new Error('Invalid data');

  // Retrieve the shelter associated with the current user
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Update the shelter's inventory field by setting inv[itemKey] = quantity
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`inv.${itemKey}`]: quantity } }
    );
}

/**
 * Update an existing inventory item quantity, enforcing max constraints.
 * @param {string} itemKey - The key for the inventory item to update.
 * @param {number} newValue - The new inventory value to set.
 * @throws {Error} If data invalid, shelter missing, or newValue exceeds max.
 */
export async function updateInvItem(itemKey, newValue) {
  // Validate inputs
  if (!itemKey || isNaN(newValue)) throw new Error('Invalid data');

  // Retrieve the shelter document
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Enforce max limit: cannot exceed shelter.max[itemKey]
  const currentMax = shelter?.max?.[itemKey];
  if (typeof currentMax === 'number' && newValue > currentMax) {
    throw new Error(`Cannot set inventory higher than max (${currentMax})`);
  }

  // Perform the update
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`inv.${itemKey}`]: newValue } }
    );
}

/**
 * Delete an inventory item from the shelter's inventory.
 * @param {string} itemKey - The key of the item to remove.
 * @throws {Error} If itemKey missing or shelter not found.
 */
export async function deleteInvItem(itemKey) {
  if (!itemKey) throw new Error('Invalid data');

  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Use $unset to remove the inv[itemKey] field entirely
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $unset: { [`inv.${itemKey}`]: '' } }
    );
}

/**
 * Create or set a maximum capacity for an inventory item.
 * @param {FormData} formData - Contains 'itemKey' and 'max'.
 * @throws {Error} If data invalid or shelter not found.
 */
export async function createMaxItem(formData) {
  const itemKey = formData.get('itemKey');
  const max = parseInt(formData.get('max'), 10);
  if (!itemKey || isNaN(max)) throw new Error('Invalid data');

  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Set the max capacity under max[itemKey]
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`max.${itemKey}`]: max } }
    );
}

/**
 * Update an existing max capacity value, enforcing it is not below current inventory.
 * @param {string} itemKey - The key of the max field to update.
 * @param {number} newValue - The new max value to set.
 * @throws {Error} If newValue < current inventory or data invalid.
 */
export async function updateMaxItem(itemKey, newValue) {
  if (!itemKey || isNaN(newValue)) throw new Error('Invalid data');

  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Enforce inventory constraint: max cannot be lower than current inv[itemKey]
  const currentInv = shelter?.inv?.[itemKey];
  if (typeof currentInv === 'number' && newValue < currentInv) {
    throw new Error(`Cannot set max lower than current inventory (${currentInv})`);
  }

  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`max.${itemKey}`]: newValue } }
    );
}

/**
 * Initialize an entire shelter's inventory, max, and request fields in one go.
 * @param {FormData} formData - Form data with nested fields prefixed as 'inv', 'max', or 'req'.
 * @throws {Error} If shelter not found.
 */
export async function setInitialInventory(formData) {
  // Parse nested field values into plain objects
  const inv = parseNestedFields(formData, 'inv');
  const max = parseNestedFields(formData, 'max');
  const req = parseNestedFields(formData, 'req');

  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  // Batch update the shelter document with all three maps
  const client = await clientPromise;
  await client.db('ShelterLink').collection('Shelters').updateOne(
    { _id: new ObjectId(shelter._id) },
    { $set: { inv, max, req } }
  );
}

/**
 * Helper: Parse nested form fields into an object map.
 * Expects keys like 'prefix[itemKey]' and integer values.
 * @param {FormData} formData - The submitted form data.
 * @param {string} prefix - The prefix used in input names (e.g., 'inv' or 'max').
 * @returns {Object} A mapping of itemKey -> parsed integer value.
 */
function parseNestedFields(formData, prefix) {
  const result = {};
  for (const [key, value] of formData.entries()) {
    // Only handle keys that start with the given prefix and bracket notation
    if (key.startsWith(`${prefix}[`)) {
      // Extract the actual field name between the brackets
      const category = key.slice(prefix.length + 1, -1);
      // Parse the string value to integer
      result[category] = parseInt(value, 10);
    }
  }
  return result;
}
