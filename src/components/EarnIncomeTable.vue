<template>
	<table>
		<thead>
		<tr>
			<th>Task Level</th>
			<th>DC</th>
			<th>Failure</th>
			<th>Trained</th>
			<th>Expert</th>
			<th>Master</th>
			<th>Legendary</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(level, index) in earnIncomeValues.levels">
			<th>{{ index }}</th>
			<td>{{ level.dc }}</td>
			<td>{{ formatCoins(level.failure) }}</td>
			<td>{{ formatCoins(level.success.get(ProficiencyLevel.Trained) ?? 0) }}</td>
			<td>{{ formatCoins(level.success.get(ProficiencyLevel.Expert) ?? 0) }}</td>
			<td>{{ formatCoins(level.success.get(ProficiencyLevel.Master) ?? 0) }}</td>
			<td>{{ formatCoins(level.success.get(ProficiencyLevel.Legendary) ?? 0) }}</td>
		</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import earnIncomeValues from "../util/earnIncomeTable";
import formatCoins from "../util/formatCoins";
import { ProficiencyLevel } from "../util/proficiency";
</script>

<style scoped lang="scss">
table {
	line-height: 1.5em;

	text-align: right;

	thead th {
		padding: 2px 10px;
	}

	th {
		text-align: center;
	}

	td {
		padding: 0 10px;
	}

	td, th {
		border: 1px grey solid;
	}

	border-spacing: 0;
}
</style>