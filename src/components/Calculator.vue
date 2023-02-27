<template>
	<main>
		<div class="form-grid">
			<InputForm/>
		</div>
		<aside>
			<CostTable/>
		</aside>
	</main>
</template>

<script setup lang="ts">
import InputForm from "./InputForm.vue";
import CostTable from "./CostTable.vue";
</script>

<style scoped lang="scss">
main {
	//max-width: 40vw;

	display: grid;
	grid-template-columns: 3fr 2fr;

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;

		align-self: start;
	}
}
</style>