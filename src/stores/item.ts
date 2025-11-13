import { defineStore } from "pinia";
import { computed, watch } from "vue";

import { dcByLevel } from "../util/dcByLevel";
import { URLPos, urlRef } from "./util";
import { Rarity } from "../util/rarity";

export const useItemStore = defineStore('item', () => {
	const itemCost = urlRef(URLPos.ItemCost, 0);
	const itemLevel = urlRef(URLPos.ItemLevel, 0);
	const rarity = urlRef(URLPos.Rarity, Rarity.Common);
	const batchSize = urlRef(URLPos.BatchSize, 1);
	const isPermanent = urlRef(URLPos.IsPermanent, true);
	const hasFormula = urlRef(URLPos.HasFormula, false);

	const levelBasedDC = computed((): number => dcByLevel[itemLevel.value])
	const getDC = computed((): number => dcByLevel[itemLevel.value] + rarity.value);
	const batchCost = computed((): number => itemCost.value * batchSize.value);

	function reset() {
		itemCost.value = 0;
		itemLevel.value = 0;
		rarity.value = Rarity.Common;
		batchSize.value = 1;
		isPermanent.value = true;
		hasFormula.value = false;
	}

	watch(isPermanent, (value) => {
		if(value)
			batchSize.value = 1;
		else
			batchSize.value = 4;
	})

	return {
		itemCost, itemLevel, rarity, batchSize, isPermanent, hasFormula,
		levelBasedDC, getDC, batchCost,
		reset,
	}
})
