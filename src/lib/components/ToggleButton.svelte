<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: boolean;
	export let label: string;

	const dispatch = createEventDispatcher();
</script>

<button
	class="btn btn-md variant-outline-success"
	class:variant-filled-success={value}
	on:click={() => {
		value = !value;
		dispatch('toggled', {
			value: value
		});
	}}>{label}</button
>
