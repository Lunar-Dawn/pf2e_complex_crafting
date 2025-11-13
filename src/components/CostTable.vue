<template>
	<InputCategory title="Progress per Day">
		<div class="table" role="table">
			<div class="head" role="rowgroup">
				<div class="day-header" role="cell">Day</div>
				<div class="category-header" role="cell">Success ({{ formatCoins(calculationStore.costSavedPerDay(false)) }}/day)</div>
				<div class="category-header" role="cell">Critical Success ({{ formatCoins(calculationStore.costSavedPerDay(true)) }}/day)</div>

				<div role="cell">Value</div>
				<div role="cell">Remaining</div>
				<div role="cell">Value</div>
				<div role="cell">Remaining</div>
			</div>

			<div class="body" role="rowgroup">
				<template v-for="day in calculationStore.finalTable()">
					<template v-if="tooLong">
						<template v-if="day.day === firstSnipStart + 1">
							<div class="row unimportant hider" role="row">
								<div role="cell" aria-hidden="true"></div>
								<div class="snip" role="cell">
									<a @click.prevent="expandFirstSnip = !expandFirstSnip" href="#">
										— {{ expandFirstSnip ? "Hide" : "Show" }} {{ firstSnipLength }} rows —
									</a>
								</div>
							</div>
						</template>
						<template v-else-if="day.day === secondSnipStart + 1">
							<div class="row unimportant hider" role="row">
								<div role="cell" aria-hidden="true"></div>
								<div class="snip" role="cell">
									<a @click.prevent="expandSecondSnip = !expandSecondSnip" href="#">
										— {{ expandSecondSnip ? "Hide" : "Show" }} {{ secondSnipLength }} rows —
									</a>
								</div>
							</div>
						</template>
					</template>

					<CostTableRow :row="day" v-if="shouldShow(day)" :class="{ 'unimportant': day.isSetup }"/>
				</template>
			</div>
		</div>
	</InputCategory>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { TableRow, useCalculationStore } from "../stores/calculation";

import { formatCoins } from "../util/format";

import CostTableRow from "./CostTableRow.vue";
import InputCategory from "./InputCategory.vue";

const calculationStore = useCalculationStore();

const expandFirstSnip = ref(false)
const expandSecondSnip = ref(false)

// Number of days before we snip the table
const veryBigTableSize = 50
const tooLong = computed(() => calculationStore.daysRequiredSuccess > veryBigTableSize)
// How many rows to show before and/or after the setup/success rows
const context = 2

const firstSnipStart = computed(() => Math.max(0, calculationStore.setupDays + 1 + context));
const firstSnipLength = computed(() => Math.max(0, calculationStore.daysRequiredCritical - firstSnipStart.value - context - 1));

const secondSnipStart = computed(() => Math.max(0, firstSnipStart.value + firstSnipLength.value + context + 1 + context));
const secondSnipLength = computed(() => Math.max(0, calculationStore.daysRequiredSuccess - secondSnipStart.value - context - 1));

const shouldShow = (day: TableRow): boolean => {
	if(!tooLong.value)
		return true;
	if (day.day > firstSnipStart.value  && day.day <= firstSnipStart.value  + firstSnipLength.value)
		return expandFirstSnip.value;
	if (day.day > secondSnipStart.value && day.day <= secondSnipStart.value + secondSnipLength.value)
		return expandSecondSnip.value;
	return true;
}
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

$width: 5;

.snip {
	grid-column: span $width - 1;
}

.hider {
	text-decoration: underline;
	cursor: pointer;
}

:deep(.unimportant) {
	font-style: italic;

	color: grey;
}
.completion {
	 background-color: theme.$highlight-color;

	 font-weight: bold;
 }
:deep(.row) {
	&:nth-child(even):not(.completion) {
		background: theme.$header-bg;
	}
}

.table {
	width: 100%;
	margin: 10px 0;

	display: grid;
	grid-template-columns: auto repeat($width - 1, 1fr);

	text-align: center;

	.head, .body, :deep(.row) {
		grid-column: span $width;

		display: grid;
		grid-template-columns: subgrid;
	}
	.head {
		grid-row: span 2;
		background: theme.$subheader-bg;
		font-weight: bold;
		border-bottom: 1px theme.$highlight-color solid;
	}

	.day-header {
		grid-row: span 2;

		display: grid;
		place-items: center;
	}
	.category-header {
		grid-column: span 2;
	}

	:deep(*[role=cell]) {
		padding: 0.3em 1ch;
	}
}
</style>