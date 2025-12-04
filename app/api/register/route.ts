import { NextRequest, NextResponse } from 'next/server';
import { createRegistration, createMentorshipRequest } from '@/lib/googleSheets';
import { triggerRegistrationWorkflow, triggerMentorshipWorkflow } from '@/lib/n8nWebhook';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['event_name', 'student_name', 'student_email', 'major_program', 'grad_year'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create registration in Google Sheets
    const registration = await createRegistration({
      event_name: body.event_name,
      student_name: body.student_name,
      student_email: body.student_email,
      major_program: body.major_program,
      grad_year: body.grad_year,
      interests: body.interests || '',
      wants_mentor: body.wants_mentor || 'No',
      mentor_preferences: body.mentor_preferences,
    });

    // Trigger n8n workflow for processing (validation, emails, etc.)
    const n8nResult = await triggerRegistrationWorkflow({
      timestamp: registration.timestamp,
      event_name: body.event_name,
      student_name: body.student_name,
      student_email: body.student_email,
      major_program: body.major_program,
      grad_year: body.grad_year,
      interests: body.interests || '',
      wants_mentor: body.wants_mentor || 'No',
      mentor_preferences: body.mentor_preferences,
    });

    // If user wants a mentor, also create mentorship request
    if (body.wants_mentor === 'Yes' && body.interests) {
      await createMentorshipRequest({
        student_email: body.student_email,
        interest_industry: body.interests,
        career_goal: body.mentor_preferences,
      });

      // Trigger mentorship matching workflow
      await triggerMentorshipWorkflow({
        student_email: body.student_email,
        interest_industry: body.interests,
        career_goal: body.mentor_preferences,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        registrationId: registration.registrationId,
        n8nTriggered: n8nResult.success,
      },
    });
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create registration' },
      { status: 500 }
    );
  }
}
