import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

/**
 * Auth0 Middleware
 *
 * Handles session management and protects routes.
 * The Auth0 middleware automatically:
 * - Refreshes expired sessions
 * - Sets secure session cookies
 * - Handles token rotation
 */

export async function middleware(request: NextRequest) {
  // Let Auth0 handle session management
  const authResponse = await auth0.middleware(request);

  // Protect dashboard routes - redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await auth0.getSession();
    if (!session) {
      const loginUrl = new URL("/api/auth/login", request.url);
      loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return authResponse;
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
