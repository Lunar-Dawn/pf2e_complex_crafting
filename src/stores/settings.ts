import { defineStore } from "pinia";
import { ref } from "vue";

import { CoinFormat } from "../util/format";
import { localStorageRef } from "../util/misc";

export enum Tab {
	Calculator,
	License,
}

export const useSettingStore = defineStore('settings', () => {
	const coinFormat = localStorageRef('coinFormat', CoinFormat.Separate);

	const activeTab = ref(Tab.Calculator);

	function setActiveTab(newTab: Tab): void {
		activeTab.value = newTab;
	}

	return {
		activeTab, coinFormat,
		setActiveTab,
	}
})
