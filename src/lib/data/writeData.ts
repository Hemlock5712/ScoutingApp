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
		leave: autoLeave
	} = autonomous;
	const { ampHit, ampMiss, speakerHit, speakerMiss, climbAttempt, climbSuccess, trap } = teleop;
	const data = [
		matchNumber,
		teamNumber,
		scouterName,
		autoLeave,
		autoSpeakerHit,
		autoSpeakerMiss,
		autoAmpHit,
		autoAmpMiss,
		speakerHit,
		speakerMiss,
		ampHit,
		ampMiss,
		trap,
		climbAttempt,
		climbSuccess
	].map((i) => i?.toString() ?? '');
	await writeRow('Raw Data!A1:R1', data);
	await writeMatch(matchData);
};
