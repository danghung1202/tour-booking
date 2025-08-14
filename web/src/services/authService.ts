import type { AuthenticatedUser } from '@/types/database.types';
import type { User, Session, SupabaseClient } from '@supabase/supabase-js';
import { UserService } from './userService';

export class AuthService {
  private supabase: SupabaseClient<any, "app", any>;
  private userService: UserService;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
    this.userService = new UserService(supabaseClient);
  }

  /**
   * Gets the current user from Supabase, combined with their profile information.
   */
  async getCurrentUser(): Promise<AuthenticatedUser | null> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();

      if (authError || !user) {
        return null;
      }
      return await this.userService.getUserProfile(user);
    } catch (err) {
      console.error("Unexpected error fetching current user:", err);
      return null;
    }
  }

  /**
   * Registers a new user with Supabase.
   */
  async register(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Supabase registration error:", error);
      } else {
        console.log("Supabase registration successful:", data);
      }

      return { ...data, error };
    } catch (err) {
      console.error("Unexpected error during registration:", err);
      return { user: null, session: null, error: err };
    }
  }

  /**
   * Logs a user in with Supabase.
   */
  async login(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase login error:", error);
      } else {
        console.log("Supabase login successful:", data);
      }

      return { ...data, error };
    } catch (err) {
      console.error("Unexpected error during login:", err);
      return { user: null, session: null, error: err };
    }
  }

  /**
   * Logs the current user out.
   */
  async logout(): Promise<{ error: any }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        console.error("Supabase logout error:", error);
      }
      return { error };
    } catch (err) {
      console.error("Unexpected error during logout:", err);
      return { error: err };
    }
  }

  /**
   * Gets the current session from Supabase.
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return null;
      }
      return data.session;
    } catch (err) {
      console.error("Unexpected error fetching session:", err);
      return null;
    }
  }

  /**
   * Checks if a user is currently authenticated.
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  /**
   * Updates the current user's password in Supabase.
   */
  async updatePassword(newPassword: string): Promise<{ error: any }> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword
      });
      if (error) {
        console.error("Supabase password update error:", error);
      }
      return { error };
    } catch (err) {
      console.error("Unexpected error updating password:", err);
      return { error: err };
    }
  }

  /**
   * Listens for authentication state changes.
   */
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}
