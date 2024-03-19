import { openDB } from 'idb';
import type { AutonomousState, Intangibles, TeleopState } from '../game';

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

async function useScannerDB() {
	return await openDB('scannedMatch', 1, {
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
	teleop,
	intangibles,
	uploader = false
}: {
	teamNumber: string;
	matchNumber: string;
	scouterName: string;
	autonomous: AutonomousState;
	teleop: TeleopState;
	intangibles: Intangibles;
	uploader?: boolean;
}) {
	if (matchNumber === '-1') {
		console.warn('No match number set, ignoring this match.');
		return;
	}
	const db = uploader ? await useScannerDB() : await useDB();

	const matchData = {
		matchKey: `${teamNumber}-${matchNumber}`,
		teamNumber,
		matchNumber,
		scouterName,
		autonomous,
		teleop,
		intangibles
	};

	console.log('Adding match to store:', matchData);

	await db.add('match2024', matchData);
}

export async function getMatchFromStore(matchKey: string, uploader: boolean = false) {
	const db = uploader ? await useScannerDB() : await useDB();

	return (await db.get('match2024', matchKey)) as MatchStorage | undefined;
}

export async function getAllMatchesFromStore(uploader: boolean = false) {
	const db = uploader ? await useScannerDB() : await useDB();

	return (await db.getAll('match2024')) as MatchStorage[];
}

export async function deleteMatchFromStore(matchKey: string, uploader: boolean = false) {
	const db = uploader ? await useScannerDB() : await useDB();

	await db.delete('match2024', matchKey);
}

export async function clearStore(uploader: boolean = false) {
	const db = uploader ? await useScannerDB() : await useDB();

	await db.clear('match2024');
}
