import { google } from 'googleapis';
import { getGCPCredentials } from './gcp';

import { SHEET_ID } from '$env/static/private';

const credentials = getGCPCredentials();

const authenticate = () => {
	const jwt = new google.auth.JWT(
		credentials.credentials?.client_email,
		undefined,
		credentials.credentials?.private_key,
		['https://www.googleapis.com/auth/spreadsheets']
	);
	return jwt;
};

const spreadsheetID = SHEET_ID;

const sheets = google.sheets({ version: 'v4', auth: authenticate() });

export const getData = async (range: string) => {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: spreadsheetID,
		range: range
	});
	return res.data;
};

export const writeRow = async (range: string, values: string[]) => {
	await sheets.spreadsheets.values.append({
		spreadsheetId: spreadsheetID,
		range: range,
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
		requestBody: {
			majorDimension: 'ROWS',
			values: [values]
		}
	});
};
