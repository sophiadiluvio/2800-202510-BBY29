import clientPromise from "../db";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { SignJWT } from "jose";

export async function POST(request) {

    const { name, email, password, role } = await request.json();

    const client = await clientPromise;

    const hashedPassword = await bcrypt.hash(password, 10);

    const exists = await client.db('ShelterLink').collection('Users').findOne({ email: email });

    if (exists !== null) {
        console.log('Email already in use. Register with another email.');
        return Response.json({ error: 'Email already in use' }, { status: 400 });
    }

    const result = await client.db('ShelterLink').collection('Users').insertOne({
        name,
        email,
        hashedPassword,
        role
    });

    console.log('User inserted Id: ', result.insertedId.toString());

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ sub: result.insertedId.toString(), role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

    // decide where to go
    const redirectPath =
        role === "organizer"
            ? "/Organization/profile"
            : "/CommunityMember/profile";

    const target = new URL(redirectPath, request.url)

    // 1) create the redirect response
    const res = NextResponse.redirect(target, 303)

    // 2) then set the cookie on that response
    res.cookies.set({
        name: "Token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // 3) return it
    return res
}