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

