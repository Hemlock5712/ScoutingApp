import { json } from '@sveltejs/kit';
import { EVENT_NAME } from '$env/static/private';

export async function GET() {
	return json({ activeEvent: EVENT_NAME });
}
