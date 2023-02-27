<template>
	<table>
		<thead>
			<tr>
				<th rowspan="2">Day</th>
				<th colspan="3">Success ({{ formatCoins(calculationStore.costSavedPerDay(false)) }}/day)</th>
				<th colspan="3">Critical Success ({{ formatCoins(calculationStore.costSavedPerDay(true)) }}/day)</th>
			</tr>
			<tr>
				<th>Spent</th>
				<th>Value</th>
				<th>Remaining</th>
				<th>Spent</th>
				<th>Value</th>
				<th>Remaining</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in calculationStore.finalTable()" :class="{ setup: row.isSetup }">
				<th>{{ row.day }}</th>

				<td>{{ formatCoins(row.success.valueSpent) }}</td>
				<td>{{ formatCoins(row.success.valueTotal) }}</td>
				<td>{{ formatCoins(row.success.costRemaining) }}</td>

				<td>{{ formatCoins(row.criticalSuccess.valueSpent) }}</td>
				<td>{{ formatCoins(row.criticalSuccess.valueTotal) }}</td>
				<td>{{ formatCoins(row.criticalSuccess.costRemaining) }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { formatCoins } from "../util/format";

import { useCalculationStore } from "../stores/calculation";

const calculationStore = useCalculationStore();
</script>

<style scoped lang="scss">
table {
	line-height: 1.5em;

	width: 100%;

	thead th {
		padding: 2px 10px;
	}

	td {
		padding: 0 10px;
		text-align: right;
	}

	td, th {
		border: 1px grey solid;
	}

	border-spacing: 0;
	border-collapse: collapse;

	tr.setup {
		color: lightgray;
	}
}
</style>