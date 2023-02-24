import { defineStore } from "pinia";

import { ProficiencyLevel } from "../util/proficiency";

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
	}
})
