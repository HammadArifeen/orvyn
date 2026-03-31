import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE || "openid profile email",
    audience: process.env.AUTH0_AUDIENCE,
  },
  // Enable the connect account endpoint for linked accounts
  // This allows agents to access third-party APIs on behalf of users
  enableConnectAccountEndpoint: true,
});
