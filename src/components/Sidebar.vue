<template>
	<div class="sidebar-wrapper">
		<nav class="sidebar">
			<button @click="settingStore.setActiveTab(Tab.Calculator)" :class="{ active: settingStore.activeTab === Tab.Calculator }">Calculator</button>
			<button @click="settingStore.setActiveTab(Tab.License)   " :class="{ active: settingStore.activeTab === Tab.License }   ">License</button>
		</nav>
		<p class="copyright">
			Copyright &copy; 2023 Lunar Requiem
			<br/>
			Licensed under the MIT license
			<br/>
			<a href="https://github.com/LunarRequiem/pf2e_complex_crafting">Source code available on GitHub</a>
		</p>
	</div>
</template>

<script setup lang="ts">
import { Tab, useSettingStore } from "../stores/settings";

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.sidebar-wrapper {
	border-right: 1px lightgrey solid;

	display: flex;
	flex-direction: column;

	nav {
		text-align: right;

		display: flex;
		flex-direction: column;

		line-height: 2.5em;

		button {
			border: none;
			font-size: 1em;
			padding: 1em;

			text-align: right;

			&:not(.active):not(:hover) {
				background: none;
			}
		}
	}
	.copyright {
		margin-top: auto;
		text-align: center;

		font-size: .8em;
		color: darkgrey;
	}
}
</style>