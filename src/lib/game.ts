export const defaultAutonomous = Object.freeze({
	leave: false,
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0,
	pickedUpFromMiddle: 0,
	startLocation: 'AMP'
});

export type AutonomousState = {
	leave: boolean;
	speakerHit: number;
	speakerMiss: number;
	ampHit: number;
	ampMiss: number;
	pickedUpFromMiddle: number;
	startLocation: 'AMP' | 'MIDDLE' | 'SOURCE';
};

export const defaultTeleop = Object.freeze({
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0,
	park: false,
	climb: false,
	harmony: false,
	trap: 0,
	trapMiss: 0,
	sourcePickup: false,
	floorPickup: false,
	humanPlayerAtAmp: false,
	humanPlayerHighNotesHit: 0,
	humanPlayerHighNotesMiss: 0,
	passedNotes: 0,
	notes: ''
});

export type TeleopState = {
	speakerHit: number;
	speakerMiss: number;
	ampHit: number;
	ampMiss: number;
	climb: boolean;
	park: boolean;
	trap: number;
	trapMiss: number;
	sourcePickup: boolean;
	floorPickup: boolean;
	humanPlayerAtAmp: boolean;
	humanPlayerHighNotesHit: number;
	humanPlayerHighNotesMiss: number;
	harmony: boolean;
	passedNotes: number;
	notes: string;
};

export const defaultIntangibles = Object.freeze({
	penaltyMagnet: false,
	robotBroke: false,
	lostCommunication: false,
	noteGotStuck: false
});

export type Intangibles = {
	penaltyMagnet: boolean;
	robotBroke: boolean;
	lostCommunication: boolean;
	noteGotStuck: boolean;
};
