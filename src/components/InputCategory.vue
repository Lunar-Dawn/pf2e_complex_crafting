<template>
	<div class="category">
		<div class="header">
			<h1 @click="toggleShown">{{ title }}</h1>

			<Transition name="reset-hider" mode="out-in">
				<div v-if="reset !== null && !hidden" class="button-wrapper">
					<button @click="reset" :aria-label="`Reset ${title}`" :title="`Reset ${title}`" class="reset-icon">
						<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
							<path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/>
						</svg>
					</button>
				</div>
				<div v-else @click="toggleShown"/>
			</Transition>
			<div class="button-wrapper">
				<button @click="toggleShown" :aria-label="hidden ? 'Expand' : 'Collapse'">
					<svg :class="{ 'flip': hidden }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
						<path d="m480-555.69-184 184L267.69-400 480-612.31 692.31-400 664-371.69l-184-184Z"/>
					</svg>
				</button>
			</div>
		</div>
		<CollapseAnimation :condition="!hidden">
			<div class="slot-wrapper">
				<slot/>
			</div>
		</CollapseAnimation>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CollapseAnimation from "./animations/CollapseAnimation.vue";

const { title, reset = null } = defineProps<{
	title: string,
	reset?: () => void,
}>();

const hidden = ref(false)
const toggleShown = () => hidden.value = !hidden.value
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

$animation-speed: 0.25s;

.category {
	display: flex;
	flex-direction: column;

	align-items: stretch;

	border-top: 3px solid theme.$highlight-color;
	background: theme.$block-bg;

	margin-bottom: 10px;

	.header {
		height: 4em;

		display: grid;

		grid-template-columns: 1fr 4em 4em;

		background: theme.$header-bg;

		.button-wrapper {
			align-self: stretch;
			justify-self: end;
			aspect-ratio: 1;

			width: 4em;
			height: 4em;

			transition: width $animation-speed;

			overflow: hidden;
		}

		button {
			width: 4rem;
			height: 4rem;

			font-size: 1.2em;

			display: flex;
			align-items: center;
			justify-content: center;

			border: none;

			background: theme.$button-bg;

			transition: background-color 0.25s;

			&:hover, &:focus-visible {
				background: theme.$button-bg-active;
			}

			svg {
				height: 80%;

				aspect-ratio: 1;

				transition: transform $animation-speed;
			}

			.flip {
				transform: rotate(-180deg);
			}
		}

		.reset-icon:hover {
			background: indianred;
		}

		.reset-hider-enter-from, .reset-hider-leave-to {
			width: 0;
		}

		.spacer {
			flex-grow: 1;
		}

		h1 {
			align-self: center;

			font-size: 2em;
			margin: 0 0 0 1em;
		}
	}

	.slot-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
</style>