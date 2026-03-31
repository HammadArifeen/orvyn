"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/**
 * Auth0 Authentication Context
 *
 * Provides user authentication state throughout the app.
 * Works with the Auth0 Next.js SDK's server-side session management.
 */

interface User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
  nickname?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginUrl: string;
  logoutUrl: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  loginUrl: "/api/auth/login",
  logoutUrl: "/api/auth/logout",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch {
        // Not authenticated
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        loginUrl: "/api/auth/login",
        logoutUrl: "/api/auth/logout",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
