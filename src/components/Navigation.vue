<template>
	<div class="header">
		<nav class="dropdown-wrapper">
			<button class="open">
				<span class="material-symbols-outlined">menu</span>
			</button>
			<div class="dropdown">
				<div class="menu">
					<button @click="settingStore.setActiveTab(Tab.Calculator)">Calculator</button>
					<button @click="settingStore.setActiveTab(Tab.Settings)  ">Settings</button>
					<button @click="settingStore.setActiveTab(Tab.About)     ">About</button>
				</div>
			</div>
		</nav>
		<h1>
			Pathfinder 2e Complex Crafting Calculator
		</h1>
	</div>
</template>

<script setup lang="ts">
import { Tab, useSettingStore } from "../stores/settings";

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

.header {
	align-content: center;
	justify-items: center;

	border-bottom: 3px theme.$highlight-color solid;

	background-color: theme.$header-bg;

	display: grid;
	grid-template-columns: auto 1fr;

	h1 {
		justify-self: center;

		padding: .2em;

		margin: 0;

		font-weight: bold;
		font-size: 1.8em;
	}
}

.dropdown-wrapper {
	justify-self: stretch;

	.open {
		height: 100%;
		aspect-ratio: 1 / 1;

		border-right: 1px theme.$highlight-color solid;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		border: none;

		background: theme.$button-bg;

		&:hover, &:focus-visible {
			background: theme.$button-bg-active;
		}
	}

	.dropdown {
		visibility: hidden;
	}

	.menu {
		position: absolute;

		display: grid;
		grid-auto-columns: 1fr;

		border: 1px lightgrey solid;
		border-left: none;

		button {
			font-size: 1em;
			padding: .5em 1.75em;

			&:not(:last-child){
				border-bottom: 1px lightgrey solid;
			}
		}
	}

	&:hover, &:focus-within {
		.dropdown {
			visibility: visible;
		}
	}
}
</style>