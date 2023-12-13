import type { AutonomousState, TeleopState } from "$lib/game"
import type { MatchState } from "$lib/types"
import { writeRow } from "./sheets"

export const writeData = async (matchData: MatchState<AutonomousState, TeleopState>) => {
    const { autonomous, teleop, matchNumber, scouterName, teamNumber } = matchData
    const { taxi, low, lowMissed, high, highMissed } = autonomous
    const { low: teleopLow, lowMissed: teleopLowMissed, high: teleopHigh, highMissed: teleopHighMissed, climbAttempt, climbLow, climbMid, climbHigh, climbTraverse, climbTime } = teleop
    const data = [matchNumber, teamNumber, scouterName, taxi, low, lowMissed, high, highMissed, teleopLow, teleopLowMissed, teleopHigh, teleopHighMissed, climbAttempt, climbLow, climbMid, climbHigh, climbTraverse, climbTime].map((i) => i?.toString() ?? "");
    return await writeRow("Raw Data!A1:R1", data);
}