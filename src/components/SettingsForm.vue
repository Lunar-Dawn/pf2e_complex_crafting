<template>
	<div>
		<fieldset class="numberWrapper">
			<legend>Crafting Modifier</legend>
			<label for="modifier" hidden>Crafting Modifier</label>
			<input type="number" id="modifier" v-model.number="settingStore.craftingModifier"/>
		</fieldset>
		<fieldset class="checkboxWrapper">
			<legend>Rushing</legend>

			<fieldset class="radioWrapper">
				<legend>Rush Setup</legend>

				<div class="radioRow">
					<input type="radio" id="trainedRushSetup" v-model="settingStore.rushSetup" :value="0"/>
					<label for="trainedRushSetup">Don't Rush Setup</label>
				</div>
				<div class="radioRow">
					<input type="radio" id="expertRushSetup" v-model="settingStore.rushSetup" :value="1" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Expert"/>
					<label for="expertRushSetup">Expert: +5 DC, -1 Days Setup</label>
				</div>
				<div class="radioRow">
					<input type="radio" id="masterRushSetup" v-model="settingStore.rushSetup" :value="2" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Master"/>
					<label for="masterRushSetup">Master: +10 DC, -2 Days Setup</label>
				</div>
				<div class="radioRow">
					<input type="radio" id="legendaryRushSetup" v-model="settingStore.rushSetup" :value="3" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Legendary"/>
					<label for="legendaryRushSetup">Legendary: +15 DC, -3 Days Setup</label>
				</div>
			</fieldset>

			<input type="checkbox" id="rushFinishing" v-model="settingStore.rushFinishing">
			<label for="rushFinishing">Rush Finishing</label>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import { ProficiencyLevel } from "../util/proficiency";

import { useCharacterStore } from "../stores/character";
import { useSettingStore } from "../stores/settings";

const characterStore = useCharacterStore()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">

</style>