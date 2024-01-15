import { json } from '@sveltejs/kit';
import { getEventMatches, simplifyMatches } from '$lib/data/tba';
import { EVENT_NAME } from '$env/static/private';

export async function GET() {
	const matches = await getEventMatches(EVENT_NAME);

	const simpleMatches = await simplifyMatches(matches);

	return json(simpleMatches);
}
