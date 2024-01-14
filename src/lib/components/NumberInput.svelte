<script lang="ts">
	export let title: string;
	export let value: string;
</script>

<label class="label">
	<span>{title}</span>
	<input class="input" inputmode="numeric" type="text" placeholder={title} {title} bind:value />
</label>
