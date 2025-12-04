import { NextRequest, NextResponse } from 'next/server';
import { getUserRegistrations } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    // Get user email from query params or session
    // In production, you'd get this from your auth system
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get('email');
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const registrations = await getUserRegistrations(userEmail);
    
    return NextResponse.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
