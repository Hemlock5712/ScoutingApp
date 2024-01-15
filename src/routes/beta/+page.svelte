<script lang="ts">
	import AppLayout from '../../lib/components/layout/AppLayout.svelte';
	import PreEvent from '$lib/gameStates/beta/PreEvent.svelte';
	import PreMatch from '$lib/gameStates/beta/PreMatch.svelte';
	import Autonomous from '$lib/gameStates/beta/Autonomous.svelte';
	import Teleop from '$lib/gameStates/beta/Teleop.svelte';
	import PostMatch from '$lib/gameStates/beta/PostMatch.svelte';

	import { matchPhase } from '$lib/stores';
	import { MatchPhase } from '$lib/types';

	const matchPhases = {
		[MatchPhase.PreEvent]: PreEvent,
		[MatchPhase.PreMatch]: PreMatch,
		[MatchPhase.Autonomous]: Autonomous,
		[MatchPhase.Teleop]: Teleop,
		[MatchPhase.PostMatch]: PostMatch
	};
</script>

<AppLayout>
	<svelte:component this={matchPhases[$matchPhase]} />
</AppLayout>
