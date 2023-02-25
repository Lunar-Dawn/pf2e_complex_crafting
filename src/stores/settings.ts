import { defineStore } from "pinia";
import { CoinFormat } from "../util/formatCoins";

export enum Tab {
	Calculator,
	License,
}

export const useSettingStore = defineStore('settings', {
	state: () => ({
		craftingModifier: 0,
		rushSetup: 0,
		rushFinishing: false,

		coinFormat: CoinFormat.Separate,

		activeTab: Tab.Calculator,
	}),
	actions: {
		setActiveTab(newTab: Tab): void {
			this.activeTab = newTab;
		}
	},
})
