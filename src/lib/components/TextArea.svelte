<script lang="ts">
	export let title: string;
	export let value: string;
</script>

<label class="label">
	<span>{title}</span>
	<textarea class="textarea" placeholder={title} {title} bind:value />
</label>
