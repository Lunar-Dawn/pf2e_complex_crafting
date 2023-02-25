<template>
	<fieldset class="wrapper">
		<legend>{{ title }}</legend>

		<div class="options-wrapper">
			<template v-for="entry in uuidRows()">
				<input type="radio" :id="entry.uuid" v-model="value" :value="entry.optionValue" :disabled="entry.isDisabled?.()" hidden/>
				<label :for="entry.uuid">{{ entry.title }}</label>
			</template>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { v4 as uuid } from 'uuid';

interface Entry {
	title: string,
	optionValue: any,
	isDisabled?: () => boolean,
}
interface Props {
	title: string,
	modelValue: any,
	entries: Entry[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'update:modelValue', value: unknown): void,
}>()

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})
const uuidRows = computed(() => {
	return function* (): Generator<{
		title: string,
		optionValue: any,
		isDisabled?: () => boolean,
		uuid: string
	}> {
		for (const entry of props.entries) {
			yield {
				...entry,
				uuid: uuid(),
			}
		}
	}
})
</script>

<style scoped lang="scss">
.wrapper {
	flex-direction: column;
	align-items: flex-start;

	.options-wrapper {
		border: 1px grey solid;
		border-radius: 4px;

		input:checked + label {
			background: dodgerblue;
		}

		label {
			padding: .2em 1ch;
			white-space: nowrap;
		}

		input:disabled + label {
			color: grey;
		}
	}
}

.format-row > .options-wrapper {
	display: flex;
	flex-wrap: wrap;
}

.format-table > .options-wrapper {
	display: grid;
	grid-template-columns: auto;
}
</style>