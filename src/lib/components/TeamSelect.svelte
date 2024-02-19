<script lang="ts">
	import {
		Autocomplete,
		type AutocompleteOption,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { ScheduledMatch } from '$lib/types';
	import { matchNumber, teamNumber, scheduledMatches, scoutedTeam } from '$lib/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';

	export let title = 'Team Number';
	export let value: string;

	let teamListForMatch: AutocompleteOption<string>[] = [];
	let teams: string[] = [];

	const indexToStationMap: { [key: number]: string } = {
		0: 'Red 1',
		1: 'Red 2',
		2: 'Red 3',
		3: 'Blue 1',
		4: 'Blue 2',
		5: 'Blue 3'
	};

	onMount(() => {
		const matchesUnsub = scheduledMatches.subscribe((matches) => {
			const matchNumUnsub = matchNumber.subscribe((matchNum) => {
				const match = matches.find((m) => m.match_number === parseInt(matchNum));
				if (match === undefined) {
					return [];
				}
				teams = [...match.red, ...match.blue];
				teamListForMatch = teams.map((t, i) => ({
					value: t.toString(),
					label: `${indexToStationMap[i]}: ${t.toString()}`
				}));
			});

			return () => {
				matchNumUnsub();
			};
		});

		return () => {
			matchesUnsub();
		};
	});

	$: {
		if (teams.length === 6) {
			const station = $scoutedTeam;

			switch (station) {
				case 'red1':
					teamNumber.set(teams[0]);
					break;
				case 'red2':
					teamNumber.set(teams[1]);
					break;
				case 'red3':
					teamNumber.set(teams[2]);
					break;
				case 'blue1':
					teamNumber.set(teams[3]);
					break;
				case 'blue2':
					teamNumber.set(teams[4]);
					break;
				case 'blue3':
					teamNumber.set(teams[5]);
					break;
			}
		}
	}

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
