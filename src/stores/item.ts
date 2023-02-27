import { computed } from "vue";

import { defineStore } from "pinia";

import { dcByLevel } from "../util/dcByLevel";
import { Rarity } from "../util/rarity";
import { urlRef } from "../util/misc";

export const useItemStore = defineStore('item', () => {
	const itemCost = urlRef('itemCost', 0);
	const itemLevel = urlRef('itemLevel', 0);
	const rarity = urlRef('rarity', Rarity.Common);
	const batchSize = urlRef('batchSize', 1);
	const isPermanent = urlRef('isPermanent', false);

	const getDC = computed((): number => dcByLevel[itemLevel.value] + rarity.value);
	const batchCost = computed((): number => itemCost.value * batchSize.value);

	return {
		itemCost, itemLevel, rarity, batchSize, isPermanent,
		getDC, batchCost
	}
})
