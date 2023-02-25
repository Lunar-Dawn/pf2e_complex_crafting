<template>
	<article id="body-wrapper">
		<header>
			Pathfinder 2e Complex Crafting Calculator
		</header>
		<Sidebar/>
		<div id="main-wrapper">
			<Calculator v-show="settingStore.activeTab === Tab.Calculator"/>
			<License    v-show="settingStore.activeTab === Tab.License"/>
		</div>
	</article>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Calculator from "./components/Calculator.vue";
import License from "./components/License.vue";

import { Tab, useSettingStore } from "./stores/settings";

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
#body-wrapper {
	display: grid;

	grid-template-rows: auto 1fr;
	grid-template-columns: 15% 85%;

	grid-template-areas:
		"header header"
		"sidebar main";

	height: 100vh;
}
header {
	font-family: sans-serif;
	font-weight: bold;
	font-size: 1.5em;
	border-bottom: 1px lightgrey solid;

	text-align: center;
	padding: .2em;

	background-color: inherit;

	grid-area: header;
}
#main-wrapper {
	padding: .3em;

	overflow: auto;
}
</style>
