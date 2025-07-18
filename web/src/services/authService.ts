import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthenticatedUser } from '@/types/database.types';
import type { Profile } from '@/types/database.types';

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
   * Gets the current user from Supabase, combined with their profile information.
   */
  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      if (authError) console.error("Error fetching auth user:", authError);
      return null;
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.warn("User profile not found, returning auth data only.", profileError);
        // Create a default profile structure if none exists
        const defaultProfile: Profile = {
          id: user.id,
          role: 'tourist',
          name: user.email || 'New User',
          bio: null,
          phone: undefined,
          photo_url: null,
          created_at: new Date().toISOString(),
          updated_at: null,
        };
        return { ...user, ...defaultProfile, name: defaultProfile.name! };
      }

      // Merge auth user and profile data
      return {
        ...user,
        ...profile,
        // Ensure 'name' is never null, falling back to email
        name: profile.name || user.email || 'New User',
      };
    } catch (error) {
      console.error("Unexpected error fetching user profile:", error);
      return null;
    }
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
  },

  /**
   * Listens for authentication state changes.
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
