import { NextRequest, NextResponse } from 'next/server';
import { getMentorshipStatus, getMentors, createMentorshipRequest } from '@/lib/googleSheets';
import { triggerMentorshipWorkflow } from '@/lib/n8nWebhook';

// GET - Fetch mentorship status for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get('email');
    
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const mentorshipStatus = await getMentorshipStatus(userEmail);
    const mentors = await getMentors();

    // Get matched mentor details if there's a match
    let matchedMentor = null;
    if (mentorshipStatus?.matched_mentor_id) {
      matchedMentor = mentors.find(m => m.mentor_id === mentorshipStatus.matched_mentor_id);
    }
    
    return NextResponse.json({
      success: true,
      data: {
        request: mentorshipStatus || null,
        matchedMentor,
        availableIndustries: [...new Set(mentors.map(m => m.industry))],
      },
    });
  } catch (error) {
    console.error('Error fetching mentorship status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mentorship status' },
      { status: 500 }
    );
  }
}

// POST - Create a new mentorship request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.student_email || !body.interest_industry) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: student_email, interest_industry' },
        { status: 400 }
      );
    }

    // Check if user already has a pending request
    const existingRequest = await getMentorshipStatus(body.student_email);
    if (existingRequest && existingRequest.status !== 'Declined') {
      return NextResponse.json(
        { success: false, error: 'You already have an active mentorship request' },
        { status: 400 }
      );
    }

    // Create mentorship request in Google Sheets
    const result = await createMentorshipRequest({
      student_email: body.student_email,
      interest_industry: body.interest_industry,
      career_goal: body.career_goal,
    });

    // Trigger n8n workflow for matching
    const n8nResult = await triggerMentorshipWorkflow({
      student_email: body.student_email,
      interest_industry: body.interest_industry,
      career_goal: body.career_goal,
      skills_to_develop: body.skills_to_develop,
      target_companies: body.target_companies,
    });

    return NextResponse.json({
      success: true,
      data: {
        requestId: result.requestId,
        n8nTriggered: n8nResult.success,
      },
    });
  } catch (error) {
    console.error('Error creating mentorship request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create mentorship request' },
      { status: 500 }
    );
  }
}
