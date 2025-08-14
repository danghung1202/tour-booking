import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { AuthenticatedUser } from '@/types/database.types';
import type { Profile } from '@/types/database.types';

export class UserService {
  private supabase: SupabaseClient<any, "app", any>;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
  }

  async getUserProfile(user: User | null): Promise<AuthenticatedUser | null> {
    if (!user) return null;

    try {
      const { data: profile, error: profileError } = await this.supabase
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
        return { ...user, ...defaultProfile, name: defaultProfile.name! } as AuthenticatedUser;
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
  }

  /**
   * Gets the current user's role from the profiles table.
   */
  async getUserRole(user: User | null): Promise<string | null> {
    if (!user) return null;

    try {
      const { data, error } = await this.supabase
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
  }
}
