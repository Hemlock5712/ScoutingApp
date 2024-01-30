<script lang="ts">
	import type { TinderTeam } from '../../types';

	export let team: TinderTeam;
</script>

<div class="flex flex-col">
	<img src={team.photo_url} alt="Team" />
</div>
