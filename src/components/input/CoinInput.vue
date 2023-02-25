<template>
	<fieldset class="number-wrapper">
		<legend>Item Price</legend>
		<div>
			<input type="number" id="gold"   min="0" v-model.number="gp">
			<label for="gold" class="coin-type">gp</label>

			<input type="number" id="silver" min="0" v-model.number="sp">
			<label for="silver" class="coin-type">sp</label>

			<input type="number" id="copper" min="0" v-model.number="cp">
			<label for="copper" class="coin-type">cp</label>

			<div class="total-coins">
				<span>{{ (copperComputed / 100).toFixed(2) }}</span>
			</div>
			<span class="coin-type">gp</span>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { splitCoins } from "../../util/formatCoins";
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
	> div {
		display: grid;
		grid-template-columns: repeat(4, 1fr auto);
		align-items: stretch;

		align-self: stretch;

		border: 1px grey solid;
		border-radius: 4px;

		input {
			border: none;
			background: none;

			width: 100%;
		}

		input, .total-coins {
			text-align: right;

			&:not(:first-child) {
				border-left: 1px grey solid;
			}
		}

		.coin-type {
			align-self: center;
		}

		.total-coins {
			display: flex;
			align-items: center;

			> span {
				flex: 1;
			}
		}

		> * {
			padding: 0 .5ch;
		}
	}
}
</style>