import { json } from '@sveltejs/kit';
import { getEventMatches } from '../../../../lib/data/db';

export async function GET() {
	const matches = await getEventMatches();
	return json(matches);
}
