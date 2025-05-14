import clientPromise from "../db";
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { SignJWT } from "jose";

export async function POST(request) {
    const form = await request.formData();
    const email = form.get('email')?.toString() ?? '';
    const password = form.get('password')?.toString() ?? '';

    const client = await clientPromise;
    const user = await client
        .db('ShelterLink')
        .collection('Users')
        .findOne({ email });

    if (!user) {
        return NextResponse.json(
            { error: 'Email not found. Please register first.' },
            { status: 400 }
        );
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
        return NextResponse.json(
            { error: 'Invalid email or password.' },
            { status: 401 }
        );
    }

    const role = user.role;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ sub: user._id.toString(), role })
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