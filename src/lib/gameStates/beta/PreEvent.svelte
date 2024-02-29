<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { MatchPhase, type ScheduledMatch } from '$lib/types';
	import { scheduledMatches } from '$lib/stores';
	import { onMount } from 'svelte';
	import { clearStore } from '$lib/data/webMatchStorage';
	import ConfirmButton from '$lib/components/ConfirmButton.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	let serverEventCode = '';
	let text = '';

	const toastStore = getToastStore();

	const getEventCodeFromServer = async () => {
		const response = await fetch('/admin/api/activeEvent');
		// Check if request responded
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		serverEventCode = data.activeEvent;
	};

	const getEventCodeFromLocalStorage = () => {
		return localStorage.getItem('activeEvent');
	};

	const getEventScheduleFromServer = async (): Promise<ScheduledMatch[]> => {
		const response = await fetch('/admin/api/eventMatches');
		// Check if request responded
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = (await response.json()) as ScheduledMatch[];
		return data;
	};

	onMount(async () => {
		await getEventCodeFromServer();
		const activeEventLocal = getEventCodeFromLocalStorage();
		if (serverEventCode !== activeEventLocal) {
			text = 'Local event does not match server. Pulling server information.';
			console.log(
				'Server event code does not match local event code. Pulling match schedule from server.'
			);
			const schedule = await getEventScheduleFromServer();
			scheduledMatches.set(schedule);
			toastStore.trigger({
				message: `Pulled ${schedule.length} matches from server`,
				timeout: 10000
			});
			localStorage.setItem('activeEvent', serverEventCode);
		}
	});
</script>

<PageHeader headerText="Event Setup" hideMatchInfo={true} />
<PageLayout nextPage={MatchPhase.PreMatch}>
	<!-- Components for the page go here -->
	<p>{text}</p>
	<ConfirmButton
		buttonText="Clear Scouted Matches"
		onConfirm={async () => {
			await clearStore();
			toastStore.trigger({
				message: 'All matches have been cleared',
				timeout: 5000,
				background: 'variant-filled-success'
			});
		}}
		>Are you sure you want to clear all scouted matches? Make sure this is only done after all
		matches are scanned!</ConfirmButton
	>
	<button
		class="btn btn-lg variant-filled-primary"
		on:click={async () => {
			const schedule = await getEventScheduleFromServer();
			scheduledMatches.set(schedule);
			toastStore.trigger({
				message: `Pulled ${schedule.length} matches from server`,
				timeout: 10000,
				background: 'variant-filled-success'
			});
		}}>Pull match schedule</button
	>
	<a href="/admin" class="btn variant-outline-secondary">Match Uploader (Login Required)</a>
</PageLayout>
