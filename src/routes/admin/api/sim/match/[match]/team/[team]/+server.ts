import { json } from '@sveltejs/kit';
import { EventSimulator } from '$lib/data/simulate/eventSimulate';

export async function GET({ params }) {
	const team = params.team;
	const match = params.match;

	const eventSimulator = new EventSimulator();

	const randomRobot = eventSimulator.generateEventTeam(parseInt(team));

	const simulatedMatch = eventSimulator.simulateMatchForTeam(randomRobot, match);

	return json(simulatedMatch);
}
