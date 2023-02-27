import { defineStore } from "pinia";

import { ProficiencyLevel } from "../util/proficiency";
import earnIncomeTable from "../util/earnIncomeTable";

export const useCharacterStore = defineStore('character', {
	state: () => ({
		characterLevel: 1,
		proficiencyLevel: ProficiencyLevel.Trained,
		intScore: 10,
		hasQuickSetup: false,
	}),
	getters: {
		totalProficiency: (state): number => state.characterLevel + state.proficiencyLevel,
		intMod: (state): number => Math.floor((state.intScore - 10) / 2),
		rollModifier(): number {
			return this.totalProficiency + this.intMod;
		},
		earnIncomeLevel(): (critical: boolean) => number {
			return (critical: boolean): number => {
				return earnIncomeTable
					.levels[this.characterLevel + (critical ? 1 : 0)]
					?.success
					.get(this.proficiencyLevel) ?? 0
			}
		},
		assuranceResult(): number {
			return 10 + this.totalProficiency;
		},
	}
})
