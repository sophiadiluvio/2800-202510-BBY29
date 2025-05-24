import clientPromise from "@/app/api/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db("ShelterLink");
  const shelterCollection = db.collection("Shelters");
  const userCollection = db.collection('Users');

  const { id } = params;

  const result = await shelterCollection.findOne({ _id: new ObjectId(id) });
  const admin = await userCollection.findOne({ _id: result.admin_id });
  const email = admin.email;

  const shelterWithEmail = {
    ...result,
    email,
  };

  return Response.json(shelterWithEmail);
}
