<script lang="ts">
	import { onMount } from 'svelte';
	import Page from '../+page.svelte';
	import PageHeader from '../../lib/components/PageHeader.svelte';
	import { getAllMatchesFromStore, type MatchStorage } from '../../lib/data/webMatchStorage';
	import PageLayout from '../../lib/components/layout/PageLayout.svelte';
	import ToggleButton from '../../lib/components/ToggleButton.svelte';
	import MatchQrCode from '../../lib/components/repair/MatchQRCode.svelte';

	let scoutedMatches: MatchStorage[] = [];

	onMount(async () => {
		const matches = await getAllMatchesFromStore();
		console.log(matches);
		scoutedMatches = matches;
	});
</script>

<PageHeader headerText="Reupload matches" hideMatchInfo />
<PageLayout>
	{#each scoutedMatches as match}
		<MatchQrCode {match} />
	{/each}
</PageLayout>
