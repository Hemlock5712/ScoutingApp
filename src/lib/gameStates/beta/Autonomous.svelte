<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import HitMiss from '$lib/components/HitMiss.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';

	import { MatchPhase } from '$lib/types';
	import { autonomous, teleop } from '$lib/stores';
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
	<HitMiss
		label="Speaker"
		bind:hit={$autonomous.speakerHit}
		bind:miss={$autonomous.speakerMiss}
		on:increment={(event) => {
			if (event.detail.value > 1) {
				$teleop.floorPickup = true;
			}
		}}
	/>
	<HitMiss
		label="Amp"
		bind:hit={$autonomous.ampHit}
		bind:miss={$autonomous.ampMiss}
		on:increment={(event) => {
			if (event.detail.value > 1) {
				$teleop.floorPickup = true;
			}
		}}
	/>
	<PlusMinus
		label="Picked up from Middle"
		bind:value={$autonomous.pickedUpFromMiddle}
		horizontal
		showValue
	/>
	<ToggleButton label="Leave" bind:value={$autonomous.leave} />
	<RadioButton
		selected={$autonomous.startLocation}
		buttons={['AMP', 'MIDDLE', 'SOURCE']}
		buttonText={['Amp Side', 'Middle', 'Source Side']}
	/>
</PageLayout>
