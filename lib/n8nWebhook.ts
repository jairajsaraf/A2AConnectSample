// n8n Webhook Trigger Service
// This allows the Next.js app to trigger n8n workflows directly

const N8N_REGISTER_WEBHOOK = process.env.N8N_REGISTER_WEBHOOK;
const N8N_MENTORSHIP_WEBHOOK = process.env.N8N_MENTORSHIP_WEBHOOK;

interface RegistrationPayload {
  timestamp: string;
  event_name: string;
  student_name: string;
  student_email: string;
  major_program: string;
  grad_year: string;
  interests: string;
  wants_mentor: string;
  mentor_preferences?: string;
}

interface MentorshipPayload {
  student_email: string;
  interest_industry: string;
  career_goal?: string;
  skills_to_develop?: string;
  target_companies?: string;
}

// Trigger the registration workflow in n8n
export async function triggerRegistrationWorkflow(data: RegistrationPayload) {
  if (!N8N_REGISTER_WEBHOOK) {
    console.warn('N8N_REGISTER_WEBHOOK not configured - skipping webhook trigger');
    return { success: false, reason: 'Webhook not configured' };
  }

  try {
    const response = await fetch(N8N_REGISTER_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Map to the format your n8n workflow expects (matching Google Form fields)
        'Timestamp': data.timestamp,
        'Which event are you registering for?': data.event_name,
        'Full Name': data.student_name,
        'TAMU Email': data.student_email,
        'Program / Major': data.major_program,
        'Graduation Year': data.grad_year,
        'What are your main career interests?': data.interests,
        'Would you like to be considered for a mentor match?': data.wants_mentor,
        'If yes, what kind of mentor would you like?': data.mentor_preferences || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));
    return { success: true, result };
  } catch (error) {
    console.error('Failed to trigger n8n registration workflow:', error);
    return { success: false, error: String(error) };
  }
}

// Trigger the mentorship matching workflow in n8n
export async function triggerMentorshipWorkflow(data: MentorshipPayload) {
  if (!N8N_MENTORSHIP_WEBHOOK) {
    console.warn('N8N_MENTORSHIP_WEBHOOK not configured - skipping webhook trigger');
    return { success: false, reason: 'Webhook not configured' };
  }

  try {
    const response = await fetch(N8N_MENTORSHIP_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_email: data.student_email,
        interest_industry: data.interest_industry,
        career_goal: data.career_goal || '',
        skills_to_develop: data.skills_to_develop || '',
        target_companies: data.target_companies || '',
        status: 'New',
        created_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));
    return { success: true, result };
  } catch (error) {
    console.error('Failed to trigger n8n mentorship workflow:', error);
    return { success: false, error: String(error) };
  }
}

// Generic webhook trigger for custom workflows
export async function triggerN8nWebhook(webhookUrl: string, payload: Record<string, unknown>) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook returned ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));
    return { success: true, result };
  } catch (error) {
    console.error('Failed to trigger n8n webhook:', error);
    return { success: false, error: String(error) };
  }
}
