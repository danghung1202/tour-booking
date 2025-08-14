import { createClient } from '@/lib/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Language {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export class LanguageService {
  private supabase: SupabaseClient<any, "app", any>;

  constructor(supabaseClient: SupabaseClient<any, "app", any>) {
    this.supabase = supabaseClient;
  }

  /**
   * Fetches all available languages from the database
   * @returns Array of Language objects
   */
  async getAllLanguages(): Promise<Language[]> {
    try {
      const { data, error } = await this.supabase
        .from('languages')
        .select('id, name, code, created_at')
        .order('name');
      
      if (error) {
        console.error('Error fetching languages:', error);
        return [];
      }
      
      return data as Language[];
    } catch (error) {
      console.error('Unexpected error fetching languages:', error);
      return [];
    }
  }

  /**
   * Get languages formatted for use in form select components
   * @returns Array of objects with label and value properties
   */
  async getLanguagesForSelect() {
    const languages = await this.getAllLanguages();
    
    return languages.map(lang => ({
      label: lang.name,
      value: lang.id
    }));
  }
} 