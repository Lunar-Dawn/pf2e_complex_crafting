<template>
	<div class="input-header number-header">
		<label class="header" for="gold">
			Item Price
		</label>
		<div class="total-coins">
			<span>{{ formatCoins(copperComputed, CoinFormat.DecimalGp) }}</span>
		</div>
	</div>

	<div class="input-wrapper">
		<label class="coin-type">
			<input type="number" min="0" max="10000000" v-model.number="gp"> gp
		</label>
		<label class="coin-type">
			<input type="number" :min="copperValue > 0 ? -1 : 0" max="10" v-model.number="sp"> sp
		</label>
		<label class="coin-type">
			<input type="number" :min="copperValue > 0 ? -1 : 0" max="10" v-model.number="cp"> cp
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { CoinFormat, formatCoins } from "../../util/format";
import { splitCoins } from "../../util/misc";

const copperValue = defineModel<number>({ required: true })

const cp = ref(0)
const sp = ref(0)
const gp = ref(0)

watch(copperValue, (value) => {
	const coins = splitCoins(value)
	cp.value = coins.cp
	sp.value = coins.sp
	gp.value = coins.gp
}, { immediate: true })

const copperComputed = computed(() => Math.max(gp.value * 100 + sp.value * 10 + cp.value, 0))
watch(copperComputed, (value) => {
	copperValue.value = value;
})
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

.total-coins {
	padding: 0 1ch;
	border-bottom: 1px theme.$highlight-color solid;
	background: theme.$input-bg;

	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
}

.input-wrapper {
	margin-top: 10px;
	width: 90%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	height: 2em;

	label {
		cursor: text;

		display: grid;
		grid-template-columns: 1fr auto;
		align-items: baseline;
		align-content: center;

		column-gap: 1ch;

		box-sizing: content-box;

		padding-right: 1ch;
		padding-bottom: 1px;
		border-bottom: 1px theme.$highlight-color solid;
		background: theme.$input-bg;

		height: calc(100% - 2px);

		&:hover, &:has(*:focus-visible) {
			background: theme.$input-bg-active;
			border-bottom: 2px theme.$highlight-color solid;
			padding-bottom: 0;
		}

		&:not(:last-child) {
			border-right: 1px theme.$highlight-color solid;
		}
	}

	input[type=number] {
		text-align: right;

		padding: 0;
		border-bottom: unset;
		background: unset;

		&:hover, &:focus-visible {
			background: unset;
			border-bottom: unset;
			padding-top: unset;
		}
	}
}
</style>