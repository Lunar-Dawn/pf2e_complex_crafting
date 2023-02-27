import { computed } from "vue";

import { defineStore } from "pinia";

import { dcByLevel } from "../util/dcByLevel";
import { Rarity } from "../util/rarity";
import { URLPos, urlRef } from "../util/misc";

export const useItemStore = defineStore('item', () => {
	const itemCost = urlRef(URLPos.ItemCost, 0);
	const itemLevel = urlRef(URLPos.ItemLevel, 0);
	const rarity = urlRef(URLPos.Rarity, Rarity.Common);
	const batchSize = urlRef(URLPos.BatchSize, 1);
	const isPermanent = urlRef(URLPos.IsPermanent, false);

	const getDC = computed((): number => dcByLevel[itemLevel.value] + rarity.value);
	const batchCost = computed((): number => itemCost.value * batchSize.value);

	return {
		itemCost, itemLevel, rarity, batchSize, isPermanent,
		getDC, batchCost
	}
})
