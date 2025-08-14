import { createClient } from '@/lib/supabase/server';
import type { AuthenticatedUser } from '@/types/database.types';
import type { Session } from '@supabase/supabase-js';
import { userService } from './userService';

// Server-side service for authentication operations
export const authServerService = {
  /**
   * Gets the current user from Supabase, combined with their profile information.
   */
  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return null;
    }
    return await userService.getUserProfile(user);
  },

  /**
   * Gets the current session from Supabase.
   */
  async getSession(): Promise<Session | null> {
    const supabase = await createClient();
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
  async updatePassword(newPassword: string): Promise<{ error: any; }> {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) {
      console.error("Supabase password update error:", error);
    }
    return { error };
  }
};
