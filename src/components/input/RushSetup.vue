<template>
	<div class="input-header checkbox-header">
		<label for="enable-setup-rush" class="header">
			Rush Setup
		</label>
		<input type="checkbox" id="enable-setup-rush" v-model="enabled" :disabled="characterStore.proficiencyLevel === ProficiencyLevel.Trained"/>
	</div>
	<CollapseAnimation :condition="enabled">
		<div class="options-layout">
			<label>
				<input type="radio" v-model="model" :value="1" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Expert"/>
				<span>Expert</span>
				<span>+5 DC</span>
				<span>-1 Days Setup</span>
			</label>
			<label>
				<input type="radio" v-model="model" :value="2" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Master"/>
				<span>Master</span>
				<span>+10 DC</span>
				<span>-2 Days Setup</span>
			</label>
			<label>
				<input type="radio" v-model="model" :value="3" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Legendary"/>
				<span>Legendary</span>
				<span>+15 DC</span>
				<span>-3 Days Setup</span>
			</label>
		</div>
	</CollapseAnimation>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useCharacterStore } from "../../stores/character";
import { ProficiencyLevel } from "../../util/proficiency";

import CollapseAnimation from "../animations/CollapseAnimation.vue";

const model = defineModel<any>({ required: true })

const characterStore = useCharacterStore();

const cache = ref(0)
const enabled = computed({
	get: () => model.value !== 0,
	set: () => {
		if(enabled.value) {
			cache.value = model.value
			model.value = 0
		} else {
			model.value = Math.max(1, cache.value)
		}
	},
})

watch(() => characterStore.proficiencyLevel, (prof) => {
	model.value = Math.min(prof / 2 - 1, model.value)
	cache.value = Math.min(prof / 2 - 1, cache.value)
})

</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

$row-border-radius: 25px;
$table-border-radius: 5px;

.options-layout {
	display: grid;
	grid-template-columns: auto auto auto;
	margin-top: 10px;

	border: 1px grey solid;
	border-radius: $table-border-radius;

	justify-self: center;

	label {
		grid-column: span 3;

		display: grid;
		grid-template-columns: subgrid;

		column-gap: 1ch;

		padding: .25em 1ch;
		text-align: right;

		input {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}

		&:first-child {
			border-radius: $table-border-radius $table-border-radius 0 0;
		}

		&:last-child {
			border-radius: 0 0 $table-border-radius $table-border-radius;
		}

		&:has(input:focus-visible) {
			outline: 2px solid dodgerblue;
		}

		&:has(input:disabled) {
			color: grey;
		}
		&:has(input:checked) {
			background: theme.$highlight-color;
			color: black;
		}
	}
}
</style>