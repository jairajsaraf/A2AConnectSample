import { NextResponse } from 'next/server';
import { getGAReviewQueue, getSheetData, rowsToObjects, SHEETS } from '@/lib/googleSheets';

// GET - Fetch GA review queue items
export async function GET() {
  try {
    // Get items needing review from GA_Review_Queue
    const reviewQueue = await getGAReviewQueue();
    
    // Also get registrations that need review
    const registrationRows = await getSheetData(SHEETS.EVENT_REGISTRATIONS);
    const registrations = rowsToObjects<{
      registration_id: string;
      student_name: string;
      student_email: string;
      event_name: string;
      needs_review: string;
      review_status: string;
      validation_flags: string;
      risk_score: string;
    }>(registrationRows);

    const pendingReviews = registrations.filter(
      r => r.needs_review === 'true' || r.review_status === 'Pending'
    );
    
    return NextResponse.json({
      success: true,
      data: {
        reviewQueue,
        pendingRegistrations: pendingReviews,
        totalPending: reviewQueue.length + pendingReviews.length,
      },
    });
  } catch (error) {
    console.error('Error fetching GA review queue:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review queue' },
      { status: 500 }
    );
  }
}
