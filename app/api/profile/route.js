import clientPromise from "../db"; 
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // Get user ID from cookie or JWT token
    // This is a placeholder - implement your actual auth logic here
    const cookieStore = cookies();
    const authCookie = cookieStore.get("userId");
    
    // TO DO
    // Using a session cookie for now, but PROPER AUTH SHOULD BE IMPLEMENTED 
    const userId = authCookie?.value || "682537c04b1af4da7f21525e"; // Fallback for development
    
    const client = await clientPromise;
    const db = client.db("ShelterLink");

    const user = await db.collection("Users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        name: user.name,
        email: user.email,
        location: user.location || "", // optional fallback
        role: user.role
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Get user ID from cookie or JWT token
    // This is a placeholder to implement your actual auth logic here
    const cookieStore = cookies();
    const authCookie = cookieStore.get("userId");
    
    // Using a session cookie for now, but you should implement proper auth
    const userId = authCookie?.value || "682537c04b1af4da7f21525e"; // Fallback for development
    
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("ShelterLink");

    // Only allow updating fields that should be editable
    await db.collection("Users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name: body.name,
          email: body.email,
          location: body.location,
        },
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}

