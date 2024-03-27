import type { AutonomousState, TeleopState } from '$lib/game';
import type { MatchState } from '$lib/types';
import { writeMatch } from './db';
import { writeBulk, writeRow } from './sheets';

export const writeData = async (
	matchData: MatchState<AutonomousState, TeleopState>,
	database: boolean = true
) => {
	const { autonomous, teleop, intangibles, matchNumber, scouterName, teamNumber } = matchData;
	const {
		ampHit: autoAmpHit,
		ampMiss: autoAmpMiss,
		speakerHit: autoSpeakerHit,
		speakerMiss: autoSpeakerMiss,
		leave: autoLeave,
		pickedUpFromMiddle: autoPickedUpFromMiddle,
		startLocation: autoStartLocation
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
		passedNotes,
		notes
	} = teleop;
	const { lostCommunication, robotBroke, penaltyMagnet, noteGotStuck } = intangibles ?? {
		lostCommunication: false,
		robotBroke: false,
		penaltyMagnet: false,
		noteGotStuck: false
	};
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
		autoStartLocation,
		lostCommunication,
		robotBroke,
		penaltyMagnet,
		noteGotStuck,
		passedNotes ?? 0,
		notes
	].map((i) => i?.toString() ?? '');
	await writeRow('Data Input!A1:Y1', data);
	if (database) {
		await writeMatch(matchData);
	}
};

export const writeBulkMatches = async (matches: MatchState<AutonomousState, TeleopState>[]) => {
	const data = matches.map((match) => {
		const { autonomous, teleop, matchNumber, scouterName, teamNumber } = match;
		const {
			ampHit: autoAmpHit,
			ampMiss: autoAmpMiss,
			speakerHit: autoSpeakerHit,
			speakerMiss: autoSpeakerMiss,
			leave: autoLeave,
			pickedUpFromMiddle: autoPickedUpFromMiddle,
			startLocation: autoStartLocation
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
		return [
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
			autoStartLocation,
			notes
		].map((i) => i?.toString() ?? '');
	});
	await writeBulk('Data Input!A1:Y1', data);
};
