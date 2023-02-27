<template>
	<main>
		<div class="form-grid col-span-2">
			<InputForm/>
		</div>
		<aside>
			<CraftingInfo/>
		</aside>
		<aside>
			<CostTable/>
		</aside>
	</main>
</template>

<script setup lang="ts">
import InputForm from "./InputForm.vue";
import CostTable from "./CostTable.vue";
import CraftingInfo from "./CraftingInfo.vue";
</script>

<style scoped lang="scss">
main {
	display: grid;
	grid-template-columns: 3fr 2fr;
	grid-template-rows: auto 1fr;

	column-gap: .3em;

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;

		align-self: start;
	}
}
</style>