<script lang="ts">
	import { teleop, matchNumber, teamNumber, matchPhase } from '$lib/stores';
	import { MatchPhase } from '$lib/types';

	let climbStartTime: number | undefined = undefined;
	let climbEndTime: number | undefined = undefined;
</script>

<div class="w-full flex flex-col gap-4">
	<h1 class="text-2xl text-center">{$teamNumber} - Match {$matchNumber}</h1>
	<h1 class="text-2xl text-center">Teleop</h1>

	<div class="w-full grid grid-cols-3 grid-rows-3">
		<button
			class="btn variant-filled-success row-span-2"
			on:click={() => {
				teleop.update((state) => {
					state.high += 1;
					return state;
				});
			}}>+</button
		>
		<div class="text-xl place-self-center">High</div>
		<button
			class="btn variant-filled-error row-span-2"
			on:click={() => {
				teleop.update((state) => {
					state.highMissed += 1;
					return state;
				});
			}}>+</button
		>
		<div class="row-span-2 text-2xl place-self-center font-mono">
			{$teleop.high}/{$teleop.high + $teleop.highMissed}
		</div>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				teleop.update((state) => {
					if (state.high > 0) state.high -= 1;
					return state;
				});
			}}>-</button
		>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				teleop.update((state) => {
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
				teleop.update((state) => {
					state.low += 1;
					return state;
				});
			}}>+</button
		>
		<div class="text-xl place-self-center">Low</div>
		<button
			class="btn variant-filled-error row-span-2"
			on:click={() => {
				teleop.update((state) => {
					state.lowMissed += 1;
					return state;
				});
			}}>+</button
		>
		<div class="row-span-2 text-2xl place-self-center font-mono">
			{$teleop.low}/{$teleop.low + $teleop.lowMissed}
		</div>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				teleop.update((state) => {
					if (state.low > 0) state.low -= 1;
					return state;
				});
			}}>-</button
		>
		<button
			class="btn variant-filled-surface"
			on:click={() => {
				teleop.update((state) => {
					if (state.lowMissed > 0) state.lowMissed -= 1;
					return state;
				});
			}}>-</button
		>
	</div>

	<div class="flex flex-col gap-4">
		<button
			class="btn variant-outline-primary"
			class:variant-filled-primary={climbStartTime === undefined}
			on:click={() => {
				climbStartTime = Date.now();
			}}>Climb Start</button
		>
		{#if climbStartTime !== undefined}
			<button
				class="btn variant-outline-surface"
				class:variant-filled-surface={$teleop.climbTraverse}
				on:click={() => {
					climbEndTime = Date.now();
					teleop.update((state) => {
						if (climbStartTime && climbEndTime) {
							state.climbTime = (climbEndTime - climbStartTime) / 1000;
						}
						state.climbTraverse = true;
						state.climbHigh = false;
						state.climbMid = false;
						state.climbLow = false;
						state.climbAttempt = true;
						return state;
					});
				}}>Traversal</button
			>
			<button
				class="btn variant-outline-surface"
				class:variant-filled-surface={$teleop.climbHigh}
				on:click={() => {
					climbEndTime = Date.now();
					teleop.update((state) => {
						if (climbStartTime && climbEndTime) {
							state.climbTime = (climbEndTime - climbStartTime) / 1000;
						}
						state.climbTraverse = false;
						state.climbHigh = true;
						state.climbMid = false;
						state.climbLow = false;
						state.climbAttempt = true;
						return state;
					});
				}}>High</button
			>
			<button
				class="btn variant-outline-surface"
				class:variant-filled-surface={$teleop.climbMid}
				on:click={() => {
					climbEndTime = Date.now();
					teleop.update((state) => {
						if (climbStartTime && climbEndTime) {
							state.climbTime = (climbEndTime - climbStartTime) / 1000;
						}
						state.climbTraverse = false;
						state.climbHigh = false;
						state.climbMid = true;
						state.climbLow = false;
						state.climbAttempt = true;
						return state;
					});
				}}>Mid</button
			>
			<button
				class="btn variant-outline-surface"
				class:variant-filled-surface={$teleop.climbLow}
				on:click={() => {
					climbEndTime = Date.now();
					teleop.update((state) => {
						if (climbStartTime && climbEndTime) {
							state.climbTime = (climbEndTime - climbStartTime) / 1000;
						}
						state.climbTraverse = false;
						state.climbHigh = false;
						state.climbMid = false;
						state.climbLow = true;
						state.climbAttempt = true;
						return state;
					});
				}}>Low</button
			>
			<button
				class="btn variant-outline-surface"
				class:variant-filled-surface={!$teleop.climbTraverse &&
					!$teleop.climbHigh &&
					!$teleop.climbMid &&
					!$teleop.climbLow}
				on:click={() => {
					teleop.update((state) => {
						state.climbTraverse = false;
						state.climbHigh = false;
						state.climbMid = false;
						state.climbLow = false;
						state.climbAttempt = true;
						return state;
					});
				}}>None</button
			>
		{/if}
		{#if $teleop.climbTime}
			<div class="text-center text-xl">
				Climb Time: {$teleop.climbTime}s
			</div>
		{/if}
	</div>
	<div>
		<button
			class="btn variant-filled-primary"
			on:click={() => {
				matchPhase.set(MatchPhase.PostMatch);
			}}>Finish Match</button
		>
	</div>
</div>
