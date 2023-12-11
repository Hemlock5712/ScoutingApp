import { writable } from 'svelte/store';
import { defaultAutonomous, type AutonomousState } from '../game';

const defaultValue = defaultAutonomous;

const initialValue = defaultValue;

const autonomous = writable<AutonomousState>(initialValue);

export default autonomous;
