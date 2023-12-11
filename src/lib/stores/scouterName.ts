import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser
	? window.localStorage.getItem('scouterName') ?? defaultValue
	: defaultValue;

const scouterName = writable<string>(initialValue);

scouterName.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('scouterName', value);
	}
});

export default scouterName;
