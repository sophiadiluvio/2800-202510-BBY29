import clientPromise from "../db";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("ShelterLink");
    const collection = db.collection("Shelters");
    const result = await collection.find().toArray();
  
    return Response.json(result);
  }



