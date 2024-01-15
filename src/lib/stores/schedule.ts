import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { ScheduledMatch } from '../types';

const defaultValue: ScheduledMatch[] = [];

let localStorageValue;
let parsedLocalStorageValue: ScheduledMatch[] = [];

if (browser) {
	localStorageValue = window.localStorage.getItem('matchSchedule');
	if (localStorageValue) {
		parsedLocalStorageValue = JSON.parse(localStorageValue) as ScheduledMatch[];
	}
}

const initialValue = browser ? parsedLocalStorageValue ?? defaultValue : defaultValue;

const activeEvent = writable<ScheduledMatch[]>(initialValue);

activeEvent.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('matchSchedule', JSON.stringify(value));
	}
});

export default activeEvent;
