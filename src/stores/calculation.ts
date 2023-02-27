import { computed, ref } from "vue";

import { defineStore } from "pinia";

import { useCharacterStore } from "./character";
import { useItemStore } from "./item";

interface SuccessDay {
	valueSpent: number, // Half the original cost
	valueTotal: number, // How much the item is worth now
	costRemaining: number,
}

interface TableRow {
	day: number,
	isSetup: boolean,
	criticalSuccess: SuccessDay,
	success: SuccessDay,
}

export const useCalculationStore = defineStore('craftingCalculation', () => {
	const characterStore = useCharacterStore()
	const itemStore = useItemStore()

	const craftingModifier = ref(0)
	const rushFinishing = ref(false)
	const rushSetup = ref(0)

	const setUpCost = computed(() => itemStore.batchCost / 2)
	const setupDays = computed(() => {
		const levelDifference = itemStore.itemLevel - characterStore.characterLevel;

		let nDays = 4;
		if (itemStore.isPermanent)
			nDays += 2;

		if (characterStore.hasQuickSetup && levelDifference <= -6)
			nDays -= 3
		else if(levelDifference <= -3)
			nDays -= 2
		else if(levelDifference <= -1)
			nDays -= 1

		nDays -= rushSetup.value;

		// For the purposes of this calculator times below one day don't exist since there's no room for savings
		nDays = Math.max(nDays, 1)

		return nDays
	})

	function costSavedPerDay(critical: boolean = false) {
		return characterStore.earnIncomeLevel(critical)
			* (rushFinishing.value ? 2 : 1);
	}

	// Cache the massive table lookup
	const successPerDay  = computed(() => costSavedPerDay(false))
	const criticalPerDay = computed(() => costSavedPerDay(true ))

	function calculateRow(day: number): TableRow {
		const dayAdjusted = Math.max(day - setupDays.value, 0);
		const successProgress  = successPerDay.value  * dayAdjusted
		const criticalProgress = criticalPerDay.value * dayAdjusted

		return {
			day,
			isSetup: day <= setupDays.value,
			success: {
				valueSpent: setUpCost.value,
				valueTotal: Math.min(setUpCost.value + successProgress, itemStore.batchCost),
				costRemaining: Math.max(setUpCost.value - successProgress, 0),
			},
			criticalSuccess: {
				valueSpent: setUpCost.value,
				valueTotal: Math.min(setUpCost.value + criticalProgress, itemStore.batchCost),
				costRemaining: Math.max(setUpCost.value - criticalProgress, 0),
			}
		}
	}
	function* finalTable(): Generator<TableRow> {
			for(let day = 1;; day++) {
			const row = calculateRow(day);
			yield row

			if (row.success.costRemaining <= 0 && day >= setupDays.value)
				break
		}
	}

	return {
		craftingModifier, rushFinishing, rushSetup,
		setupDays,
		costSavedPerDay, finalTable,
	}
})