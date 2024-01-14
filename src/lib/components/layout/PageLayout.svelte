<script lang="ts">
	import { MatchPhase } from '$lib/types';
	import { matchPhase } from '$lib/stores';

	export let nextPage: MatchPhase;
	export let disabledNavigation: boolean | undefined = false;
	export let customNavigationAction: () => void = () => {};

	const matchPhaseStringMap = {
		[MatchPhase.PreMatch]: 'Setup',
		[MatchPhase.Autonomous]: 'Auto',
		[MatchPhase.Teleop]: 'Teleop',
		[MatchPhase.PostMatch]: 'Upload'
	};
</script>

<div class="h-full gap-2 flex flex-col">
	<div class="overflow-y-scroll flex flex-col flex-grow gap-2">
		<slot />
	</div>
	<button
		disabled={disabledNavigation}
		class="btn btn-md variant-filled-tertiary"
		class:variant-ghost-tertiary={disabledNavigation}
		on:click={() => {
			customNavigationAction();
			if (nextPage !== undefined) {
				matchPhase.set(nextPage);
			}
		}}
	>
		{matchPhaseStringMap[nextPage]}
	</button>
</div>
