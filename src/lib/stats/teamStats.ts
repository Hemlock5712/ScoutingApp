import type { EventStatistics, TinderStatistic, TinderTeam } from '$lib/types';
import type { Match2024 } from '@prisma/client';

/**
 * Calculate the average of an array of numbers
 * @param numbers
 * @returns
 */
export function average(numbers: number[]): number {
	return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculate the standard deviation of an array of numbers
 * @param numbers
 * @returns
 */
export function standardDeviation(numbers: number[]): number {
	const avg = average(numbers);
	const squareDiffs = numbers.map((value) => {
		const diff = value - avg;
		return diff * diff;
	});
	const avgSquareDiff = average(squareDiffs);
	return Math.sqrt(avgSquareDiff);
}

/**
 * Calculate the median of an array of numbers
 * @param numbers
 * @returns
 */
export function median(numbers: number[]): number {
	const sorted = [...numbers].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0 ? (sorted[middle] + sorted[middle - 1]) / 2 : sorted[middle];
}

/**
 * Calculate the mode of an array of numbers
 * @param numbers
 * @returns
 */
export function mode(numbers: number[]): number {
	const counts = new Map<number, number>();
	let maxCount = 0;
	let mode = 0;
	for (const number of numbers) {
		const count = counts.get(number) ?? 0;
		counts.set(number, count + 1);
		if (count + 1 > maxCount) {
			maxCount = count + 1;
			mode = number;
		}
	}
	return mode;
}

/**
 * Calculate the first quartile of an array of numbers
 * @param numbers
 * @returns
 */
export function q1(numbers: number[]): number {
	const sorted = [...numbers].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);
	return median(sorted.slice(0, middle));
}

/**
 * Calculate the third quartile of an array of numbers
 * @param numbers
 * @returns
 */
export function q3(numbers: number[]): number {
	const sorted = [...numbers].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);
	return median(sorted.slice(sorted.length % 2 === 0 ? middle : middle + 1));
}

export function min(numbers: number[]): number {
	return Math.min(...numbers);
}

export function max(numbers: number[]): number {
	return Math.max(...numbers);
}

/**
 * Calculate the statistics of an array of numbers
 * @param numbers
 * @returns
 */
export function statistics(numbers: number[]): TinderStatistic {
	return {
		average: average(numbers),
		median: median(numbers),
		mode: mode(numbers),
		q1: q1(numbers),
		q3: q3(numbers),
		stdDev: standardDeviation(numbers),
		min: min(numbers),
		max: max(numbers)
	};
}

export function calculateTeamStatistics(
	teamNumber: string,
	nickname: string,
	photo_url: string,
	teamMatches: Match2024[]
): TinderTeam {
	const autonScoredGamePieces: number[] = [];
	const teleopAmpGamePieces: number[] = [];
	const teleopSpeakerGamePieces: number[] = [];
	const endgameClimbPercent: number[] = [];
	const trap: number[] = [];

	for (const match of teamMatches) {
		let autoGamePieces = 0;
		autoGamePieces += match.autoAmpHit ?? 0;
		autoGamePieces += match.autoSpeakerHit ?? 0;

		autonScoredGamePieces.push(autoGamePieces);

		teleopAmpGamePieces.push(match.teleAmpHit ?? 0);
		teleopSpeakerGamePieces.push(match.teleSpeakerHit ?? 0);
		endgameClimbPercent.push(match.climb ? 1 : 0);
		trap.push(match.trap ?? 0);
	}

	return {
		team_number: teamNumber,
		nickname: nickname,
		photo_url: photo_url,
		autonScoredGamePieces: statistics(autonScoredGamePieces),
		teleopAmpGamePieces: statistics(teleopAmpGamePieces),
		teleopSpeakerGamePieces: statistics(teleopSpeakerGamePieces),
		endgameClimbPercent: statistics(endgameClimbPercent),
		trap: statistics(trap)
	};
}

/**
 * Pull all team matches and calculate statistics for the event as a whole
 *
 * Used to compare teams to the event as a whole
 * @param teamMatches
 */
export function calculateEventStatistics(teamMatches: Match2024[]): EventStatistics {
	const autonScoredGamePieces: number[] = [];
	const teleopAmpGamePieces: number[] = [];
	const teleopSpeakerGamePieces: number[] = [];
	const endgameClimbPercent: number[] = [];
	const trap: number[] = [];

	for (const match of teamMatches) {
		let autoGamePieces = 0;
		autoGamePieces += match.autoAmpHit ?? 0;
		autoGamePieces += match.autoSpeakerHit ?? 0;

		autonScoredGamePieces.push(autoGamePieces);

		teleopAmpGamePieces.push(match.teleAmpHit ?? 0);
		teleopSpeakerGamePieces.push(match.teleSpeakerHit ?? 0);
		endgameClimbPercent.push(match.climb ? 1 : 0);
		trap.push(match.trap ?? 0);
	}

	return {
		autonScoredGamePieces: statistics(autonScoredGamePieces),
		teleopAmpGamePieces: statistics(teleopAmpGamePieces),
		teleopSpeakerGamePieces: statistics(teleopSpeakerGamePieces),
		endgameClimbPercent: statistics(endgameClimbPercent),
		trap: statistics(trap)
	};
}
