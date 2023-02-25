<template>
	<fieldset class="number-wrapper">
		<legend>Item Price</legend>
		<div>
			<input type="number" id="gold"   min="0" v-model.number="gp">
			<label for="gold">gp</label>
		</div>
		<div>
			<input type="number" id="silver" min="0" v-model.number="sp">
			<label for="silver">sp</label>
		</div>
		<div>
			<input type="number" id="copper" min="0" v-model.number="cp">
			<label for="copper">cp</label>
		</div>
		<div>
			{{ formatCoins(copperComputed, CoinFormat.DecimalGp) }}
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import formatCoins, { CoinFormat, splitCoins } from "../util/formatCoins";
import { computed, ref, watch } from "vue";

const props = defineProps<{
	copperValue: number
}>()
const emit = defineEmits<{
	(e: 'update:copperValue', id: number): void
}>()

const coins = splitCoins(props.copperValue)
const cp = ref(coins.cp)
const sp = ref(coins.sp)
const gp = ref(coins.gp)

const copperComputed = computed(() => gp.value * 100 + sp.value * 10 + cp.value)
watch(copperComputed, (value) => {
	emit('update:copperValue', value)
})
</script>

<style scoped lang="scss">
fieldset {
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	//flex-wrap: wrap;

	text-align: right;

	div {
		flex: 0 1 auto;
		display: inline-flex;

		justify-content: end;

		input {
			padding: .5ch;

			width: 100%;

			text-align: right;
		}
		label {
			margin: 0 1ch;
		}
	}
}
</style>