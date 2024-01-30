import { PrismaClient } from '@prisma/client';
import type { AutonomousState, TeleopState } from '../game';
import type { MatchState } from '../types';
import { EVENT_NAME } from '$env/static/private';

const prisma = new PrismaClient();

export const writeMatch = async (match: MatchState<AutonomousState, TeleopState>) => {
	const { autonomous, teleop, matchNumber, scouterName, teamNumber } = match;

	console.log(match);
	if (matchNumber && teamNumber && scouterName) {
		const writtenData = await prisma.match2024.create({
			data: {
				matchNumber: parseInt(matchNumber),
				teamNumber: parseInt(teamNumber),
				scouterName: scouterName,
				eventName: EVENT_NAME ?? '',
				// Season specific
				// Autonomous
				autoAmpHit: autonomous.ampHit,
				autoAmpMissed: autonomous.ampMiss,
				autoSpeakerHit: autonomous.speakerHit,
				autoSpeakerMissed: autonomous.speakerMiss,
				autoLeave: autonomous.leave,
				autoPickedUpFromMiddle: autonomous.pickedUpFromMiddle,

				// Teleop
				teleSpeakerHit: teleop.speakerHit,
				teleSpeakerMissed: teleop.speakerMiss,
				teleAmpHit: teleop.ampHit,
				teleAmpMissed: teleop.ampMiss,
				climb: teleop.climb,
				park: teleop.park,
				harmony: teleop.harmony,
				humanPlayerAtAmp: teleop.humanPlayerAtAmp,
				humanPlayerHighNotesHit: teleop.humanPlayerHighNotesHit,
				humanPlayerHighNotesMissed: teleop.humanPlayerHighNotesMiss,
				sourcePickup: teleop.sourcePickup,
				floorPickup: teleop.floorPickup,
				trap: teleop.trap,
				trapMiss: teleop.trapMiss,
				notes: teleop.notes
			}
		});

		console.log(writtenData);
	}
};
