<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import HitMiss from '$lib/components/HitMiss.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';

	import { MatchPhase } from '$lib/types';
	import { teleop } from '$lib/stores';
</script>

<PageHeader headerText="Teleop" previousPage={MatchPhase.Autonomous} />
<PageLayout nextPage={MatchPhase.Endgame}>
	<!-- Components for the page go here -->
	<HitMiss label="Speaker" bind:hit={$teleop.speakerHit} bind:miss={$teleop.speakerMiss} />
	<HitMiss label="Amp" bind:hit={$teleop.ampHit} bind:miss={$teleop.ampMiss} />
	<HitMiss label="Trap" bind:hit={$teleop.trap} bind:miss={$teleop.trapMiss} />

	<div class="flex flex-row justify-center gap-4 py-8">
		<ToggleButton label="Floor Pickup" bind:value={$teleop.floorPickup} />
		<ToggleButton label="Source Pickup" bind:value={$teleop.sourcePickup} />
	</div>
</PageLayout>
