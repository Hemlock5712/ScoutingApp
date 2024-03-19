<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import HitMiss from '$lib/components/HitMiss.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';

	import { MatchPhase } from '$lib/types';
	import { teleop } from '$lib/stores';
	import RadioButton from '$lib/components/RadioButton.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
</script>

<PageHeader headerText="Endgame" previousPage={MatchPhase.Teleop} />
<PageLayout nextPage={MatchPhase.PostMatch}>
	<!-- Components for the page go here -->
	<HitMiss label="Trap" bind:hit={$teleop.trap} bind:miss={$teleop.trapMiss} />
	<RadioButton
		buttons={['None', 'Park', 'Climb']}
		on:select={(event) => {
			teleop.set({
				...$teleop,
				climb: event.detail.value === 'Climb',
				park: event.detail.value === 'Park'
			});
		}}
	/>
	{#if $teleop.humanPlayerAtAmp}
		<HitMiss
			label="High Notes on Microphone"
			bind:hit={$teleop.humanPlayerHighNotesHit}
			bind:miss={$teleop.humanPlayerHighNotesMiss}
			max={3}
		/>
	{/if}
	{#if $teleop.climb}
		<ToggleButton label="Harmony" bind:value={$teleop.harmony} />
	{/if}
	<TextArea title="Notes" bind:value={$teleop.notes} />
</PageLayout>
