import { defineStore } from "pinia";
import { computed } from "vue";

import { baseRollOutcome, Outcome, rollOutcome, URLPos, urlRef } from "../util/misc";

import { useCharacterStore } from "./character";
import { useItemStore } from "./item";

interface SuccessDay {
	valueTotal: number, // How much the item is worth now
	costRemaining: number,
	isCompletion: boolean,
}

export interface TableRow {
	day: number,
	isSetup: boolean,
	criticalSuccess: SuccessDay,
	success: SuccessDay,
	valueSpent: number, // Half the original cost
}

export const useCalculationStore = defineStore('craftingCalculation', () => {
	const characterStore = useCharacterStore()
	const itemStore = useItemStore()

	const rushSetup = urlRef(URLPos.RushSetup, 0)
	const rushFinishing = urlRef(URLPos.RushFinishing, false)

	const setupDays = computed(() => {
		const levelDifference = itemStore.itemLevel - characterStore.characterLevel;

		let nDays = 2;
		if (itemStore.isPermanent)
			nDays += 2;

		if(itemStore.hasFormula)
			nDays -= 1;

		if (characterStore.hasQuickSetup && levelDifference <= -6)
			nDays -= 3
		else if(levelDifference <= -3)
			nDays -= 2
		else if(levelDifference <= -1)
			nDays -= 1

		nDays -= rushSetup.value;

		if(!itemStore.isPermanent && characterStore.hasQuickSetup && levelDifference <= -6 && rushSetup.value > 0)
			nDays = Math.max(nDays, 0)
		else
			nDays = Math.max(nDays, 1)

		return nDays
	})
	function costSavedPerDay(critical: boolean = false) {
		return characterStore.earnIncomeLevel(critical)
			* (rushFinishing.value ? 2 : 1);
	}

	const rushModifier = computed(() => rushSetup.value * 5)
	const finalDC = computed(() => itemStore.getDC + rushModifier.value)

	const finishRushDC = computed(() => 10 - characterStore.totalProficiency + itemStore.itemLevel)

	const outcomeChances = computed((): { outcome: Outcome, total: number, roll: number }[] => {
		return [...Array(20).keys()]
			.map(x => x + 1)
			.map(roll => ({
					outcome: rollOutcome(roll, characterStore.craftingModifier, finalDC.value),
					total: roll + characterStore.craftingModifier,
					roll,
				})
			)
	})

	const assuranceOutcome = computed(() => baseRollOutcome(characterStore.assuranceResult, finalDC.value))

	// Helpers for the final table
	const setUpCost = computed(() => itemStore.batchCost / 2)

	// Cache the massive table lookup
	const successPerDay  = computed(() => costSavedPerDay(false))
	const criticalPerDay = computed(() => costSavedPerDay(true ))

	function daysRequired(critical: boolean) {
		return Math.ceil(setUpCost.value / costSavedPerDay(critical)) + setupDays.value
	}
	const daysRequiredSuccess = computed(() => daysRequired(false));
	const daysRequiredCritical = computed(() => daysRequired(true));

	function calculateRow(day: number): TableRow {
		const dayAdjusted = Math.max(day - setupDays.value, 0);
		const successProgress  = successPerDay.value  * dayAdjusted
		const criticalProgress = criticalPerDay.value * dayAdjusted
		const isSetup = day <= setupDays.value

		return {
			day,
			isSetup,
			valueSpent: setUpCost.value,
			success: {
				valueTotal: Math.min(setUpCost.value + successProgress, itemStore.batchCost),
				costRemaining: Math.max(setUpCost.value - successProgress, 0),
				isCompletion: day == daysRequiredSuccess.value && !isSetup,
			},
			criticalSuccess: {
				valueTotal: Math.min(setUpCost.value + criticalProgress, itemStore.batchCost),
				costRemaining: Math.max(setUpCost.value - criticalProgress, 0),
				isCompletion: day == daysRequiredCritical.value && !isSetup,
			},
		}
	}
	function* finalTable(): Generator<TableRow> {
		if(setupDays.value === 0)
			yield calculateRow(0);

		for(let day = 1;; day++) {
			const row = calculateRow(day);
			yield row

			if (row.success.costRemaining <= 0 && day >= setupDays.value)
				break
		}
	}

	return {
		rushFinishing, rushSetup,
		assuranceOutcome, setupDays, rushModifier, finalDC, outcomeChances, finishRushDC, daysRequiredSuccess, daysRequiredCritical,
		costSavedPerDay, finalTable,
	}
})