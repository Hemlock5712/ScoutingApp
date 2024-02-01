import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getTeamMatches } from '$lib/data/db';
import { calculateTeamStatistics } from '$lib/stats/teamStats';
import { getTeam, getTeamMedia } from '$lib/data/tba';

export const GET: RequestHandler = async ({ params }) => {
	console.log(params);

	const teamPromise = getTeam(params.team);
	const matchesPromise = getTeamMatches(params.team);
	const teamMedia = getTeamMedia(params.team);
	const team = await teamPromise;
	const matches = await matchesPromise;
	const media = await teamMedia;
	const teamStats = calculateTeamStatistics(
		team.team_number.toString(),
		team.nickname,
		media.length === 0
			? 'https://i.imgur.com/oB16o0vh.jpg'
			: media.find((m) => m.preferred)?.direct_url ?? media[0].direct_url,
		matches
	);

	return json(teamStats);
};
