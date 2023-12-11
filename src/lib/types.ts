export type MatchState<Auton, Tele> = {
	matchNumber: string | undefined;
	teamNumber: string | undefined;
	scouterName: string;
	autonomous: Auton;
	teleop: Tele;
};

export enum MatchPhase {
	PreMatch = 'PreMatch',
	Autonomous = 'Autonomous',
	Teleop = 'Teleop',
	PostMatch = 'PostMatch'
}
