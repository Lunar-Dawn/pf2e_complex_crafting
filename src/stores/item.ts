import { defineStore } from "pinia";
import { computed, watch } from "vue";

import { dcByLevel } from "../util/dcByLevel";
import { createUndoPatchFunction, URLPos, urlRef } from "./util";
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

	function reset(this: ItemStore): () => void {
		const ret = createUndoPatchFunction(this)

		this.$patch({
			itemCost: 0,
			itemLevel: 0,
			rarity: Rarity.Common,
			batchSize: 1,
			isPermanent: true,
			hasFormula: false,
		})

		return ret
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

type ItemStore = ReturnType<typeof useItemStore>