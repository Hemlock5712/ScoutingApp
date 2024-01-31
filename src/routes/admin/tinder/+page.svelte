<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import TinderCard from '$lib/components/tinder/TinderCard.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { EventStatistics, TinderTeam } from '../../../lib/types';

	let teams: TinderTeam[] = [];
	let eventStats: EventStatistics;

	onMount(async () => {
		const team = $page.url.searchParams.get('team') ?? '5712';
		const teamRes = await fetch(`/admin/api/tinder/team/${team}`);
		const eventRes = await fetch('/admin/api/tinder/event');
		teams = [...teams, await teamRes.json()];
		eventStats = await eventRes.json();
	});

	let teamIndex = 0;
</script>

<PageHeader headerText="Robot Tinder" hideMatchInfo />
<PageLayout>
	{#if teams.length > 0 && eventStats !== undefined}
		<TinderCard team={teams[teamIndex]} {eventStats} />
	{/if}
</PageLayout>
