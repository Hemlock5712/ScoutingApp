<script lang="ts">
	import { matchNumber, teamNumber, matchPhase } from '$lib/stores';
	import { MatchPhase } from '$lib/types';

	export let hideMatchInfo: boolean = false;
	export let headerText: string = '';

	export let previousPage: MatchPhase | undefined = undefined;
	export let nextPage: MatchPhase | undefined = undefined;

	export let previousPageLink: string | undefined = undefined;
	export let previousPageText: string | undefined = undefined;

	const matchPhaseStringMap = {
		[MatchPhase.PreEvent]: 'Pre-Event',
		[MatchPhase.PreMatch]: 'Setup',
		[MatchPhase.Autonomous]: 'Auto',
		[MatchPhase.Teleop]: 'Teleop',
		[MatchPhase.Endgame]: 'Endgame',
		[MatchPhase.PostMatch]: 'Upload'
	};
</script>

<div class="grid grid-cols-4 w-full">
	{#if !hideMatchInfo}
		<div class="text-2xl font-mono col-span-4 text-center">
			{$teamNumber} - Match {$matchNumber}
		</div>
	{/if}
	<div id="previous-button" class="">
		{#if previousPage !== undefined}
			<button
				class="btn btn-md variant-outline-tertiary whitespace-break-spaces"
				on:click={() => {
					if (previousPage !== undefined) {
						matchPhase.set(previousPage);
					}
				}}
			>
				{matchPhaseStringMap[previousPage]}
			</button>
		{/if}
		{#if previousPageLink !== undefined}
			<a href={previousPageLink}>
				<button class="btn btn-md variant-outline-tertiary whitespace-break-spaces"
					>{previousPageText ?? 'Scout'}</button
				>
			</a>
		{/if}
	</div>
	<div id="header-text" class="flex flex-col text-center col-span-2 justify-center">
		<div class="text-2xl font-mono">
			{headerText}
		</div>
	</div>
	<div id="next-button" class="">
		{#if nextPage !== undefined}
			<button
				class="btn btn-md variant-outline-tertiary whitespace-break-spaces"
				on:click={() => {
					if (nextPage !== undefined) {
						matchPhase.set(nextPage);
					}
				}}
			>
				{matchPhaseStringMap[nextPage]}
			</button>
		{/if}
	</div>
</div>
