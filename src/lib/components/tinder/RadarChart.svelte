<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { myCustomTheme as theme } from '../../theme';

	export let labels: string[] = [];
	export let data: number[] = [];
	export let mutedData: number[] = [];
	export let maxValues: number[] = [];

	let ctx;
	let chartCanvas: HTMLCanvasElement;

	function getChartData() {
		return {
			labels: labels,
			datasets: [
				{
					label: 'Team Average',
					data: normalizeDataToMaxValues(data),
					backgroundColor: `rgba(${theme.properties['--color-primary-200']
						.split(' ')
						.join(',')}, 0.5)`,
					borderColor: `rgba(${theme.properties['--color-primary-400'].split(' ').join(',')}, 1)`,
					borderWidth: 1
				},
				{
					label: 'Event Average',
					data: normalizeDataToMaxValues(mutedData),
					backgroundColor: `rgba(${theme.properties['--color-tertiary-200']
						.split(' ')
						.join(',')}, 0.1)`,
					borderColor: `rgba(${theme.properties['--color-tertiary-400']
						.split(' ')
						.join(',')}, 0.5)`,
					borderWidth: 1
				}
			]
		};
	}

	/**
	 * Scale the data to the event averages, unless the data is higher than the event average,
	 * in which case, scale it to that instead.
	 * @param data
	 */
	function normalizeDataToEventAverages(data: number[]) {
		return data.map((value, index) => {
			if (value > mutedData[index]) {
				return value / value;
			} else {
				return value / mutedData[index];
			}
		});
	}

	function normalizeDataToMaxValues(data: number[]) {
		return data.map((value, index) => {
			return value / maxValues[index];
		});
	}

	function normalizeData(data: number[]) {
		return data.map((value) => {
			return value / Math.max(...data);
		});
	}

	onMount(async () => {
		ctx = chartCanvas.getContext('2d')!;
		let chart = new Chart(ctx, {
			type: 'radar',
			data: getChartData(),
			options: {
				scales: {
					r: {
						angleLines: {
							color: `rgb(${theme.properties['--color-surface-800']}`
						},
						grid: {
							color: `rgb(${theme.properties['--color-surface-800']}`
						},
						pointLabels: {
							color: `rgb(${theme.properties['--theme-font-color-dark']}`
						},
						ticks: {
							display: false
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							color: `rgb(${theme.properties['--theme-font-color-dark']})`
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={chartCanvas} id="radarChart"></canvas>
