import { auth0 } from "@/lib/auth0";

/**
 * Auth0 Dynamic Route Handler
 *
 * Handles all Auth0 authentication routes:
 * - /api/auth/login - Initiates login flow
 * - /api/auth/callback - Handles OAuth callback
 * - /api/auth/logout - Handles logout
 * - /api/auth/me - Returns user profile
 * - /api/auth/connect/:connection - Initiates account linking (Token Vault)
 */

export const GET = auth0.handleAuth();
