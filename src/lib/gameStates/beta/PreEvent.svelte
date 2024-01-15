<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { MatchPhase, type ScheduledMatch } from '$lib/types';
	import { scheduledMatches } from '$lib/stores';
	import { onMount } from 'svelte';

	let serverEventCode = '';
	let text = '';
	let pulledMatches = false;

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
		console.log(activeEventLocal);
		console.log(serverEventCode);
		if (serverEventCode !== activeEventLocal) {
			text = 'Local event does not match server. Pulling server information.';
			console.log(
				'Server event code does not match local event code. Pulling match schedule from server.'
			);
			const schedule = await getEventScheduleFromServer();
			scheduledMatches.set(schedule);
			pulledMatches = true;
			localStorage.setItem('activeEvent', serverEventCode);
		}
	});
</script>

<PageHeader headerText="Event Setup" hideMatchInfo={true} />
<PageLayout nextPage={MatchPhase.PreMatch}>
	<!-- Components for the page go here -->
	<p>{text}</p>
	<button
		class="btn btn-lg variant-filled-primary"
		on:click={async () => {
			const schedule = await getEventScheduleFromServer();
			scheduledMatches.set(schedule);
			pulledMatches = true;
		}}>Pull match schedule</button
	>
	{#if pulledMatches}
		<p>Matches Pulled</p>
		<p>Match count: {$scheduledMatches.length}</p>
	{/if}
</PageLayout>
