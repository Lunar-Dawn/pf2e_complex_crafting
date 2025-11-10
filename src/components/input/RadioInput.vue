<template>
	<div class="input-header">
		<label class="header">
			{{ title }}
		</label>
	</div>
	<div class="options-layout" :class="{ 'narrow': narrow }">
		<template v-for="entry in entries">
			<label>
				<input type="radio" v-model="value" :value="entry.optionValue" :disabled="entry.isDisabled?.()"/>
				{{ entry.title }}
			</label>
		</template>
	</div>
</template>

<script setup lang="ts">
interface Entry {
	title: string,
	optionValue: any,
	isDisabled?: () => boolean,
}
interface Props {
	title: string,
	modelValue: any,
	entries: Entry[],
	narrow?: boolean,
}
defineProps<Props>()

const value = defineModel<any>({ required: true })
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

$row-border-radius: 25px;
$table-border-radius: 5px;

.options-layout {
	display: grid;
	margin-top: 10px;

	border: 1px grey solid;

	grid-auto-flow: column;
	grid-auto-columns: 1fr;

	border-radius: $row-border-radius;

	width: 90%;

	label {
		padding: .25em 0;
		text-align: center;

		background: theme.$input-bg;

		input {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}

		&:first-child {
			border-radius: $row-border-radius 0 0 $row-border-radius;
		}

		&:last-child {
			border-radius: 0 $row-border-radius $row-border-radius 0;
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


.narrow {
	width: unset;

	label {
		padding-left: 1ch;
		padding-right: 1ch;
	}
}
</style>