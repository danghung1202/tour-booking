"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClientService } from "@/services/authClientService";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // The onAuthStateChange listener handles both the initial session check
    // and any subsequent auth changes. This avoids a redundant initial fetch.
    const { data: authListener } = authClientService.onAuthStateChange(async (_event, session) => {
      if (session) {
        const currentUser = await authClientService.getCurrentUser();
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