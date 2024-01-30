<script lang="ts">
	import { onMount } from 'svelte';
	import type { MatchStorage } from '$lib/data/webMatchStorage';
	import ToggleButton from '../ToggleButton.svelte';
	import { generateQRCode } from '$lib/export/qr';

	export let match: MatchStorage;
	let qrData: string | undefined;
	let showQRCode = false;

	onMount(async () => {
		qrData = await generateQRCode({
			teamNumber: match.teamNumber,
			matchNumber: match.matchNumber,
			scouterName: match.scouterName,
			autonomous: match.autonomous,
			teleop: match.teleop
		});
	});
</script>

<div class="flex flex-col items-center">
	<ToggleButton label={`Match ${match.matchNumber}: ${match.teamNumber}`} bind:value={showQRCode} />
	{#if showQRCode}
		<img src={qrData} alt="QR Code" />
	{/if}
</div>
