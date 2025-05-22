//app/api/resourceRequest

import { NextResponse } from 'next/server'
import { getUserShelter } from "@/lib/getUserShelter";
import clientPromise from "../db";

export async function POST(request) {

    const data = await request.json();

    const userShelter = await getUserShelter();
    console.log(userShelter);
    
    const shelterId = userShelter._id;

    const client = await clientPromise;
    const shelterCollection = client.db('ShelterLink').collection('Shelters');

    const response = await shelterCollection.updateOne({ _id: shelterId }, { $set: { req: data } } );

    return NextResponse.json({ message: "Successfully made requests" });
}