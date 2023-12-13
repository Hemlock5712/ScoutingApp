import { writable } from 'svelte/store';
import { defaultTeleop, type TeleopState } from '../game';

const defaultValue = {...defaultTeleop};

const initialValue = defaultValue;

const teleop = writable<TeleopState>(initialValue);

export default teleop;
