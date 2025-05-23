// app/actions/ItemActions.js
'use server';

import clientPromise from '@/app/api/db';
import { ObjectId } from 'mongodb';
import { getUserShelter } from '@/lib/getUserShelter';

export async function createInvItem(formData) {
  const itemKey = formData.get('itemKey');
  const quantity = parseInt(formData.get('quantity'), 10);
  if (!itemKey || isNaN(quantity)) throw new Error('Invalid data');
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`inv.${itemKey}`]: quantity } }
    );
}

export async function updateInvItem(itemKey, newValue) {
  if (!itemKey || isNaN(newValue)) throw new Error('Invalid data');
  
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  const currentMax = shelter?.max?.[itemKey];
  if (typeof currentMax === 'number' && newValue > currentMax) {
    throw new Error(`Cannot set inventory higher than max (${currentMax})`);
  }

  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`inv.${itemKey}`]: newValue } }
    );
}


export async function deleteInvItem(itemKey) {
  if (!itemKey) throw new Error('Invalid data');
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $unset: { [`inv.${itemKey}`]: '' } }
    );
}

export async function createMaxItem(formData) {
  const itemKey = formData.get('itemKey');
  const max = parseInt(formData.get('max'), 10);
  if (!itemKey || isNaN(max)) throw new Error('Invalid data');
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');
  const client = await clientPromise;
  await client.db('ShelterLink')
    .collection('Shelters')
    .updateOne(
      { _id: new ObjectId(shelter._id) },
      { $set: { [`max.${itemKey}`]: max } }
    );
}

export async function updateMaxItem(itemKey, newValue) {
  if (!itemKey || isNaN(newValue)) throw new Error('Invalid data');
  
  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

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


export async function setInitialInventory(formData) {
  const inv = parseNestedFields(formData, 'inv');
  const max = parseNestedFields(formData, 'max');
  const req = parseNestedFields(formData, 'req');

  const shelter = await getUserShelter();
  if (!shelter?._id) throw new Error('Shelter not found');

  const client = await clientPromise;
  await client.db('ShelterLink').collection('Shelters').updateOne(
    { _id: new ObjectId(shelter._id) },
    {
      $set: {
        inv,
        max,
        req,
      },
    }
  );
}

function parseNestedFields(formData, prefix) {
  const result = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith(`${prefix}[`)) {
      const category = key.slice(prefix.length + 1, -1);
      result[category] = parseInt(value);
    }
  }
  return result;
}


