<script lang="ts">
	import type { EventStatistics, TinderTeam } from '../../types';
	import RadarChart from './RadarChart.svelte';

	export let team: TinderTeam;
	export let eventStats: EventStatistics;
</script>

<div class="p-8">
	<div class="flex flex-col">
		{#if team.photo_url !== ''}
			<img src={team.photo_url} alt="Team" />
		{/if}
		<h1 class="text-3xl font-bold">{team.team_number}</h1>
		<p class="text-xl">{team.nickname}</p>
	</div>
	<div class="flex flex-col">
		<RadarChart
			labels={['Auto', 'Amp', 'Speaker', 'Trap', 'Endgame']}
			data={[
				team.autonScoredGamePieces.average,
				team.teleopAmpGamePieces.average,
				team.teleopSpeakerGamePieces.average,
				team.trap.average,
				team.endgameClimbPercent.average
			]}
			mutedData={[
				eventStats.autonScoredGamePieces.average,
				eventStats.teleopAmpGamePieces.average,
				eventStats.teleopSpeakerGamePieces.average,
				eventStats.trap.average,
				eventStats.endgameClimbPercent.average
			]}
			maxValues={[
				eventStats.autonScoredGamePieces.max,
				eventStats.teleopAmpGamePieces.max,
				eventStats.teleopSpeakerGamePieces.max,
				eventStats.trap.max,
				eventStats.endgameClimbPercent.max
			]}
		/>
	</div>
</div>
