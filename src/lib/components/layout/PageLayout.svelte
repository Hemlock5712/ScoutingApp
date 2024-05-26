<script lang="ts">
	import { MatchPhase } from '$lib/types';
	import { matchPhase } from '$lib/stores';

	export let nextPage: MatchPhase | undefined = undefined;
	export let disabledNavigation: boolean | undefined = false;
	export let customNavigationAction: () => void = () => {};

	const matchPhaseStringMap = {
		[MatchPhase.PreEvent]: 'Pre-Event',
		[MatchPhase.PreMatch]: 'Match Setup',
		[MatchPhase.Autonomous]: 'Auto',
		[MatchPhase.Teleop]: 'Teleop',
		[MatchPhase.Endgame]: 'Endgame',
		[MatchPhase.PostMatch]: 'Upload'
	};
</script>

<div class="h-full gap-2 flex flex-col">
	<div class="overflow-y-scroll flex flex-col flex-grow gap-2 pt-2">
		<slot />
	</div>
	{#if nextPage}
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
	{/if}
</div>
