import { google } from 'googleapis';

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Sheet names from your n8n workflows
export const SHEETS = {
  USERS: 'Users',
  EVENTS: 'Events',  // ← MAKE SURE THIS IS HERE
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

// ============================================
// USER AUTHENTICATION FUNCTIONS
// ============================================

export interface User {
  user_id: string;
  email: string;
  password_hash: string;
  name: string;
  major_program: string;
  grad_year: string;
  role: string;
  created_at: string;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const rows = await getSheetData(SHEETS.USERS);
    const users = rowsToObjects<User>(rows);
    
    const user = users.find(
      u => u.email?.toLowerCase() === email.toLowerCase()
    );
    
    return user || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

// Create new user
export async function createUser(userData: {
  email: string;
  password_hash: string;
  name: string;
  major_program?: string;
  grad_year?: string;
  role?: string;
}) {
  const userId = `USER-${Date.now()}`;
  const timestamp = new Date().toISOString();

  const values = [[
    userId,                           // user_id
    userData.email,                   // email
    userData.password_hash,           // password_hash
    userData.name,                    // name
    userData.major_program || '',     // major_program
    userData.grad_year || '',         // grad_year
    userData.role || 'student',       // role
    timestamp,                        // created_at
  ]];

  await appendToSheet(SHEETS.USERS, values);
  
  return { userId, timestamp };
}

// ============================================
// EVENT FUNCTIONS
// ============================================

// Get events (you may need to create an Events sheet or derive from registrations)
// Get all events from Events sheet
export async function getEvents() {
  try {
    const rows = await getSheetData(SHEETS.EVENTS);
    
    if (rows.length < 2) {
      return [];
    }

    const events = rowsToObjects<{
      event_id: string;
      name: string;
      type: string;
      date_time: string;
      location: string;
      capacity: string;
      description: string;
      target_audience: string;
    }>(rows);

    // Get registration counts from Event_Registrations sheet
    const regRows = await getSheetData(SHEETS.EVENT_REGISTRATIONS);
    const registrations = rowsToObjects<{
      event_id: string;
    }>(regRows);

    // Count registrations per event
    const registrationCounts = new Map<string, number>();
    registrations.forEach(reg => {
      const count = registrationCounts.get(reg.event_id) || 0;
      registrationCounts.set(reg.event_id, count + 1);
    });

    // Map events to the format expected by the frontend
    return events.map(event => ({
      event_id: event.event_id,
      event_name: event.name,
      event_date: event.date_time,
      description: event.description,
      capacity: parseInt(event.capacity) || 100,
      registered_count: registrationCounts.get(event.event_id) || 0,
    }));
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
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
    registration_id: string;
    student_name: string;
    student_email: string;
    event_name: string;
    major_program: string;
    grad_year: string;
    interests: string;
    needs_review: string;
    approved: string;
    review_notes: string;
    reviewed_at: string;
    processed: string;
  }>(rows);
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
  const registrationId = `ER-${data.student_name}-${Date.now()}`;

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