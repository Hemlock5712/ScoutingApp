import type { AutonomousState, TeleopState } from '../../game';
import type { MatchState } from '../../types';

export class EventSimulator {
	public generateEventTeam(teamNumber: number): Robot {
		return {
			teamNumber: teamNumber,
			robotType: getRandomEnumValue(RobotType),
			robotSpeed: getRandomEnumValue(RobotSpeed),
			consistency: getRandomEnumValue(Consistency),
			loadStyle: getRandomEnumValue(LoadStyle)
		};
	}

	// Run through the flow of a match for a team, simulating the robot's performance,
	// and returning the resulting autonomous and teleop states.
	public simulateMatchForTeam(
		team: Robot,
		matchNumber: string
	): MatchState<AutonomousState, TeleopState> {
		const autonomousState = this.simulateAutonomous(team);
		const teleopState = this.simulateTeleop(team);

		return {
			autonomous: autonomousState,
			teleop: teleopState,
			matchNumber: matchNumber,
			scouterName: 'Simulated',
			teamNumber: team.teamNumber.toString()
		};
	}

	private simulateAutonomous(team: Robot) {
		const [amp, ampMiss] = this.autoAmp(team);
		const [speaker, speakerMiss] = this.autoSpeaker(team);
		const leave = this.autoLeave(amp + speaker);
		const totalCycles = amp + ampMiss + speaker + speakerMiss;
		// If the robot placed in the amp, it started in the amp. Otherwise, it randomly started in amp, middle, or source
		const randomStartLocation = Math.floor(Math.random() * 3);
		const startLocation =
			amp > 0
				? 'AMP'
				: randomStartLocation === 0
				  ? 'AMP'
				  : randomStartLocation === 1
				    ? 'MIDDLE'
				    : 'SOURCE';

		const autonomousState: AutonomousState = {
			ampHit: amp,
			ampMiss: ampMiss,
			speakerHit: speaker,
			speakerMiss: speakerMiss,
			leave: leave,
			pickedUpFromMiddle: Math.max(totalCycles - 2, 0),
			startLocation: startLocation
		};

		return autonomousState;
	}

	private simulateTeleop(team: Robot) {
		console.log(team);
		const cycles = speedMap[team.robotSpeed];
		let speakerHit = 0;
		let speakerMiss = 0;
		let ampHit = 0;
		let ampMiss = 0;
		if (team.robotType === RobotType.Amp) {
			const scored = Array(cycles)
				.fill(false)
				.map(() => this.simulateCycle(team.consistency));
			ampHit = scored.reduce((acc, val) => acc + (val ? 1 : 0), 0);
			ampMiss = scored.reduce((acc, val) => acc + (val ? 0 : 1), 0);
		} else if (team.robotType === RobotType.Speaker) {
			const scored = Array(cycles)
				.fill(false)
				.map(() => this.simulateCycle(team.consistency));
			speakerHit = scored.reduce((acc, val) => acc + (val ? 1 : 0), 0);
			speakerMiss = scored.reduce((acc, val) => acc + (val ? 0 : 1), 0);
		} else if (team.robotType === RobotType.Both) {
			const scored = Array(Math.ceil(cycles / 2.0))
				.fill(false)
				.map(() => this.simulateCycle(team.consistency));
			speakerHit = scored.reduce((acc, val) => acc + (val ? 1 : 0), 0);
			speakerMiss = scored.reduce((acc, val) => acc + (val ? 0 : 1), 0);
			const scored2 = Array(Math.floor(cycles / 2.0))
				.fill(false)
				.map(() => this.simulateCycle(team.consistency));
			ampHit = scored2.reduce((acc, val) => acc + (val ? 1 : 0), 0);
			ampMiss = scored2.reduce((acc, val) => acc + (val ? 0 : 1), 0);
		}
		const climb = Math.random() < 0.5;
		const park = climb ? true : Math.random() < 0.5;
		const harmony = climb ? Math.random() < 0.5 : false;
		const trap = Math.floor(Math.random() * 4);
		const trapMiss = Math.floor(Math.random() * 4);
		const sourcePickup = team.loadStyle === LoadStyle.Source || team.loadStyle === LoadStyle.Both;
		const floorPickup = team.loadStyle === LoadStyle.Floor || team.loadStyle === LoadStyle.Both;
		const humanPlayerAtAmp = Math.random() < 0.5;
		const humanPlayerHighNotesHit = humanPlayerAtAmp ? Math.floor(Math.random() * 4) : 0;
		const humanPlayerHighNotesMiss = humanPlayerAtAmp ? 3 - humanPlayerHighNotesHit : 0;
		const notes = '';

		const teleopState: TeleopState = {
			speakerHit: speakerHit,
			speakerMiss: speakerMiss,
			ampHit: ampHit,
			ampMiss: ampMiss,
			climb: climb,
			park: park,
			trap: trap,
			trapMiss: trapMiss,
			sourcePickup: sourcePickup,
			floorPickup: floorPickup,
			humanPlayerAtAmp: humanPlayerAtAmp,
			humanPlayerHighNotesHit: humanPlayerHighNotesHit,
			humanPlayerHighNotesMiss: humanPlayerHighNotesMiss,
			harmony: harmony,
			notes: notes
		};

		return teleopState;
	}

	// Robot left the starting location if they scored more than the preload.
	// Otherwise, they have a 50% chance of leaving.
	private autoLeave(scoredGamePieces: number) {
		if (scoredGamePieces < 2) {
			return Math.random() < 0.5;
		}
		return true;
	}

	private autoSpeaker(team: Robot): [number, number] {
		if (team.robotType === RobotType.Amp) {
			return [0, 0];
		}
		const cycles = autoSpeedMap[team.robotSpeed];
		const scored = Array(cycles)
			.fill(false)
			.map(() => this.simulateCycle(team.consistency));
		return [
			scored.reduce((acc, val) => acc + (val ? 1 : 0), 0),
			scored.reduce((acc, val) => acc + (val ? 0 : 1), 0)
		];
	}

	private autoAmp(team: Robot) {
		if (team.robotType === RobotType.Amp) {
			const cycles = autoSpeedMap[team.robotSpeed];
			const scored = Array(cycles)
				.fill(false)
				.map(() => this.simulateCycle(team.consistency));
			return [
				scored.reduce((acc, val) => acc + (val ? 1 : 0), 0),
				scored.reduce((acc, val) => acc + (val ? 0 : 1), 0)
			];
		}
		return [0, 0];
	}

	private simulateCycle(consistency: Consistency) {
		const mean = 0.5;
		const stdDev = consistencyMap[consistency];
		const score = mean + stdDev * this.normalRandom();
		return score > 0.5;
	}

	private normalRandom() {
		let u = 0;
		let v = 0;
		while (u === 0) u = Math.random();
		while (v === 0) v = Math.random();
		return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	}
}

function getRandomEnumValue<T>(enumeration: T): T[keyof T] {
	const values = Object.values(enumeration as object);
	const randomIndex = Math.floor(Math.random() * values.length);
	return values[randomIndex] as T[keyof T];
}

export type Robot = {
	teamNumber: number;
	robotType: RobotType;
	robotSpeed: RobotSpeed;
	consistency: Consistency;
	loadStyle: LoadStyle;
};

export enum RobotType {
	Amp = 'Amp',
	Speaker = 'Speaker',
	Both = 'Both'
}

export enum LoadStyle {
	Floor = 'Floor',
	Source = 'Source',
	Both = 'Both',
	None = 'None'
}

export enum RobotSpeed {
	High = 'High',
	Medium = 'Medium',
	Low = 'Low'
}

// Maps robot speed to number of cycles per match
const speedMap = {
	[RobotSpeed.High]: 16,
	[RobotSpeed.Medium]: 10,
	[RobotSpeed.Low]: 4
};

const autoSpeedMap = {
	[RobotSpeed.High]: 5,
	[RobotSpeed.Medium]: 3,
	[RobotSpeed.Low]: 1
};

export enum Consistency {
	High = 'High',
	Medium = 'Medium',
	Low = 'Low'
}

// Map of standard deviations for each consistency level
const consistencyMap = {
	[Consistency.High]: 0.25,
	[Consistency.Medium]: 0.4,
	[Consistency.Low]: 0.7
};
