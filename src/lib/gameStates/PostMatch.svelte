<script lang="ts">
	import { generateQRCode } from '$lib/export/qr';
	import {
		teamNumber,
		matchNumber,
		scouterName,
		autonomous,
		teleop,
		matchPhase
	} from '$lib/stores';
	import { MatchPhase } from '$lib/types';
	import { defaultAutonomous, defaultTeleop } from '../game';

	let qrData: string | undefined;
	let canContinue = false;
</script>

<button
	class="btn btn-md variant-outline-tertiary"
	on:click={() => {
		matchPhase.set(MatchPhase.Teleop);
	}}>Teleop</button
>
<button
	class="btn btn-2xl variant-filled-secondary w-full"
	on:click={() => {
		generateQRCode({
			teamNumber: $teamNumber,
			matchNumber: $matchNumber,
			scouterName: $scouterName,
			autonomous: $autonomous,
			teleop: $teleop
		}).then((data) => {
			qrData = data;
			setTimeout(() => {
				canContinue = true;
			}, 10000);
		});
	}}>Generate QR Code</button
>

{#if qrData !== undefined}
	<img src={qrData} class="w-full aspect-square max-h-screen" />

	<button
		class="btn btn-2xl variant-filled-secondary w-full mt-12"
		disabled={!canContinue}
		class:variant-ghost-secondary={!canContinue}
		on:click={() => {
			autonomous.set({ ...defaultAutonomous });
			teleop.set({ ...defaultTeleop });
			matchNumber.update((n) => (parseInt(n) + 1).toString());
			teamNumber.set('');
			matchPhase.set(MatchPhase.PreMatch);
		}}>Finish Match</button
	>
{/if}
