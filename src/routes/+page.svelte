<script lang="ts">
	import PreMatch from '$lib/gameStates/PreMatch.svelte';
	import Autonomous from '$lib/gameStates/Autonomous.svelte';
	import { matchPhase } from '$lib/stores';
	import { MatchPhase } from '$lib/types';
	import Teleop from '$lib/gameStates/Teleop.svelte';
	import PostMatch from '$lib/gameStates/PostMatch.svelte';
</script>

<div class="px-4 h-full w-full max-w-xl">
	{#if $matchPhase === MatchPhase.PreMatch}
		<PreMatch />
	{:else if $matchPhase === MatchPhase.Autonomous}
		<Autonomous />
	{:else if $matchPhase === MatchPhase.Teleop}
		<Teleop />
	{:else if $matchPhase === MatchPhase.PostMatch}
		<PostMatch />
	{/if}
</div>
