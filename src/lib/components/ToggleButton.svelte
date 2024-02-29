<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ButtonVariants } from '$lib/types';

	export let value: boolean;
	export let label: string;
	export let color: ButtonVariants = 'success';

	$: activeClass = value ? `variant-filled-${color}` : `variant-outline-${color}`;

	const dispatch = createEventDispatcher();
</script>

<button
	class={`btn btn-lg text-xl ${activeClass}`}
	on:click={() => {
		value = !value;
		dispatch('toggled', {
			value: value
		});
	}}>{label}</button
>
