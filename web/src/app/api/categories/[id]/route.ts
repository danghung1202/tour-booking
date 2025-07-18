import { NextResponse } from 'next/server';
import { categoryService } from '@/services/categoryService';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await categoryService.getById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
} 