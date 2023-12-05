<script lang="ts">
	type Color = 'red' | 'green';
	export let color: Color = 'green';
	export let disabled: boolean = false;
	export let onClick: () => void = () => {};
	export let type: 'button' | 'submit' | 'reset' = 'button';

	classes = [`bg-${color}-500`, `hover:bg-${color}-600`, `focus:bg-${color}-700`];

	if (disabled) {
		classes.push(`bg-${color}-300`);
		classes.push(`hover:bg-${color}-300`);
		classes.push(`focus:bg-${color}-300`);
	}

	$: classes = classes.join(' ');
</script>

{#if color === 'green'}
	<button
		class="bg-green-500 hover:bg-green-600 active:bg-green-700 text-xl py-4"
		on:click={onClick}
	>
		<slot />
	</button>
{:else if color === 'red'}
	<button class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-xl py-4" on:click={onClick}>
		<slot />
	</button>
{/if}
