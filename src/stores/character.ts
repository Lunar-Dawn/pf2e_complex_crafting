import { computed } from "vue";

import { defineStore } from "pinia";

import { ProficiencyLevel } from "../util/proficiency";
import earnIncomeTable from "../util/earnIncomeTable";
import { URLPos, urlRef } from "../util/misc";

export const useCharacterStore = defineStore('character', () => {
	const characterLevel = urlRef(URLPos.CharacterLevel, 1);
	const proficiencyLevel = urlRef(URLPos.ProficiencyLevel, ProficiencyLevel.Trained);
	const intModifier = urlRef(URLPos.IntScore, 0);
	const hasQuickSetup = urlRef(URLPos.HasQuickSetup, false);

	const totalProficiency = computed((): number => characterLevel.value + proficiencyLevel.value);

	const rollModifier = computed(() => totalProficiency.value + intModifier.value);

	const assuranceResult = computed((): number => 10 + totalProficiency.value);

	function earnIncomeLevel(critical: boolean): number {
		return earnIncomeTable[characterLevel.value + (critical ? 1 : 0)]
			?.success
			.get(proficiencyLevel.value) ?? 0
	}

	return {
		characterLevel, proficiencyLevel, intModifier, hasQuickSetup,
		assuranceResult, totalProficiency, rollModifier,
		earnIncomeLevel,
	}
})
