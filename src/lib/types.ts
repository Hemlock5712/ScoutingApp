export type MatchState<Auton, Tele> = {
	matchNumber: string | undefined;
	teamNumber: string | undefined;
	scouterName: string;
	autonomous: Auton;
	teleop: Tele;
};

export enum MatchPhase {
	PreEvent = 'PreEvent',
	PreMatch = 'PreMatch',
	Autonomous = 'Autonomous',
	Teleop = 'Teleop',
	PostMatch = 'PostMatch'
}

export type ScheduledMatch = {
	match_number: number;
	red: string[];
	blue: string[];
};
