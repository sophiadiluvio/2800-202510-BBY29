'use server';

import clientPromise from '@/app/api/db';
import { ObjectId } from 'mongodb';

export async function createItem(formData) {
    const name = formData.get('name');
    // const price = parseFloat(formData.get('price'));
    const category = formData.get('category');
    const stock = parseInt(formData.get('stock'));

    const client = await clientPromise;
    const db = client.db("ShelterLink");
    const collection = db.collection("Shelters");

    const result = collection.insertOne({
      name,
    //   price,
      category,
      stock
    });

    console.log("Item Id: ", result.insertedId);
}

export async function deleteItem(id) {
  const client = await clientPromise;
  const result = client.db('ShelterLink').collection('Shelters').deleteOne({ _id: new ObjectId(id)});

  console.log("Item was deleted");
}

export async function plusItem(id, newValue) {
  const client = await clientPromise;
  const result = client.db('ShelterLink').collection('Shelters').updateOne({ _id: new ObjectId(id)}, {$set: {stock: newValue}});
  
  console.log("increased by ", newValue);
}
