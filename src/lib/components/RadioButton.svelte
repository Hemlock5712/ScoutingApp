<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import ToggleButton from './ToggleButton.svelte';
	import type { ButtonVariants } from '../types';

	export let label: string = '';
	export let buttons: string[] = [];
	export let buttonText: string[] = buttons;
	export let buttonColors: ButtonVariants[] = buttons.map(() => 'primary');
	let isButtonSelected: boolean[] = buttons.map(() => false);
	export let selected: string = '';

	const dispatch = createEventDispatcher();

	onMount(() => {
		console.log(selected);
		if (selected !== '') {
			const buttonIndex = buttons.indexOf(selected);
			isButtonSelected[buttonIndex] = true;
		}
	});

	$: {
		selected = buttons[isButtonSelected.indexOf(true)];
	}
</script>

<div class="flex flex-col gap-2">
	{#if label !== ''}
		<p>{label}</p>
	{/if}
	<div class="flex flex-row justify-center gap-4">
		{#each buttons as button, i}
			<!-- <ToggleButton label={button} bind:value={selected} /> -->
			<ToggleButton
				label={buttonText[i]}
				value={isButtonSelected[i]}
				color={buttonColors[i]}
				on:toggled={(value) => {
					if (value.detail.value === true) {
						isButtonSelected = isButtonSelected.map(() => false);
						isButtonSelected[i] = true;
						dispatch('select', { value: button });
					}
				}}
			/>
		{/each}
	</div>
</div>
