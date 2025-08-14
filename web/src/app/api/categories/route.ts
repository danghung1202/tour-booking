import { NextResponse } from 'next/server';
import { CategoryService } from '@/services/categoryService';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  try {
    const categoryService = new CategoryService(supabase);
    const categories = await categoryService.getAll();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 