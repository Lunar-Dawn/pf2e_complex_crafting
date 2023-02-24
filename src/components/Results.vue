<template>
	<table>
		<thead>
			<tr>
				<th rowspan="2">Day</th>
				<th colspan="3">Critical Success ({{ formatCoins(calculation.earnIncomeLevel(true)) }}/day)</th>
				<th colspan="3">Success ({{ formatCoins(calculation.earnIncomeLevel(false)) }}/day)</th>
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
			<tr v-for="(day, index) in results.days" :class="{ setup: index < calculation.setupDays() }">
				<th>{{ index + 1}}</th>
				<td>{{ formatCoins(day.criticalSuccess.valueSpent) }}</td>
				<td>{{ formatCoins(day.criticalSuccess.valueTotal) }}</td>
				<td>{{ formatCoins(day.criticalSuccess.costRemaining) }}</td>
				<td>{{ formatCoins(day.success.valueSpent) }}</td>
				<td>{{ formatCoins(day.success.valueTotal) }}</td>
				<td>{{ formatCoins(day.success.costRemaining) }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import formatCoins from "../util/formatCoins";

import CraftingCalculations from "../util/craftingCalculation";

const calculation = $ref(new CraftingCalculations())
const results = $computed(() => calculation.finalCalculation())
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