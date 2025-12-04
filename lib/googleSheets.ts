import { google } from 'googleapis';

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Sheet names from your n8n workflows
export const SHEETS = {
  EVENT_REGISTRATIONS: 'Event_Registrations',
  MENTORSHIP_REQUESTS: 'Mentorship_Requests',
  MENTORS: 'Mentors',
  GA_REVIEW_QUEUE: 'GA_Review_Queue',
  FORM_RESPONSES: 'Form Responses 1',
} as const;

// Initialize Google Sheets client
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Generic function to get all rows from a sheet
export async function getSheetData(sheetName: string): Promise<string[][]> {
  const sheets = await getGoogleSheetsClient();
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: sheetName,
  });

  return response.data.values || [];
}

// Convert sheet rows to objects using header row
export function rowsToObjects<T>(rows: string[][]): T[] {
  if (rows.length < 2) return [];
  
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj as T;
  });
}

// Get events (you may need to create an Events sheet or derive from registrations)
export async function getEvents() {
  const rows = await getSheetData(SHEETS.EVENT_REGISTRATIONS);
  const registrations = rowsToObjects<{
    event_name: string;
    event_id: string;
  }>(rows);

  // Get unique events with count
  const eventMap = new Map<string, { event_id: string; event_name: string; registered_count: number }>();
  
  registrations.forEach(reg => {
    const key = reg.event_name;
    if (eventMap.has(key)) {
      eventMap.get(key)!.registered_count++;
    } else {
      eventMap.set(key, {
        event_id: reg.event_id || `EVT-${key.replace(/\s+/g, '-')}`,
        event_name: reg.event_name,
        registered_count: 1,
      });
    }
  });

  return Array.from(eventMap.values()).map(event => ({
    ...event,
    event_date: '2025-12-15', // You may want to add this to your sheet
    description: `${event.event_name} event`,
    capacity: 100, // You may want to add this to your sheet
  }));
}

// Get registrations for a specific user
export async function getUserRegistrations(userEmail: string) {
  const rows = await getSheetData(SHEETS.EVENT_REGISTRATIONS);
  const allRegistrations = rowsToObjects<{
    registration_id: string;
    time_stamp: string;
    event_name: string;
    event_id: string;
    student_name: string;
    student_email: string;
    major_program: string;
    grad_year: string;
    interests: string;
    wants_mentor: string;
    mentor_preferences: string;
    needs_review: string;
    review_status: string;
    status: string;
    email_sent: string;
  }>(rows);

  return allRegistrations.filter(
    reg => reg.student_email?.toLowerCase() === userEmail.toLowerCase()
  );
}

// Get mentorship request status for a user
export async function getMentorshipStatus(userEmail: string) {
  const rows = await getSheetData(SHEETS.MENTORSHIP_REQUESTS);
  const requests = rowsToObjects<{
    request_id: string;
    student_email: string;
    interest_industry: string;
    career_goal: string;
    status: string;
    matched_mentor_id: string;
    suggested_mentor: string;
    created_at: string;
  }>(rows);

  return requests.find(
    req => req.student_email?.toLowerCase() === userEmail.toLowerCase()
  );
}

// Get all mentors
export async function getMentors() {
  const rows = await getSheetData(SHEETS.MENTORS);
  return rowsToObjects<{
    mentor_id: string;
    mentor_name: string;
    email: string;
    industry: string;
    company: string;
    role: string;
    capacity: string;
    current_mentees_count: string;
  }>(rows);
}

// Get GA review queue items
export async function getGAReviewQueue() {
  const rows = await getSheetData(SHEETS.GA_REVIEW_QUEUE);
  return rowsToObjects<{
    type: string;
    request_id: string;
    student_email: string;
    interest_industry: string;
    reason: string;
    created_at: string;
  }>(rows);
}

// Append a new row to a sheet
export async function appendToSheet(sheetName: string, values: string[][]) {
  const sheets = await getGoogleSheetsClient();
  
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });

  return response.data;
}

// Create a new registration
export async function createRegistration(data: {
  event_name: string;
  student_name: string;
  student_email: string;
  major_program: string;
  grad_year: string;
  interests: string;
  wants_mentor: string;
  mentor_preferences?: string;
}) {
  const timestamp = new Date().toISOString();
  const registrationId = `ER-${data.student_name}${timestamp}`;

  const values = [[
    registrationId,           // registration_id
    timestamp,                // time_stamp
    data.event_name,          // event_name
    '',                       // event_id
    data.student_name,        // student_name
    data.student_email,       // student_email
    data.major_program,       // major_program
    data.grad_year,           // grad_year
    data.interests,           // interests
    data.wants_mentor,        // wants_mentor
    data.mentor_preferences || '', // mentor_preferences
    '',                       // entry_number
    'false',                  // needs_review
    'Pending',                // review_status
    'Registered',             // status
    'false',                  // email_sent
    timestamp,                // processed
    '',                       // validation_flags
    '0',                      // risk_score
  ]];

  await appendToSheet(SHEETS.EVENT_REGISTRATIONS, values);
  
  return { registrationId, timestamp };
}

// Create a mentorship request
export async function createMentorshipRequest(data: {
  student_email: string;
  interest_industry: string;
  career_goal?: string;
}) {
  const timestamp = new Date().toISOString();
  const requestId = `MR-${data.student_email}`;

  const values = [[
    requestId,                // request_id
    '',                       // student_id
    data.student_email,       // student_email
    data.interest_industry,   // interest_industry
    data.career_goal || '',   // career_goal
    '',                       // skills_to_develop
    '',                       // target_companies
    '',                       // matched_mentor_id
    'New',                    // status
    timestamp,                // created_at
    '',                       // email_sent_at
    '',                       // suggested_mentor
    '',                       // match_score
  ]];

  await appendToSheet(SHEETS.MENTORSHIP_REQUESTS, values);
  
  return { requestId, timestamp };
}
