<script lang="ts">
	export let title: string;
	export let value: string;
</script>

<label class="label">
	<span>{title}</span>
	<input class="input" type="text" placeholder={title} {title} bind:value />
</label>
