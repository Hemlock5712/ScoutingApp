<script lang="ts">
	import PlusMinus from '$lib/components/PlusMinus.svelte';

	export let label: string;
	export let hit: number;
	export let miss: number;
	export let max: number = 200;
</script>

<div class="grid grid-cols-4 w-full">
	<PlusMinus label="Miss" bind:value={miss} {max} totalCount={hit + miss} />
	<div class="flex flex-col justify-center col-span-2 text-center">
		<h1 class="text-xl">{label}</h1>
		<h1 class="text-2xl">{hit} / {hit + miss}</h1>
	</div>
	<PlusMinus label="Hit" bind:value={hit} {max} totalCount={hit + miss} />
</div>
