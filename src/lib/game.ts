export const defaultAutonomous = Object.freeze({
	leave: false,
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0,
	pickedUpFromMiddle: 0
});

export type AutonomousState = {
	leave: boolean;
	speakerHit: number;
	speakerMiss: number;
	ampHit: number;
	ampMiss: number;
	pickedUpFromMiddle: number;
};

export const defaultTeleop = Object.freeze({
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0,
	climbAttempt: false,
	climbSuccess: false,
	trap: 0,
	trapMiss: 0,
	sourcePickup: false,
	floorPickup: false,
	humanPlayerAtAmp: false,
	humanPlayerHighNotesHit: 0,
	humanPlayerHighNotesMiss: 0
});

export type TeleopState = {
	speakerHit: number;
	speakerMiss: number;
	ampHit: number;
	ampMiss: number;
	climbAttempt: boolean;
	climbSuccess: boolean;
	trap: number;
	trapMiss: number;
	sourcePickup: boolean;
	floorPickup: false;
	humanPlayerAtAmp: boolean;
	humanPlayerHighNotesHit: number;
	humanPlayerHighNotesMiss: number;
	harmony: boolean;
};
