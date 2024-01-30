import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'red1';
const initialValue = browser
	? window.localStorage.getItem('scoutedTeam') ?? defaultValue
	: defaultValue;

const scoutedTeam = writable<string>(initialValue);

scoutedTeam.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('scoutedTeam', value);
	}
});

export default scoutedTeam;
