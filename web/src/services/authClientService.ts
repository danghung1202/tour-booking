import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthenticatedUser } from '@/types/database.types';

// Client-side service for authentication operations
export const authClientService = {
  /**
   * Registers a new user with Supabase.
   */
  async register(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Supabase registration error:", error);
    } else {
      console.log("Supabase registration successful:", data);
    }

    return { ...data, error };
  },

  /**
   * Logs a user in with Supabase.
   */
  async login(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
    const supabaseAuth = createClient();

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase login error:", error);
    } else {
      console.log("Supabase login successful:", data);
    }

    return { ...data, error };
  },

  /**
   * Logs the current user out.
   */
  async logout(): Promise<{ error: any }> {
    const supabaseAuth = createClient();
    const { error } = await supabaseAuth.auth.signOut();
    if (error) {
      console.error("Supabase logout error:", error);
    }
    return { error };
  },

  /**
   * Gets the current user from Supabase, combined with their profile information.
   */
  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      if (authError) console.error("Error fetching auth user:", authError);
      return null;
    }
    return user;
  },

  /**
   * Gets the current session from Supabase.
   */
  async getSession(): Promise<Session | null> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return null;
    }
    return data.session;
  },

  /**
   * Checks if a user is currently authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  },

  /**
   * Updates the current user's password in Supabase.
   */
  async updatePassword(newPassword: string): Promise<{ error: any }> {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) {
      console.error("Supabase password update error:", error);
    }
    return { error };
  },

  /**
   * Listens for authentication state changes.
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const supabase = createClient();
    return supabase.auth.onAuthStateChange(callback);
  }
};


