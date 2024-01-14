import { PrismaClient } from '@prisma/client';
import type { AutonomousState, TeleopState } from '../game';
import type { MatchState } from '../types';
import { EVENT_NAME } from '$env/static/private';

const prisma = new PrismaClient();

export const writeMatch = async (match: MatchState<AutonomousState, TeleopState>) => {
	const { autonomous, teleop, matchNumber, scouterName, teamNumber } = match;
	const { taxi, low, lowMissed, high, highMissed } = autonomous;
	const {
		low: teleopLow,
		lowMissed: teleopLowMissed,
		high: teleopHigh,
		highMissed: teleopHighMissed,
		climbAttempt,
		climbLow,
		climbMid,
		climbHigh,
		climbTraverse,
		climbTime
	} = teleop;
	console.log(match);
	if (matchNumber && teamNumber && scouterName) {
		const writtenData = await prisma.match2022.create({
			data: {
				matchNumber: parseInt(matchNumber),
				teamNumber: parseInt(teamNumber),
				scouterName: scouterName,
				autoTaxi: taxi,
				autoLow: low,
				autoLowMissed: lowMissed,
				autoHigh: high,
				autoHighMissed: highMissed,
				teleopLow: teleopLow,
				teleopLowMissed: teleopLowMissed,
				teleopHigh: teleopHigh,
				teleopHighMissed: teleopHighMissed,
				climbAttempt: climbAttempt,
				climbLow: climbLow,
				climbMid: climbMid,
				climbHigh: climbHigh,
				climbTraverse: climbTraverse,
				climbTime: climbTime,
				eventName: EVENT_NAME ?? ''
			}
		});

		console.log(writtenData);
	}
};
