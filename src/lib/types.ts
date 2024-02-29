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
	Endgame = 'Endgame',
	PostMatch = 'PostMatch'
}

export type ScheduledMatch = {
	match_number: number;
	red: string[];
	blue: string[];
};

export type TinderStatistic = {
	average: number;
	median: number;
	mode: number;
	q1: number;
	q3: number;
	stdDev: number;
	min: number;
	max: number;
};

export type EventStatistics = {
	autonScoredGamePieces: TinderStatistic;
	teleopAmpGamePieces: TinderStatistic;
	teleopSpeakerGamePieces: TinderStatistic;
	endgameClimbPercent: TinderStatistic;
	trap: TinderStatistic;
};

export type TinderTeam = {
	team_number: string;
	nickname: string;
	photo_url: string;
	autonScoredGamePieces: TinderStatistic;
	teleopAmpGamePieces: TinderStatistic;
	teleopSpeakerGamePieces: TinderStatistic;
	endgameClimbPercent: TinderStatistic;
	trap: TinderStatistic;
};

export type ButtonVariants = 'success' | 'primary' | 'secondary' | 'tertiary' | 'warning' | 'error';
