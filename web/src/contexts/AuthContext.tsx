"use client";

import type { AuthenticatedUser } from "@/types/database.types";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/authService";

interface AuthContextType {
  user: AuthenticatedUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The onAuthStateChange listener handles both the initial session check
    // and any subsequent auth changes. This avoids a redundant initial fetch.
    const { data: authListener } = authService.onAuthStateChange(async (_event, session) => {
      if (session) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      // The first listener event tells us the initial auth state is resolved.
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}