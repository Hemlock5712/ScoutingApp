import { gzipSync, strToU8 } from 'fflate';
import type { MatchState } from '$lib/types';
import qrcode from 'qrcode';
import type { AutonomousState, TeleopState } from '../game';

type SeasonMatch = MatchState<AutonomousState, TeleopState>;

function compressMatch(match: SeasonMatch) {
	const buffer = gzipSync(strToU8(JSON.stringify(match)));
	return btoa(String.fromCharCode(...buffer));
}

export async function generateQRCode(match: SeasonMatch) {
	const compressed = compressMatch(match);
	return await qrcode.toDataURL(compressed, { errorCorrectionLevel: 'L' });
}
