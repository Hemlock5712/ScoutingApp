import { error, json } from '@sveltejs/kit';
import { EventSimulator, type Robot } from '$lib/data/simulate/eventSimulate';
import { getEventMatches, simplifyMatches } from '$lib/data/tba';
import { EVENT_NAME } from '$env/static/private';
import { writeBulkMatches, writeData } from '$lib/data/writeData';

export async function GET({ params, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (session === null) {
		throw error(401, { message: 'You must be logged in to upload a match' });
	}
	if (!usersWhoCanUpload.includes(session.user.id)) {
		throw error(403, { message: 'You are not authorized to upload a match' });
	}
	const matchList = await getEventMatches(EVENT_NAME);
	const matches = await simplifyMatches(matchList);

	matches.sort((a, b) => a.match_number - b.match_number);

	const teamListNotCleaned = matches.map((match) => match.red.concat(match.blue)).flat();
	const teams = [...new Set(teamListNotCleaned)];

	const teamRobots: { [key: number]: Robot } = {};

	const eventSimulator = new EventSimulator();

	for (const team of teams) {
		const randomRobot = eventSimulator.generateEventTeam(parseInt(team));
		teamRobots[parseInt(team)] = randomRobot;
	}

	const simulatedMatches = [];

	for (const match of matches) {
		const redTeams = match.red;
		const blueTeams = match.blue;
		const red1 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[0])],
			match.match_number + ''
		);
		const red2 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[1])],
			match.match_number + ''
		);
		const red3 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[2])],
			match.match_number + ''
		);
		const blue1 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[0])],
			match.match_number + ''
		);
		const blue2 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[1])],
			match.match_number + ''
		);
		const blue3 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[2])],
			match.match_number + ''
		);
		simulatedMatches.push(red1);
		simulatedMatches.push(red2);
		simulatedMatches.push(red3);
		simulatedMatches.push(blue1);
		simulatedMatches.push(blue2);
		simulatedMatches.push(blue3);
	}

	return json(simulatedMatches);
}

const usersWhoCanUpload: string[] = ['757210db-4ca6-404b-ae58-4681246ae6fc'];

export async function POST({ locals: { supabase, getSession } }) {
	const session = await getSession();
	if (session === null) {
		throw error(401, { message: 'You must be logged in to upload a match' });
	}
	if (!usersWhoCanUpload.includes(session.user.id)) {
		throw error(403, { message: 'You are not authorized to upload a match' });
	}

	const matchList = await getEventMatches(EVENT_NAME);
	const matches = await simplifyMatches(matchList);

	matches.sort((a, b) => a.match_number - b.match_number);

	const teamListNotCleaned = matches.map((match) => match.red.concat(match.blue)).flat();
	const teams = [...new Set(teamListNotCleaned)];

	const teamRobots: { [key: number]: Robot } = {};

	const eventSimulator = new EventSimulator();

	for (const team of teams) {
		const randomRobot = eventSimulator.generateEventTeam(parseInt(team));
		teamRobots[parseInt(team)] = randomRobot;
	}

	const simulatedMatches = [];

	for (const match of matches) {
		const redTeams = match.red;
		const blueTeams = match.blue;
		const red1 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[0])],
			match.match_number + ''
		);
		const red2 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[1])],
			match.match_number + ''
		);
		const red3 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(redTeams[2])],
			match.match_number + ''
		);
		const blue1 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[0])],
			match.match_number + ''
		);
		const blue2 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[1])],
			match.match_number + ''
		);
		const blue3 = eventSimulator.simulateMatchForTeam(
			teamRobots[parseInt(blueTeams[2])],
			match.match_number + ''
		);
		simulatedMatches.push(red1);
		simulatedMatches.push(red2);
		simulatedMatches.push(red3);
		simulatedMatches.push(blue1);
		simulatedMatches.push(blue2);
		simulatedMatches.push(blue3);
	}

	writeBulkMatches(simulatedMatches);

	return json(simulatedMatches);
}
