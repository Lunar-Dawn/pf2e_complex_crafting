import { defineStore } from "pinia";
import { computed } from "vue";

import earnIncomeTable from "../util/earnIncomeTable";
import { createUndoPatchFunction, URLPos, urlRef } from "./util";
import { ProficiencyLevel } from "../util/proficiency";

export const useCharacterStore = defineStore('character', () => {
	const characterLevel = urlRef(URLPos.CharacterLevel, 1);
	const proficiencyLevel = urlRef(URLPos.ProficiencyLevel, ProficiencyLevel.Trained);
	const intModifier = urlRef(URLPos.IntScore, 0);
	const hasQuickSetup = urlRef(URLPos.HasQuickSetup, false);
	const otherModifier = urlRef(URLPos.CraftingModifier, 0)

	const totalProficiency = computed((): number => characterLevel.value + proficiencyLevel.value);

	const craftingModifier = computed(() => intModifier.value + totalProficiency.value + otherModifier.value);

	const assuranceResult = computed((): number => 10 + totalProficiency.value);

	function reset(this: CharacterStore): () => void {
		const ret = createUndoPatchFunction(this)

		this.$patch({
			characterLevel: 1,
			proficiencyLevel: ProficiencyLevel.Trained,
			intModifier: 0,
			hasQuickSetup: false,
			otherModifier: 0,
		})

		return ret
	}

	function earnIncomeLevel(critical: boolean): number {
		return earnIncomeTable[characterLevel.value + (critical ? 1 : 0)]
			?.success
			.get(proficiencyLevel.value) ?? 0
	}

	return {
		characterLevel, proficiencyLevel, intModifier, hasQuickSetup, otherModifier,
		assuranceResult, totalProficiency, craftingModifier,
		reset, earnIncomeLevel,
	}
})

type CharacterStore = ReturnType<typeof useCharacterStore>
