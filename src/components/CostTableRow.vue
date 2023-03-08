<template>
<tr	:class="{ setup: row.isSetup, completion: row.isCompletion }">
	<th>{{ row.day }}</th>

	<td>{{ formatCoins(row.success.valueSpent) }}</td>
	<td>{{ formatCoins(row.success.valueTotal) }}</td>
	<td>{{ formatCoins(row.success.costRemaining) }}</td>

	<td>{{ formatCoins(row.criticalSuccess.valueSpent) }}</td>
	<td>{{ formatCoins(row.criticalSuccess.valueTotal) }}</td>
	<td>{{ formatCoins(row.criticalSuccess.costRemaining) }}</td>
</tr>
</template>

<script setup lang="ts">
import { TableRow } from "../stores/calculation";

import { formatCoins } from "../util/format";

defineProps<{
	row: TableRow
}>()
</script>

<style scoped lang="scss">
.completion {
	background-color: green;
}
tr.setup {
	color: lightgray;
}
</style>