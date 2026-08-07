import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// mapping of routes to allowed roles
const roleAccessMap: Record<string, string[]> = {
    '/dashboard': ['user']
};

export function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;

    // Determine if the current path is protected
    // by checking if it starts with any key in the map
    const path = request.nextUrl.pathname;
    const matchedRoute = Object.keys(roleAccessMap).find(route => path.startsWith(route));

    // If it's not a protected route, let the request continue normally
    if (!matchedRoute) {
        return NextResponse.next();
    }

    // If it is a protected route and there is no token, redirect to sign-in
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Token exists, decode it to verify role access
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        // get user role from JWT payload
        const userRole = decodedPayload.app_metadata?.family_role;

        // Get the allowed roles for this specific route
        const allowedRoles = roleAccessMap[matchedRoute];

        // Check if the user has a valid role for this route
        if (!userRole || !allowedRoles.includes(userRole)) {
            console.warn(`Unauthorized access attempt: Role '${userRole}' trying to access '${path}'`);

            // Redirect unauthorized users to a safe default page
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

    } catch (e) {
        console.error("Failed to decode JWT in middleware", e);
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // User is authenticated and authorized, proceed
    return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
    matcher: [
        '/dashboard/:path*',
        // '/admin/:path*',
        // '/family/settings/:path*',
    ],
};