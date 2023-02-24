import { defineStore } from "pinia";
import { CoinFormat } from "../util/formatCoins";


export const useSettingStore = defineStore('settings', {
	state: () => ({
		craftingModifier: 0,
		rushSetup: 0,
		rushFinishing: false,

		coinFormat: CoinFormat.DecimalGp,
	})
})
