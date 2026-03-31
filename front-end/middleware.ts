import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

/**
 * Auth0 Middleware
 *
 * Handles session management and protects routes.
 * Wrapped in try/catch to handle cases where Auth0 is not configured.
 */

export async function middleware(request: NextRequest) {
    try {
          const authResponse = await auth0.middleware(request);

      if (request.nextUrl.pathname.startsWith("/dashboard")) {
              try {
                        const session = await auth0.getSession();
                        if (!session) {
                                    const loginUrl = new URL("/api/auth/login", request.url);
                                    loginUrl.searchParams.set("returnTo", request.nextUrl.pathname);
                                    return NextResponse.redirect(loginUrl);
                        }
              } catch {
                        return authResponse || NextResponse.next();
              }
      }

      return authResponse || NextResponse.next();
    } catch {
          return NextResponse.next();
    }
}

export const config = {
    matcher: [
          "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
        ],
};
