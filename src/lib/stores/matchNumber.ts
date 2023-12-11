import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '1';
const initialValue = browser
	? window.localStorage.getItem('matchNumber') ?? defaultValue
	: defaultValue;

const matchNumber = writable<string>(initialValue);

matchNumber.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('matchNumber', value);
	}
});

export default matchNumber;
