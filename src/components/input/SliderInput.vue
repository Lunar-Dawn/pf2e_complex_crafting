<template>
	<div class="input-header number-header">
		<label class="header" :for="id" >{{ title }}</label>
		<input type="number" :id="id" :min="min" :max="max" :step="step" v-model.number="value"/>
	</div>
	<input :aria-label="title" type="range" :min="min" :max="max" :step="step" v-model.number="value"/>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid';


defineProps<{
	title: string,
	modelValue: number,
	min: number,
	max: number,
	step: number,
}>()
const value = defineModel<number>({ required: true })

const id = uuid();
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

input[type=range] {
	width: 90%;
	margin-top: 10px;
}
</style>