<script lang="ts">
	import {
		Autocomplete,
		type AutocompleteOption,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { ScheduledMatch } from '$lib/types';
	import { matchNumber, teamNumber, scheduledMatches } from '$lib/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	export let title = 'Team Number';
	export let value: string;

	let teamListForMatch: AutocompleteOption<string>[] = [];

	onMount(() => {
		const matchesUnsub = scheduledMatches.subscribe((matches) => {
			const matchNumUnsub = matchNumber.subscribe((matchNum) => {
				const match = matches.find((m) => m.match_number === parseInt(matchNum));
				if (match === undefined) {
					return [];
				}
				const teams = [...match.red, ...match.blue];
				teamListForMatch = teams
					.sort((a, b) => parseInt(a) - parseInt(b))
					.map((t) => ({ value: t.toString(), label: t.toString() }));
			});

			return () => {
				matchNumUnsub();
			};
		});

		return () => {
			matchesUnsub();
		};
	});

	const popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom-start'
	};

	scheduledMatches.subscribe((matches) => {
		console.log(matches);
	});
</script>

<label class="label">
	<span>{title}</span>
	<input
		class="input autocomplete"
		type="text"
		placeholder={title}
		{title}
		bind:value
		use:popup={popupSettings}
	/>
	<div
		data-popup="popupAutocomplete"
		class="card max-w-xs max-h-72 p-4 overflow-y-auto"
		tabindex="-1"
	>
		<Autocomplete
			bind:input={value}
			options={teamListForMatch}
			on:selection={(event) => {
				teamNumber.set(event.detail.value);
			}}
		/>
	</div>
</label>
