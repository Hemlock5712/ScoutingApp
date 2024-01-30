<script lang="ts">
	import '../style.css';
	// Initialize popups
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
	<title>Gray Matter Scouting</title>
</svelte:head>

<Toast />

<main class="min-h-screen w-full flex items-center flex-col">
	<slot />
</main>
