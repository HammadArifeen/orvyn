import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

/**
 * GET /api/auth/me
 * Returns the current authenticated user's profile.
 * Used by AuthProvider to populate client-side auth context.
 */
export async function GET() {
    try {
          const session = await auth0.getSession();
          if (!session || !session.user) {
                  return NextResponse.json(null, { status: 401 });
          }
          return NextResponse.json(session.user);
    } catch {
          return NextResponse.json(null, { status: 401 });
    }
}
