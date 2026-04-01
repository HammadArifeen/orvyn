import { NextResponse } from "next/server";

/**
 * Auth0 v4 Dynamic Route Handler
 *
 * In @auth0/nextjs-auth0 v4, auth routes are handled automatically
 * by the middleware at /auth/* paths. This catch-all route redirects
 * legacy /api/auth/* requests to the new /auth/* paths for backwards
 * compatibility.
 */
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ auth0: string }> }
) => {
  const { auth0 } = await params;
  const url = new URL(request.url);
  // Redirect /api/auth/login -> /auth/login, etc.
  return NextResponse.redirect(new URL(`/auth/${auth0}`, url.origin));
};
