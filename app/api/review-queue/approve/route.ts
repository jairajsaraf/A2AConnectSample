import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registration_id, approved } = body;

    if (!registration_id || approved === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sheets = await getGoogleSheetsClient();

    // Get all registrations from the Event_Registrations sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Event_Registrations',
    });

    const rows = response.data.values || [];
    if (rows.length < 2) {
      return NextResponse.json(
        { success: false, error: 'No registrations found' },
        { status: 404 }
      );
    }

    // Find the row index for the registration_id
    const headers = rows[0];
    const registrationIdIndex = headers.indexOf('registration_id');
    const approvedIndex = headers.indexOf('approved');

    if (registrationIdIndex === -1 || approvedIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Invalid sheet structure' },
        { status: 500 }
      );
    }

    // Find the row with the matching registration_id
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][registrationIdIndex] === registration_id) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Registration not found' },
        { status: 404 }
      );
    }

    // Update the approved column
    const sheetRowNumber = rowIndex + 1;
    const columnLetter = String.fromCharCode(65 + approvedIndex);
    const range = 'Event_Registrations!' + columnLetter + sheetRowNumber;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[approved ? 'TRUE' : 'FALSE']],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration ' + (approved ? 'approved' : 'rejected') + ' successfully',
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update approval status' },
      { status: 500 }
    );
  }
}
