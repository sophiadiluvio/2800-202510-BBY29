import { NextResponse } from 'next/server';
import clientPromise from '../mongodb';

export async function POST(req) {

  try {
    const shelter = await req.json();

    console.log("Received shelter:", shelter);
    const { _id, ...rest } = shelter; 

    const client = await clientPromise;
    const db = client.db("ShelterLink");            
    const collection = db.collection("Selections");

    const result = await collection.insertOne({
      ...rest,
      selectedAt: new Date(),
    });

    console.log("Save completed:", result);

    return NextResponse.json({ message: "Shelter saved", id: result.insertedId });
  } catch (error) {
    console.error("Error saving shelter:", error);
    return NextResponse.json({ error: "Failed to save shelter" }, { status: 500 });
  }
}
