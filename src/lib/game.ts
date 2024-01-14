export const defaultAutonomous = Object.freeze({
	leave: false,
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0
});

export type AutonomousState = typeof defaultAutonomous;

export const defaultTeleop = Object.freeze({
	speakerHit: 0,
	speakerMiss: 0,
	ampHit: 0,
	ampMiss: 0,
	climbAttempt: false,
	climbSuccess: false,
	trap: 0
});

export type TeleopState = typeof defaultTeleop;
