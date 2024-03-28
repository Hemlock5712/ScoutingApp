<script lang="ts">
	import { gunzipSync, strFromU8, strToU8 } from 'fflate';
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';
	import {
		addMatchToStore,
		getMatchFromStore,
		updateMatchInStore
	} from '../../lib/data/webMatchStorage.js';
	import { SlideToggle, getToastStore } from '@skeletonlabs/skeleton';
	import { Confetti } from 'svelte-confetti';
	import offlineMode from '../../lib/stores/offline.js';

	let videoRef: HTMLVideoElement;
	let scannedData: any;

	export let data;
	let { supabase, session } = data;

	const toastStore = getToastStore();

	let showConfetti = false;
	const confettiDuration = 2000;

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
		addMatchToStore({
			teamNumber: scannedData.teamNumber,
			matchNumber: scannedData.matchNumber,
			scouterName: scannedData.scouterName,
			autonomous: scannedData.autonomous,
			teleop: scannedData.teleop,
			intangibles: scannedData.intangibles ?? {
				lostCommunication: false,
				noteGotStuck: false,
				penaltyMagnet: false,
				robotBroke: false
			},
			uploaded: false,
			uploader: true
		});
		console.log($offlineMode);
		if (!$offlineMode) {
			const data = await fetch('/admin/api/upload', {
				method: 'POST',
				body: JSON.stringify(scannedData)
			});
			console.log(data.status);
			if (data.status === 200) {
				toastStore.trigger({
					message: `Match ${scannedData.matchNumber} for team ${scannedData.teamNumber} uploaded successfully!`,
					background: 'bg-green-500'
				});

				const match = await getMatchFromStore(scannedData.teamNumber, scannedData.matchNumber);
				if (match) {
					updateMatchInStore({
						...match,
						uploaded: true,
						uploader: true
					});
				}
				showConfetti = true;
				setTimeout(() => {
					showConfetti = false;
				}, confettiDuration);
			} else {
				toastStore.trigger({
					message: `Failed to upload match ${scannedData.matchNumber} for team ${scannedData.teamNumber}! Data is saved to your device for uploading later.`,
					background: 'bg-red-500'
				});
			}
		} else {
			toastStore.trigger({
				message: `Offline mode selected. Match ${scannedData.matchNumber} for team ${scannedData.teamNumber} saved to device for uploading later.`,
				background: 'bg-yellow-500'
			});
		}
		scannedData = undefined;
	}
</script>

<div class="flex flex-col items-center mb-4">
	<div class="flex flex-row">
		<a href="/" class="btn variant-outline-primary">Scouter View</a>
		<a href="/admin/reupload" class="btn variant-outline-primary">Reupload</a>
	</div>
	<div class="flex flex-row gap-4 items-center">
		<p>Offline Mode</p>
		<SlideToggle bind:checked={$offlineMode} name="offline" label="Offline Mode" />
	</div>
</div>
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
	{#if showConfetti}
		<div
			style="position: fixed;
	bottom: 0px;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	pointer-events: none;"
		>
			<Confetti duration={confettiDuration} xSpread={1} size={15} amount={100} noGravity />
		</div>
	{/if}
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
