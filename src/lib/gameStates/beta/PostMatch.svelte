<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	import { generateQRCode } from '$lib/export/qr';
	import { MatchPhase } from '$lib/types';
	import {
		teamNumber,
		matchNumber,
		scouterName,
		autonomous,
		teleop,
		matchPhase,
		intangibles
	} from '$lib/stores';
	import { onMount } from 'svelte';
	import { defaultAutonomous, defaultIntangibles, defaultTeleop } from '../../game';
	import { addMatchToStore } from '$lib/data/webMatchStorage';

	let qrData: string | undefined;
	let canContinue = false;

	onMount(async () => {
		qrData = await generateQRCode({
			teamNumber: $teamNumber,
			matchNumber: $matchNumber,
			scouterName: $scouterName,
			autonomous: $autonomous,
			teleop: $teleop,
			intangibles: $intangibles
		});
		addMatchToStore({
			teamNumber: $teamNumber,
			matchNumber: $matchNumber,
			scouterName: $scouterName,
			autonomous: $autonomous,
			teleop: $teleop,
			intangibles: $intangibles
		});
		setTimeout(() => {
			canContinue = true;
		}, 10000);
	});
</script>

<PageHeader headerText="Upload" previousPage={MatchPhase.Endgame} />
<PageLayout
	nextPage={MatchPhase.PreMatch}
	disabledNavigation={!canContinue}
	customNavigationAction={() => {
		// Reset state back to default state
		autonomous.set({ ...defaultAutonomous });
		teleop.set({ ...defaultTeleop });
		intangibles.set({ ...defaultIntangibles });
		// Increase match number by 1
		matchNumber.update((n) => (parseInt(n) + 1).toString());
		// Clear team number
		teamNumber.set('');
		matchPhase.set(MatchPhase.PreMatch);
	}}
>
	<!-- Components for the page go here -->

	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={qrData} class="w-full aspect-square max-h-screen" />
</PageLayout>
