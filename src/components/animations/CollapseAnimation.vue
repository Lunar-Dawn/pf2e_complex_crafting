<template>
	<Transition>
		<div v-show="condition" class="outer">
			<div class="inner">
				<slot/>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
defineProps<{
	condition: boolean,
}>()
</script>


<style scoped lang="scss">
$animation-speed: .25s;

.outer {
	display: grid;
	grid-template-rows: 1fr;
	transition: grid-template-rows $animation-speed;

	overflow-y: hidden;

	align-self: stretch;
}

.inner {
	display: grid;

	min-height: 0;
}

.v-enter-from, .v-leave-to {
	grid-template-rows: 0fr;
}

</style>