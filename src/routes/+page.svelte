<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { toDataURL } from 'qrcode';
	import { gzipSync, strToU8 } from 'fflate';
	import qrcode from 'qrcode';
	let preMatch = true;
	let autonomous = true;
	let matchState = {
		matchNumber: undefined,
		teamNumber: undefined,
		scouterName: '',
		autonomous: {
			high: {
				cubes: 0,
				cones: 0
			},
			mid: {
				cubes: 0,
				cones: 0
			},
			low: {
				cubes: 0,
				cones: 0
			}
		},
		teleop: {
			high: {
				cubes: 0,
				cones: 0
			},
			mid: {
				cubes: 0,
				cones: 0
			},
			low: {
				cubes: 0,
				cones: 0
			}
		}
	};

	function base64EncodedMatch() {
		return btoa(JSON.stringify(matchState));
	}

	function compressedMatch(): string {
		const buffer = gzipSync(strToU8(JSON.stringify(matchState)));
		return btoa(String.fromCharCode(...buffer));
	}

	$: gameState = autonomous ? matchState.autonomous : matchState.teleop;
	let qrCodeData: string = '';
</script>

<div class="flex flex-col">
	<div class="w-full grid grid-cols-3 gap-2">
		<Button
			color={preMatch ? 'green' : 'red'}
			onClick={() => {
				preMatch = true;
			}}>Setup</Button
		>
		<Button
			color={!preMatch && autonomous ? 'green' : 'red'}
			onClick={() => {
				preMatch = false;
				autonomous = true;
			}}>Auto</Button
		>
		<Button
			color={!preMatch && !autonomous ? 'green' : 'red'}
			onClick={() => {
				preMatch = false;
				autonomous = false;
			}}>Teleop</Button
		>
	</div>
	{#if preMatch}
		<div class="w-full grid grid-cols-2 gap-2">
			<div class="w-full text-center text-xl col-span-2">Match Setup</div>
			<label for="matchNumber">Match Number</label>
			<input
				id="matchNumber"
				type="text"
				class="text-xl p-1 bg-blue-500 text-white placeholder:text-slate-300"
				placeholder="1"
				bind:value={matchState.matchNumber}
			/>
			<label for="teamNumber">Team Number</label>
			<input
				id="teamNumber"
				type="text"
				class="text-xl p-1 bg-blue-500 text-white placeholder:text-slate-300"
				placeholder="5712"
				bind:value={matchState.teamNumber}
			/>
			<label for="scouterName">Scouter Name</label>
			<input
				id="scouterName"
				type="text"
				class="text-xl p-1 bg-blue-500 text-white placeholder:text-slate-300"
				placeholder=""
				bind:value={matchState.scouterName}
			/>
		</div>
	{:else}
		<div class="w-full text-center text-xl">High</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.high.cubes++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">Cubes: {gameState.high.cubes}</div>
			<Button
				onClick={() => {
					gameState.high.cubes--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.high.cones++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">Cones: {gameState.high.cones}</div>
			<Button
				onClick={() => {
					gameState.high.cones--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full text-center text-xl">Mid</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.mid.cubes++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">
				Cubes: {gameState.mid.cubes}
			</div>
			<Button
				onClick={() => {
					gameState.mid.cubes--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.mid.cones++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">Cones: {gameState.mid.cones}</div>
			<Button
				onClick={() => {
					gameState.mid.cones--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full text-center text-xl">Low</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.low.cubes++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">Cubes: {gameState.low.cubes}</div>
			<Button
				onClick={() => {
					gameState.low.cubes--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full grid grid-rows-1 grid-cols-4">
			<Button
				onClick={() => {
					gameState.low.cones++;
				}}
				color="green">+</Button
			>
			<div class="place-content-center text-2xl grid col-span-2">Cones: {gameState.low.cones}</div>
			<Button
				onClick={() => {
					gameState.low.cones--;
				}}
				color="red">-</Button
			>
		</div>
		<div class="w-full">
			<button
				class="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 w-full p-4 text-2xl text-black"
				on:click={async () => {
					console.log(matchState);
					qrCodeData = compressedMatch();
					console.log(qrCodeData);
				}}>Complete Match</button
			>
		</div>
	{/if}

	{#if qrCodeData}
		{#await qrcode.toDataURL(qrCodeData, { errorCorrectionLevel: 'L' }) then qrcode}
			<div class="w-full">
				<img class="w-full" src={qrcode} alt="" />
			</div>
		{/await}
	{/if}
</div>
