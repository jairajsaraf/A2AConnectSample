import { NextResponse } from 'next/server';
import { getMentorshipStatus } from '@/lib/googleSheets';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Email is required' },
      { status: 400 }
    );
  }

  try {
    const request = await getMentorshipStatus(email);

    // request will be null if there is no mentorship row for this email
    return NextResponse.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching mentorship status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch mentorship status' },
      { status: 500 }
    );
  }
}
