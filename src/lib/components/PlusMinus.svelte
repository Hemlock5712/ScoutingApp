<script lang="ts">
	import { hapticBuzz, hapticBuzzLong, hapticInvalid } from '$lib/haptic';

	export let value: number;
	export let label: string;
</script>

<div class="flex flex-col text-center">
	<h1 class="text-lg">{label}</h1>
	<button
		class="btn btn-xl text-5xl variant-filled-tertiary"
		on:click={() => {
			value += 1;
			hapticBuzz();
		}}>+</button
	>
	<button
		class="btn btn-sm text-4xl variant-filled-primary"
		on:click={() => {
			if (value === 0) {
				hapticInvalid();
			} else {
				hapticBuzzLong();
			}
			value = Math.max(0, value - 1);
		}}>-</button
	>
</div>
