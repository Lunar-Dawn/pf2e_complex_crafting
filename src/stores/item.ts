import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

import { dcByLevel } from "../util/dcByLevel";
import { Rarity } from "../util/rarity";
import { URLPos, useURLMetaStore } from "./url";
import { createUndoPatchFunction } from "./util";

export const useItemStore = defineStore('item', () => {
	const URLMetaStore = useURLMetaStore()

	const itemCost = ref(0);
	const itemLevel = ref(0);
	const rarity = ref(Rarity.Common);
	const batchSize = ref(1);
	const isPermanent = ref(true);
	const hasFormula = ref(false);

	URLMetaStore.registerURLParameter(URLPos.ItemCost,    itemCost)
	URLMetaStore.registerURLParameter(URLPos.ItemLevel,   itemLevel)
	URLMetaStore.registerURLParameter(URLPos.Rarity,      rarity)
	URLMetaStore.registerURLParameter(URLPos.BatchSize,   batchSize)
	URLMetaStore.registerURLParameter(URLPos.IsPermanent, isPermanent)
	URLMetaStore.registerURLParameter(URLPos.HasFormula,  hasFormula)

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