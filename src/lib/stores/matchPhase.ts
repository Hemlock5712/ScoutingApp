import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { MatchPhase } from '../types';

const defaultValue = MatchPhase.PreMatch;
const localStorageValue = browser
	? MatchPhase[
			(window.localStorage.getItem('matchPhase') ?? defaultValue) as keyof typeof MatchPhase
	  ]
	: defaultValue;
const initialValue = localStorageValue;

const matchPhase = writable<MatchPhase>(initialValue);

matchPhase.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('matchPhase', value);
	}
});

export default matchPhase;
