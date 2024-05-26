<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getAllMatchesFromStore,
		updateMatchInStore,
		type MatchStorage
	} from '../../../lib/data/webMatchStorage';
	import PageLayout from '../../../lib/components/layout/PageLayout.svelte';
	import Button from '../../../lib/Button.svelte';
	import PageHeader from '../../../lib/components/PageHeader.svelte';
	import ConfirmButton from '../../../lib/components/ConfirmButton.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	let scannedMatches: MatchStorage[] = [];
	onMount(loadMatches);

	async function loadMatches() {
		const matches = await getAllMatchesFromStore(true);
		matches.sort((a, b) => parseInt(a.matchNumber) - parseInt(b.matchNumber));
		console.log(matches);
		scannedMatches = matches;
	}

	async function uploadAllUnuploadedMatches() {
		const unuploadedMatches = scannedMatches.filter((match) => !match.uploaded);
		const data = await fetch('/admin/api/upload/bulk', {
			method: 'POST',
			body: JSON.stringify(unuploadedMatches)
		});
		if (data.status === 200) {
			for (let match of unuploadedMatches) {
				updateMatchInStore({
					...match,
					uploaded: true,
					uploader: true
				});
			}
			loadMatches();
			toastStore.trigger({
				message: 'All unuploaded matches uploaded!',
				background: 'bg-green-500'
			});
		} else {
			toastStore.trigger({
				message: 'Failed to upload all unuploaded matches!',
				background: 'bg-red-500'
			});
		}
	}

	async function sendToServer(match: MatchStorage) {
		console.log(match);
		const data = await fetch('/admin/api/upload', {
			method: 'POST',
			body: JSON.stringify(match)
		});
		console.log(data.status);
		if (data.status === 200) {
			toastStore.trigger({
				message: `Match ${match.matchNumber} for team ${match.teamNumber} uploaded successfully!`,
				background: 'bg-green-500'
			});
			updateMatchInStore({
				...match,
				uploaded: true,
				uploader: true
			});
			loadMatches();
		} else {
			toastStore.trigger({
				message: `Failed to upload match ${match.matchNumber} for team ${match.teamNumber}!`,
				background: 'bg-red-500'
			});
		}
	}
</script>

<PageHeader headerText="Reupload matches" previousPageLink="/admin" previousPageText="Scan" />
<PageLayout>
	<button class="btn btn-lg text-xl variant-filled-tertiary" on:click={uploadAllUnuploadedMatches}
		>Upload all unuploaded matches</button
	>
	<div class="grid grid-cols-3 gap-4">
		{#each scannedMatches as match}
			<ConfirmButton
				buttonText={`${match.matchNumber} - ${match.teamNumber}`}
				cancelText={'Cancel'}
				confirmText={'Upload'}
				variant={match.uploaded ? 'variant-filled-surface' : 'variant-filled-warning'}
				onConfirm={async () => {
					console.log('uploading');
					toastStore.trigger({
						message: `Uploading match ${match.matchNumber} for team ${match.teamNumber}...`
					});
					sendToServer(match);
				}}>Reupload this match?</ConfirmButton
			>
		{/each}
	</div>
</PageLayout>
