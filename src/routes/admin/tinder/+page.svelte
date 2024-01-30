<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import TinderCard from '$lib/components/tinder/TinderCard.svelte';
	import type { TinderTeam } from '../../../lib/types';

	let teams: TinderTeam[] = [
		{
			team_number: 5712,
			photo_url: 'https://i.imgur.com/Tjvqx9ih.jpg',
			nickname: "Hemlock's Gray Matter",
			statistics: {
				amp_notes: {
					average: 8,
					max: 10,
					min: 6,
					median: 9,
					mode: 8,
					q1: 7,
					q3: 9
				},
				speaker_notes: {
					average: 8,
					max: 10,
					min: 6,
					median: 9,
					mode: 8,
					q1: 7,
					q3: 9
				},
				auto_amp_notes: {
					average: 0,
					max: 0,
					min: 0,
					median: 0,
					mode: 0,
					q1: 0,
					q3: 0
				},
				auto_speaker_notes: {
					average: 2,
					max: 3,
					min: 1,
					median: 2,
					mode: 2,
					q1: 2,
					q3: 2
				},
				auto_leave: {
					average: 1,
					max: 1,
					min: 1,
					median: 1,
					mode: 1,
					q1: 1,
					q3: 1
				},
				climb: {
					average: 0.78,
					max: 1,
					min: 0,
					median: 1,
					mode: 1,
					q1: 1,
					q3: 1
				},
				park: {
					average: 1,
					max: 1,
					min: 1,
					median: 1,
					mode: 1,
					q1: 1,
					q3: 1
				},
				trap_notes: {
					average: 1.1,
					max: 3,
					min: 0,
					median: 1,
					mode: 1,
					q1: 0,
					q3: 1
				}
			}
		}
	];

	let teamIndex = 0;
</script>

<PageHeader headerText="Tinder" hideMatchInfo />
<PageLayout>
	{#if teams.length > 0}
		<TinderCard team={teams[teamIndex]} />
	{/if}
</PageLayout>
