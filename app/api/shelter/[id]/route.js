import clientPromise from "@/app/api/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db("ShelterLink");
  const collection = db.collection("Shelters");

  const id = params.id;

    const result = await collection.findOne({ _id: new ObjectId(id) });
    return Response.json(result);
}
