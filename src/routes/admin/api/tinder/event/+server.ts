import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEventMatches } from '$lib/data/db';
import { calculateEventStatistics } from '$lib/stats/teamStats';

export const GET: RequestHandler = async ({ params }) => {
	console.log(params);

	const matches = await getEventMatches();
	const eventStats = calculateEventStatistics(matches);

	return json(eventStats);
};
