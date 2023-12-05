<script lang="ts">
	import { gunzipSync, strFromU8, strToU8 } from 'fflate';
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';

	let videoRef: HTMLVideoElement;
	let scannedData: string;

	onMount(() => {
		const scanner = new QrScanner(
			videoRef!,
			(result) => {
				console.log('decoded qr code:', result);
				const gzipped = atob(result.data);
				console.log(gzipped);
				const unzipped = strFromU8(gunzipSync(strToU8(gzipped, true)));
				console.log('unzipped:', unzipped);
				scannedData = JSON.parse(unzipped);
			},
			{
				highlightCodeOutline: true,
				highlightScanRegion: true
			}
		);
		scanner.start();
	});
</script>

<video bind:this={videoRef}></video>

{#if scannedData}
	<pre>
        <code>{JSON.stringify(scannedData, null, 2)}</code>
    </pre>
{/if}
