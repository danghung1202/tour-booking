import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export const authService = {
  /**
   * Registers a new user with Supabase.
   */
  async register(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
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
    const { data, error } = await supabase.auth.signInWithPassword({
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase logout error:", error);
    }
    return { error };
  },

  /**
   * Gets the current user from Supabase.
   */
  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }
    return data.user;
  },

  /**
   * Gets the current session from Supabase.
   */
  async getSession(): Promise<Session | null> {
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
   * Gets the current user's role from the profiles table.
   */
  async getUserRole(): Promise<string | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return data?.role || null;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  },

  /**
   * Updates the current user's password in Supabase.
   */
  async updatePassword(newPassword: string): Promise<{ error: any }> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) {
      console.error("Supabase password update error:", error);
    }
    return { error };
  }
};
