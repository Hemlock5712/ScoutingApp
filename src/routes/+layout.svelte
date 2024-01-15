<script lang="ts">
	import '../style.css';
	// Initialize popups
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<main class="min-h-screen w-full flex items-center flex-col">
	<slot />
</main>
