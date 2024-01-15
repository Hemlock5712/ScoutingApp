import fetch from 'node-fetch';
import { TBA_KEY } from '$env/static/private';
import z from 'zod';

const BASE_URL = 'https://www.thebluealliance.com/api/v3';

const EventMatches = z.array(
	z.object({
		key: z.string(),
		comp_level: z.string(),
		set_number: z.number(),
		match_number: z.number(),
		alliances: z.object({
			red: z.object({
				score: z.number(),
				team_keys: z.array(z.string()),
				surrogate_team_keys: z.array(z.string()),
				dq_team_keys: z.array(z.string())
			}),
			blue: z.object({
				score: z.number(),
				team_keys: z.array(z.string()),
				surrogate_team_keys: z.array(z.string()),
				dq_team_keys: z.array(z.string())
			})
		}),
		winning_alliance: z.string(),
		event_key: z.string(),
		time: z.number(),
		predicted_time: z.number(),
		actual_time: z.number()
	})
);

type EventMatches = z.infer<typeof EventMatches>;

export const getEventMatches = async (eventKey: string): Promise<EventMatches> => {
	const response = await fetch(`${BASE_URL}/event/${eventKey}/matches/simple`, {
		headers: {
			'X-TBA-Auth-Key': TBA_KEY
		}
	});
	const data = await response.json();
	return EventMatches.parse(data);
};

export type SimpleMatch = {
	match_number: number;
	red: string[];
	blue: string[];
};

export const simplifyMatches = (matches: EventMatches) => {
	return matches
		.filter((m) => m.comp_level === 'qm')
		.map((match) => ({
			match_number: match.match_number,
			red: match.alliances.red.team_keys.map((t) => t.slice(3)),
			blue: match.alliances.blue.team_keys.map((t) => t.slice(3))
		}));
};
