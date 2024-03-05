import { openDB } from 'idb';
import type { AutonomousState, TeleopState } from '../game';

export type MatchStorage = {
	matchKey: string;
	teamNumber: string;
	matchNumber: string;
	scouterName: string;
	autonomous: AutonomousState;
	teleop: TeleopState;
};

async function useDB() {
	return await openDB('scoutedMatch', 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('match2024')) {
				console.log('Creating new 2024 object store...');
				db.createObjectStore('match2024', { keyPath: 'matchKey' });
			}
		}
	});
}

export async function addMatchToStore({
	teamNumber,
	matchNumber,
	scouterName,
	autonomous,
	teleop
}: {
	teamNumber: string;
	matchNumber: string;
	scouterName: string;
	autonomous: AutonomousState;
	teleop: TeleopState;
}) {
	if (matchNumber === '-1') {
		console.warn('No match number set, ignoring this match.');
		return;
	}
	const db = await useDB();

	const matchData = {
		matchKey: `${teamNumber}-${matchNumber}`,
		teamNumber,
		matchNumber,
		scouterName,
		autonomous,
		teleop
	};

	console.log('Adding match to store:', matchData);

	await db.add('match2024', matchData);
}

export async function getMatchFromStore(matchKey: string) {
	const db = await useDB();

	return (await db.get('match2024', matchKey)) as MatchStorage | undefined;
}

export async function getAllMatchesFromStore() {
	const db = await useDB();

	return (await db.getAll('match2024')) as MatchStorage[];
}

export async function deleteMatchFromStore(matchKey: string) {
	const db = await useDB();

	await db.delete('match2024', matchKey);
}

export async function clearStore() {
	const db = await useDB();

	await db.clear('match2024');
}
