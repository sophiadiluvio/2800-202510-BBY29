import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = request.cookies.get('Token')?.value;
    console.log("This is the value of the token: ", token);

    const path = request.nextUrl.pathname;
    console.log("⏱️  Incoming:", request.nextUrl.pathname,
        "│ Cookies header:", request.headers.get("cookie"));


    if (token) {
        try {
            console.log("We are inside the try block");

            const { payload } = await jwtVerify(token, secret, {
                algorithms: ['HS256']
            });
            const role = payload.role;
            console.log("→ role from token:", role);

            const apiRes = await fetch(new URL('/api/account', request.url), { headers: { cookie: request.headers.get('cookie') } });
            const { user } = await apiRes.json();

            console.log("This is after the fetch");

            if (role === 'organizer') {
                const shelterId = user.shelterId;
                console.log(shelterId);
                if (!shelterId) {
                    if (path === '/Organization/createShelter') {
                        return NextResponse.next();
                    }
                    return NextResponse.redirect(
                        new URL('/Organization/createShelter', request.url)
                    );
                }

                const shelterRes = await fetch(new URL('/api/userShelter', request.url), {
                    headers: { cookie: request.headers.get('cookie') },
                });
                const { userShelter } = await shelterRes.json();
                const inv = userShelter.inv;
                console.log(inv);


                if (!inv) {
                    if (path === '/Organization/createShelter/inventoryInitialization') {
                        return NextResponse.next();
                    }
                    return NextResponse.redirect(
                        new URL('/Organization/createShelter/inventoryInitialization', request.url)
                    );
                }

                if (path.startsWith('/Organization/createShelter')) {
                    return NextResponse.redirect(
                        new URL('/Organization/profile', request.url)
                    );
                }

                if (path.startsWith('/Organization')) {
                    return NextResponse.next();
                } else {
                    const res = NextResponse.redirect(new URL('/Organization', request.url));
                    return res;
                }

            } else if (role === 'community_member') {
                if (path.startsWith('/CommunityMember')) {
                    return NextResponse.next();
                } else {
                    const res = NextResponse.redirect(new URL('/CommunityMember', request.url));
                    return res;
                }
            } else {
                const res = NextResponse.redirect(new URL('/login', request.url));
                res.cookies.delete('Token');
                return res;
            }
        } catch (err) {
            const res = NextResponse.redirect(new URL('/login', request.url));
            res.cookies.delete('Token');
            return res;
        }
    } else {
        console.log("The token doesn't exist.");
        const isPublic =
            path === '/' ||
            path.startsWith('/login') ||
            path.startsWith('/register') ||
            path.startsWith('/resourcesNearYou');

        if (isPublic) {
            console.log("The isPublic is true");
            return NextResponse.next();
        } else {
            const res = NextResponse.redirect(new URL('/', request.url));
            res.cookies.delete('Token');
            return res;
        }
    }
}

export const config = {
    matcher: [
        '/',
        '/resourcesNearYou',
        '/login/:path*',
        '/register/:path*',
        '/Organization/:path*',
        '/CommunityMember/:path*'
    ]
};