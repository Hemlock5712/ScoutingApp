<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import HitMiss from '$lib/components/HitMiss.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';

	import { MatchPhase } from '$lib/types';
	import { autonomous } from '$lib/stores';
	import PlusMinus from '../../components/PlusMinus.svelte';
	import RadioButton from '../../components/RadioButton.svelte';

	$: {
		if ($autonomous.leave === false) {
			autonomous.set({ ...$autonomous, leave: $autonomous.pickedUpFromMiddle > 0 });
		}
	}
</script>

<PageHeader headerText="Autonomous" previousPage={MatchPhase.PreMatch} />
<PageLayout nextPage={MatchPhase.Teleop}>
	<!-- Components for the page go here -->
	<HitMiss label="Speaker" bind:hit={$autonomous.speakerHit} bind:miss={$autonomous.speakerMiss} />
	<HitMiss label="Amp" bind:hit={$autonomous.ampHit} bind:miss={$autonomous.ampMiss} />
	<div class="grid grid-cols-2 text-3xl">
		<PlusMinus label="# Picked Up From Middle" bind:value={$autonomous.pickedUpFromMiddle} />
		<div class="text-center justify-center flex-col">{$autonomous.pickedUpFromMiddle}</div>
	</div>
	<ToggleButton label="Leave" bind:value={$autonomous.leave} />
	<RadioButton buttons={['Amp Side', 'Middle', 'Source Side']} />
</PageLayout>
