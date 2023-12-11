import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser
	? window.localStorage.getItem('teamNumber') ?? defaultValue
	: defaultValue;

const teamNumber = writable<string>(initialValue);

teamNumber.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('teamNumber', value);
	}
});

export default teamNumber;
