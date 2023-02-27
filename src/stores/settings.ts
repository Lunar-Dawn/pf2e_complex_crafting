import { defineStore } from "pinia";
import { CoinFormat } from "../util/format";

export enum Tab {
	Calculator,
	License,
}

export const useSettingStore = defineStore('settings', {
	state: () => ({
		coinFormat: CoinFormat.Separate,

		activeTab: Tab.Calculator,
	}),
	actions: {
		setActiveTab(newTab: Tab): void {
			this.activeTab = newTab;
		}
	},
})
