export const defaultAutonomous = {
	taxi: false,
	low: 0,
	lowMissed: 0,
	high: 0,
	highMissed: 0
};

export type AutonomousState = typeof defaultAutonomous;

export type TeleopState = {
	low: number;
	lowMissed: number;
	high: number;
	highMissed: number;
	climbAttempt: boolean;
	climbLow: boolean;
	climbMid: boolean;
	climbHigh: boolean;
	climbTraverse: boolean;
	climbTime: number | undefined;
};

export const defaultTeleop: TeleopState = {
	low: 0,
	lowMissed: 0,
	high: 0,
	highMissed: 0,
	climbAttempt: false,
	climbLow: false,
	climbMid: false,
	climbHigh: false,
	climbTraverse: false,
	climbTime: undefined
};
