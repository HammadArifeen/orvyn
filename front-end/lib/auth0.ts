import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Auth0 Client - lazily initialized to prevent build-time crashes
 * when environment variables are not yet configured (e.g., Vercel builds).
 */
function createAuth0Client() {
      if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET) {
              return {
                        middleware: async () => {
                                    const { NextResponse } = await import("next/server");
                                    return NextResponse.next();
                        },
                        getSession: async () => null,
                        handleAuth: () => async () => new Response("Auth not configured", { status: 503 }),
              } as unknown as Auth0Client;
      }

  return new Auth0Client({
          authorizationParameters: {
                    scope: process.env.AUTH0_SCOPE || "openid profile email",
                    audience: process.env.AUTH0_AUDIENCE,
          },
          enableConnectAccountEndpoint: true,
  });
}

export const auth0 = createAuth0Client();
