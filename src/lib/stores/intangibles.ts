import { writable } from 'svelte/store';
import { defaultIntangibles, type Intangibles } from '../game';

const defaultValue = { ...defaultIntangibles };

const initialValue = defaultValue;

const intangibles = writable<Intangibles>(initialValue);

export default intangibles;
