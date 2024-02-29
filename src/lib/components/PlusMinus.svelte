<script lang="ts">
	import { hapticBuzz, hapticBuzzLong, hapticInvalid } from '$lib/haptic';
	import { createEventDispatcher } from 'svelte';

	export let value: number;
	export let label: string;
	export let showValue: boolean = false;
	export let horizontal: boolean = false;

	const dispatch = createEventDispatcher();
</script>

{#if !horizontal}
	<div class="flex flex-col text-center">
		<h1 class="text-lg">{label}</h1>
		<button
			class="btn btn-xl text-5xl variant-filled-tertiary"
			on:click={() => {
				value += 1;
				dispatch('increment', { value });
				hapticBuzz();
			}}>+</button
		>
		{#if showValue}
			<h1 class="text-lg">{value}</h1>
		{/if}
		<button
			class="btn btn-sm text-4xl variant-filled-primary"
			on:click={() => {
				if (value === 0) {
					hapticInvalid();
				} else {
					hapticBuzzLong();
				}
				dispatch('decrement', { value });
				value = Math.max(0, value - 1);
			}}>-</button
		>
	</div>
{/if}

{#if horizontal}
	<div class="flex flex-col text-center">
		<h1 class="text-lg">{label}</h1>
		<div class="flex flex-row justify-center">
			<button
				class="btn btn-sm text-5xl px-8 variant-filled-primary"
				on:click={() => {
					if (value === 0) {
						hapticInvalid();
					} else {
						hapticBuzzLong();
					}
					value = Math.max(0, value - 1);
				}}>-</button
			>
			{#if showValue}
				<div class="flex flex-col flex-grow justify-center align-middle">
					<h1 class="text-3xl">{value}</h1>
				</div>
			{/if}
			<button
				class="btn btn-xl text-5xl px-8 variant-filled-tertiary"
				on:click={() => {
					value += 1;
					hapticBuzz();
				}}>+</button
			>
		</div>
	</div>
{/if}
