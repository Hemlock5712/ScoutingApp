<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let onConfirm: () => void = () => {};
	export let onCancel: () => void = () => {};

	export let confirmText = 'Yes';
	export let cancelText = 'No';

	export let buttonText: string;

	const popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupConfirmDialog',
		placement: 'bottom'
	};
</script>

<button class="btn btn-lg variant-filled-warning" use:popup={popupSettings}>{buttonText}</button>
<div data-popup="popupConfirmDialog" class="card max-w-xs p-4 shadow-xl">
	<div class="flex flex-col gap-4">
		<p>
			<slot />
		</p>
		<div class="flex gap-4 justify-end">
			<button class="btn btn-md variant-outline-warning" on:click={onConfirm}>{confirmText}</button>
			<button class="btn btn-md variant-filled-tertiary px-8" on:click={onCancel}
				>{cancelText}</button
			>
		</div>
	</div>
	<div class="arrow bg-surface-100-800-token"></div>
</div>
