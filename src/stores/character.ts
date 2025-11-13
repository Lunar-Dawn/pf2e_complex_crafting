import { defineStore } from "pinia";
import { computed, ref } from "vue";

import earnIncomeTable from "../util/earnIncomeTable";
import { ProficiencyLevel } from "../util/proficiency";
import { URLPos, useURLMetaStore } from "./url";
import { createUndoPatchFunction } from "./util";

export const useCharacterStore = defineStore('character', () => {
	const URLMetaStore = useURLMetaStore()

	const characterLevel = ref(1)
	const proficiencyLevel = ref(ProficiencyLevel.Trained)
	const intModifier = ref(0)
	const hasQuickSetup = ref(false)
	const otherModifier = ref(0)

	URLMetaStore.registerURLParameter(URLPos.CharacterLevel,   characterLevel)
	URLMetaStore.registerURLParameter(URLPos.ProficiencyLevel, proficiencyLevel)
	URLMetaStore.registerURLParameter(URLPos.IntScore,         intModifier)
	URLMetaStore.registerURLParameter(URLPos.HasQuickSetup,    hasQuickSetup)
	URLMetaStore.registerURLParameter(URLPos.CraftingModifier, otherModifier)

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
