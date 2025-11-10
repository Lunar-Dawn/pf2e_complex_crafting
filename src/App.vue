<template>
	<div id="body-wrapper">
		<Navigation class="header"/>
		<div id="main-wrapper">
			<Calculator v-show="settingStore.activeTab === Tab.Calculator"/>
			<Settings   v-show="settingStore.activeTab === Tab.Settings"/>
			<About      v-show="settingStore.activeTab === Tab.About"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import Calculator from "./components/Calculator.vue";
import About from "./components/About.vue";

import { Tab, useSettingStore } from "./stores/settings";
import Settings from "./components/Settings.vue";

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
#body-wrapper {
	display: grid;

	grid-template-rows: auto 1fr;
}
#main-wrapper {
	padding: 10px;
}
</style>
