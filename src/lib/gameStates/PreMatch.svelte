<script lang="ts">
	import { matchPhase, matchNumber, teamNumber, scouterName } from '$lib/stores';
	import { MatchPhase, type MatchState } from '../types';
</script>

<div class="flex flex-col h-full gap-4">
	<label class="label">
		<span>Match Number</span>
		<input
			class="input"
			type="text"
			placeholder="Match Number"
			title="Match Number"
			bind:value={$matchNumber}
		/>
	</label>
	<label class="label">
		<span>Team Number</span>
		<input
			class="input"
			type="text"
			placeholder="Team Number"
			title="Team Number"
			bind:value={$teamNumber}
		/>
	</label>
	<label class="label">
		<span>Scouter Name</span>
		<input
			class="input"
			type="text"
			placeholder="Scouter Name"
			title="Scouter Name"
			bind:value={$scouterName}
		/>
	</label>
	<button
		class="btn btn-lg variant-filled align-self-end mt-4"
		on:click={() => matchPhase.set(MatchPhase.Autonomous)}>Autonomous</button
	>
</div>
