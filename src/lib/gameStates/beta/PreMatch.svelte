<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';

	import NumberInput from '$lib/components/NumberInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import TeamSelect from '$lib/components/TeamSelect.svelte';
	import RadioButton from '$lib/components/RadioButton.svelte';
	import { matchNumber, teamNumber, scouterName, teleop } from '$lib/stores';
	import { MatchPhase } from '$lib/types';
</script>

<PageHeader headerText="Match Setup" hideMatchInfo={true} previousPage={MatchPhase.PreEvent} />
<PageLayout nextPage={MatchPhase.Autonomous}>
	<!-- Components for the page go here -->
	<NumberInput title="Match Number" bind:value={$matchNumber} />
	<TeamSelect bind:value={$teamNumber} />
	<TextInput title="Scouter Name" bind:value={$scouterName} />
	<RadioButton
		label="Human Player Position"
		buttons={['Source', 'Amp']}
		on:select={(event) => {
			console.log(event.detail.value);
			teleop.set({ ...$teleop, humanPlayerAtAmp: event.detail.value === 'Amp' });
		}}
	/>
</PageLayout>
