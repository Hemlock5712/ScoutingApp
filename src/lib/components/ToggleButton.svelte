<script lang="ts">
	export let value: boolean;
	export let label: string;
</script>

<button
	class="btn btn-md variant-outline-success"
	class:variant-filled-success={value}
	on:click={() => {
		value = !value;
	}}>{label}</button
>
