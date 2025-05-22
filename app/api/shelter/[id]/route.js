// import clientPromise from "@/app/api/db";
// import { ObjectId } from "mongodb";

// export async function GET(req, { params }) {
//   const client = await clientPromise;
//   const db = client.db("ShelterLink");
//   const shelterCollection = db.collection("Shelters");
//   const userCollection = db.collection('Users');

//   const { id } = params

//   const result = await shelterCollection.findOne({ _id: new ObjectId(id) });
//   const admin = await userCollection.findOne({ _id: result.admin_id });
//   const email = admin.email;

//   const shelterWithEmail = {
//     ...result,
//     email,
//   };

//   return Response.json(shelterWithEmail);
// }


import clientPromise from "@/app/api/db";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  const { id } = context.params; // 올바른 방식으로 params 가져오기

  const client = await clientPromise;
  const db = client.db("ShelterLink");
  const shelterCollection = db.collection("Shelters");
  const userCollection = db.collection("Users");

  try {
    const result = await shelterCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return new Response(JSON.stringify({ error: "Shelter not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const admin = result.admin_id
      ? await userCollection.findOne({ _id: result.admin_id })
      : null;

    const email = admin?.email || "N/A";

    const shelterWithEmail = {
      ...result,
      email,
    };

    return new Response(JSON.stringify(shelterWithEmail), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching shelter:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
