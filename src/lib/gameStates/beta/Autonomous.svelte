<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import HitMiss from '$lib/components/HitMiss.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';

	import { MatchPhase } from '$lib/types';
	import { autonomous } from '$lib/stores';
</script>

<PageHeader headerText="Autonomous" previousPage={MatchPhase.PreMatch} />
<PageLayout nextPage={MatchPhase.Teleop}>
	<!-- Components for the page go here -->
	<HitMiss label="Speaker" bind:hit={$autonomous.speakerHit} bind:miss={$autonomous.speakerMiss} />
	<HitMiss label="Amp" bind:hit={$autonomous.ampHit} bind:miss={$autonomous.ampMiss} />
	<ToggleButton label="Leave" bind:value={$autonomous.leave} />
</PageLayout>
