<script lang="ts">
	export let value: number;
	export let label: string;
</script>

<div class="flex flex-col text-center">
	<h1 class="text-lg">{label}</h1>
	<button
		class="btn btn-md variant-filled-success"
		on:click={() => {
			value += 1;
		}}>+</button
	>
	<button
		class="btn btn-md variant-filled-error"
		on:click={() => {
			value = Math.max(0, value - 1);
		}}>-</button
	>
</div>
