import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	// if logged in, token exists
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	// if following == true, allow requests:
	// 1) request for next-auth session & provider fetching
	// 2) token exists

	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	// redirect to login if token absent AND request for protected route
	if (!token && pathname !== '/login' ) {
		return NextResponse.redirect('/login');
	}
}
