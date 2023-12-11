<script lang="ts">
	import { autonomous, matchNumber, matchPhase, teamNumber } from '$lib/stores';
	import { MatchPhase } from '../types';
</script>

<div class="w-full flex flex-col gap-4">
	<h1 class="text-2xl text-center">{$teamNumber} - Match {$matchNumber}</h1>
	<h1 class="text-2xl text-center">Autonomous</h1>
	<div class="grid grid-cols-2">
		<button
			class="btn variant-outline-success"
			class:variant-filled-success={$autonomous.taxi}
			on:click={() => {
				autonomous.update((state) => {
					state.taxi = true;
					return state;
				});
			}}>Taxi</button
		>
		<button
			class="btn variant-outline-error"
			class:variant-filled-error={!$autonomous.taxi}
			on:click={() => {
				autonomous.update((state) => {
					state.taxi = false;
					return state;
				});
			}}>No Taxi</button
		>
	</div>
	<div class="w-full grid grid-cols-3 grid-rows-3">
		<button
			class="btn variant-filled-success row-span-2"
			on:click={() => {
				autonomous.update((state) => {
					state.high += 1;
					return state;
				});
			}}>+</button
		>
		<div class="text-xl place-self-center">High</div>
		<button
			class="btn variant-filled-error row-span-2"
			on:click={() => {
				autonomous.update((state) => {
					state.highMissed += 1;
					return state;
				});
			}}>+</button
		>
		<div class="row-span-2 text-2xl place-self-center font-mono">
			{$autonomous.high}/{$autonomous.high + $autonomous.highMissed}
		</div>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				autonomous.update((state) => {
					if (state.high > 0) state.high -= 1;
					return state;
				});
			}}>-</button
		>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				autonomous.update((state) => {
					if (state.highMissed > 0) state.highMissed -= 1;
					return state;
				});
			}}>-</button
		>
	</div>
	<div class="w-full grid grid-cols-3 grid-rows-3">
		<button
			class="btn variant-filled-success row-span-2"
			on:click={() => {
				autonomous.update((state) => {
					state.low += 1;
					return state;
				});
			}}>+</button
		>
		<div class="text-xl place-self-center">Low</div>
		<button
			class="btn variant-filled-error row-span-2"
			on:click={() => {
				autonomous.update((state) => {
					state.lowMissed += 1;
					return state;
				});
			}}>+</button
		>
		<div class="row-span-2 text-2xl place-self-center font-mono">
			{$autonomous.low}/{$autonomous.low + $autonomous.lowMissed}
		</div>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				autonomous.update((state) => {
					if (state.low > 0) state.low -= 1;
					return state;
				});
			}}>-</button
		>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				autonomous.update((state) => {
					if (state.lowMissed > 0) state.lowMissed -= 1;
					return state;
				});
			}}>-</button
		>
	</div>
	<div>
		<button
			class="btn variant-filled-primary w-full"
			on:click={() => {
				matchPhase.set(MatchPhase.Teleop);
			}}>Teleop</button
		>
	</div>
</div>
