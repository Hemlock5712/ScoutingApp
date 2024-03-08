<script lang="ts">
	import { gunzipSync, strFromU8, strToU8 } from 'fflate';
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';
	import { addMatchToStore } from '../../lib/data/webMatchStorage.js';

	let videoRef: HTMLVideoElement;
	let scannedData: any;

	export let data;
	let { supabase, session } = data;

	onMount(() => {
		const scanner = new QrScanner(
			videoRef!,
			(result) => {
				console.log('decoded qr code:', result);
				const gzipped = atob(result.data);
				console.log(gzipped);
				const unzipped = strFromU8(gunzipSync(strToU8(gzipped, true)));
				console.log('unzipped:', unzipped);
				scannedData = JSON.parse(unzipped);
			},
			{
				highlightCodeOutline: true,
				highlightScanRegion: true
			}
		);
		scanner.start();
	});

	async function sendToServer() {
		const data = await fetch('/admin/api/upload', {
			method: 'POST',
			body: JSON.stringify(scannedData)
		});
		addMatchToStore({
			teamNumber: scannedData.teamNumber,
			matchNumber: scannedData.matchNumber,
			scouterName: scannedData.scouterName,
			autonomous: scannedData.autonomous,
			teleop: scannedData.teleop,
			uploader: true
		});
		console.log(data.status);
		scannedData = undefined;
	}
</script>

<a href="/" class="btn variant-outline-primary">Scouter View</a>

{#if session}
	<div class="w-full flex items-center flex-col">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={videoRef} class="w-full max-w-lg border rounded-lg"></video>

		{#if scannedData}
			<button class="btn btn-lg variant-filled-secondary" on:click={sendToServer}
				>Send to Server</button
			>
			<pre>
        <code>{JSON.stringify(scannedData, null, 2)}</code>
    </pre>
		{/if}
	</div>
{:else}
	<p>You must be logged in to view this page.</p>
	<a
		class="btn btn-lg variant-filled-secondary"
		href="/admin/auth/login"
		on:click={() => {
			window.location.href = '/admin/auth/login';
		}}>Login</a
	>
{/if}
