<template>
	<main>
		<div class="form-grid">
			<Form/>
		</div>
		<aside>
			<Results/>
		</aside>
	</main>
</template>

<script setup lang="ts">
import Form from "./Form.vue";
import Results from "./Results.vue";
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