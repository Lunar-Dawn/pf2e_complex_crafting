import { defineStore } from "pinia";

import { dcByLevel } from "../util/dcByLevel";
import { Rarity } from "../util/rarity";

export const useItemStore = defineStore('item', {
	state: () => ({
		itemCost: 0,
		itemLevel: 0,
		rarity: Rarity.Common,
		batchSize: 1,
		isPermanent: false,
	}),
	getters: {
		getDC: (state): number => dcByLevel[state.itemLevel] + state.rarity,
		batchCost: (state): number => state.itemCost * state.batchSize,
	}
})
