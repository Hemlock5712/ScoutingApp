import type { AutonomousState, TeleopState } from '$lib/game';
import type { MatchState } from '$lib/types';
import { writeMatch } from './db';
import { writeRow } from './sheets';

export const writeData = async (matchData: MatchState<AutonomousState, TeleopState>) => {
	const { autonomous, teleop, matchNumber, scouterName, teamNumber } = matchData;
	const {
		ampHit: autoAmpHit,
		ampMiss: autoAmpMiss,
		speakerHit: autoSpeakerHit,
		speakerMiss: autoSpeakerMiss,
		leave: autoLeave,
		pickedUpFromMiddle: autoPickedUpFromMiddle
	} = autonomous;
	const {
		ampHit,
		ampMiss,
		speakerHit,
		speakerMiss,
		climb,
		park,
		harmony,
		trap,
		trapMiss,
		sourcePickup,
		floorPickup,
		humanPlayerAtAmp,
		humanPlayerHighNotesHit,
		humanPlayerHighNotesMiss,
		notes
	} = teleop;
	const data = [
		matchNumber,
		teamNumber,
		scouterName,
		autoLeave,
		autoSpeakerHit,
		autoSpeakerMiss,
		autoAmpHit,
		autoAmpMiss,
		autoPickedUpFromMiddle,
		speakerHit,
		speakerMiss,
		ampHit,
		ampMiss,
		trap,
		trapMiss,
		park,
		climb,
		harmony,
		humanPlayerAtAmp,
		humanPlayerHighNotesHit,
		humanPlayerHighNotesMiss,
		sourcePickup,
		floorPickup,
		notes
	].map((i) => i?.toString() ?? '');
	await writeRow('Raw Data!A1:R1', data);
	await writeMatch(matchData);
};
