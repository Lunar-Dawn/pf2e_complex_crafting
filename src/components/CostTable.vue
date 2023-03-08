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
			<template v-if="calculationStore.daysRequiredSuccess <= veryBigTableSize">
				<CostTableRow v-for="row in calculationStore.finalTable()" :row="row"/>
			</template>
			<template v-else>
				<CostTableRow v-for="day in calculationStore.setupDays" :row="calculationStore.calculateRow(day)"/>
				<CostTableRow v-for="day in 5" :row="calculationStore.calculateRow(day + calculationStore.setupDays)"/>

				<tr class="snip">
					<td colspan="7"> — snip — </td>
				</tr>

				<CostTableRow v-for="day in 2" :row="calculationStore.calculateRow(day + calculationStore.daysRequiredCritical - 2)"/>

				<tr class="snip">
					<td colspan="7"> — snip — </td>
				</tr>

				<CostTableRow v-for="day in 2" :row="calculationStore.calculateRow(day + calculationStore.daysRequiredSuccess - 2)"/>
			</template>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import { formatCoins } from "../util/format";

import { useCalculationStore } from "../stores/calculation";
import CostTableRow from "./CostTableRow.vue";

const calculationStore = useCalculationStore();

// Number of days before we snip the table
const veryBigTableSize = 1000;
</script>

<style scoped lang="scss">
table {
	line-height: 1.5em;

	width: 100%;

	thead th {
		padding: 2px 10px;
	}

	:deep(td) {
		padding: 0 10px;
		text-align: right;
	}

	:deep(td), :deep(th) {
		border: 1px grey solid;
	}

	border-spacing: 0;
	border-collapse: collapse;

	.snip {
		background-color: grey;

		td {
			text-align: center;
			font-style: italic;

			color: darkgrey;
		}
	}
}
</style>