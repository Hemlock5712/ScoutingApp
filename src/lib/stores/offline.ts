import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = false;
const initialValue = browser
	? window.localStorage.getItem('offlineMode') === 'true' ?? defaultValue
	: defaultValue;

const offlineMode = writable<boolean>(initialValue);

offlineMode.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('offlineMode', value.toString());
	}
});

export default offlineMode;
