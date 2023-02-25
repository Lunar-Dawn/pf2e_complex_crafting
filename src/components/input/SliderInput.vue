<template>
	<fieldset class="wrapper">
		<legend>{{ title }}</legend>
		<label :for="id1" hidden>{{ title }}</label>
		<input
				type="range" :id="id1"
				:min="min" :max="max" :step="step"
				v-model.number="value"/>
		<div class="value-display">
			<label :for="id2" hidden>{{ title }}</label>
			<input type="number" :id="id2" :min="min" :max="max" :step="step" v-model.number="value"/>
			<slot/>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { v4 as uuid } from 'uuid';

const props = defineProps<{
	title: string,
	modelValue: number,
	min: number,
	max: number,
	step: number,
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void,
}>()

const id1 = uuid();
const id2 = uuid();

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
</script>

<style scoped lang="scss">
.wrapper {
	display: grid;
	grid-template-columns: 1fr 7ch;

	align-items: center;

	.value-display {
		text-align: center;

		display: flex;

		input {
			min-width: 0;

			&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
				-webkit-appearance: none;
			}
			-moz-appearance: textfield;

			text-align: center;
		}
	}
}
</style>