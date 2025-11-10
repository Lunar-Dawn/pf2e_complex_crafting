<template>
<div role="row" class="row" :class="{ completion: row.success.isCompletion || row.criticalSuccess.isCompletion }">
	<div role="cell">{{ row.day }}</div>

	<template v-if="!row.isSetup">
		<template v-if="row.success.isCompletion">
			<div role="cell" class="complete-message">
				Item Complete
			</div>
		</template>
		<template v-else-if="row.success.costRemaining">
			<div role="cell">{{ formatCoinTableRow(row.success.valueTotal) }}</div>
			<div role="cell">{{ formatCoinTableRow(row.success.costRemaining) }}</div>
		</template>
		<template v-else>
			<div role="cell" class="unimportant">&mdash;</div>
			<div role="cell" class="unimportant">&mdash;</div>
		</template>

		<template v-if="row.criticalSuccess.isCompletion">
			<div role="cell" class="complete-message">
				Item Complete
			</div>
		</template>
		<template v-else-if="row.criticalSuccess.costRemaining">
			<div role="cell">{{ formatCoinTableRow(row.criticalSuccess.valueTotal) }}</div>
			<div role="cell">{{ formatCoinTableRow(row.criticalSuccess.costRemaining) }}</div>
		</template>
		<template v-else>
			<div role="cell" class="unimportant">&mdash;</div>
			<div role="cell" class="unimportant">&mdash;</div>
		</template>
	</template>
	<template v-else>
		<div class="setup-row" role="cell">
			Setup ({{ formatCoins(row.valueSpent) }} spent)
		</div>
	</template>
</div>
</template>

<script setup lang="ts">
import { TableRow } from "../stores/calculation";

import { formatCoins, formatCoinTableRow } from "../util/format";

defineProps<{
	row: TableRow
}>()
</script>

<style scoped lang="scss">
.setup-row {
	grid-column: span 4;
}
.complete-message {
	grid-column: span 2;
}
</style>