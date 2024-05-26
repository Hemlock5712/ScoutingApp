<script lang="ts">
	function simulateEvent() {
		fetch('/admin/api/sim/event', { method: 'POST' });
	}
</script>

<button class="btn btn-xl" on:click={simulateEvent}>Simulate Event</button>
