<template>
	<SliderInput title="Character Level"    :min="1" :max="20" :step="1" v-model="characterStore.characterLevel"/>
	<SliderInput title="Intelligence Score" :min="6" :max="30" :step="1" v-model="characterStore.intScore">
		({{ characterStore.intMod === 0 ? '±' : '' }}{{ characterStore.intMod > 0 ? '+' : '' }}{{ characterStore.intMod }})
	</SliderInput>
	<fieldset class="number-wrapper">
		<legend>Crafting Modifier</legend>
		<label for="modifier" hidden>Crafting Modifier</label>
		<input type="number" id="modifier" v-model.number="settingStore.craftingModifier"/>
	</fieldset>
	<fieldset class="checkbox-wrapper">
		<legend>Quick Setup</legend>
		<input type="checkbox" id="hasQuickSetup" v-model="characterStore.hasQuickSetup">
		<label for="hasQuickSetup">Character has Quick Setup</label>
	</fieldset>

	<fieldset class="radio-wrapper col-span-2">
		<legend>Proficiency Level</legend>

		<div class="radio-options-wrapper radio-options-table">
			<input type="radio" id="trained"   v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Trained" hidden/>
			<label for="trained">Trained</label>

			<input type="radio" id="expert"    v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Expert" hidden/>
			<label for="expert">Expert</label>

			<input type="radio" id="master"    v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Master" hidden/>
			<label for="master">Master</label>

			<input type="radio" id="legendary" v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Legendary" hidden/>
			<label for="legendary">Legendary</label>
		</div>
	</fieldset>
	<fieldset class="radio-wrapper col-span-2">
		<legend>Rush Setup</legend>

		<div class="radio-options-wrapper radio-options-table">
			<input type="radio" id="trainedRushSetup" v-model="settingStore.rushSetup" :value="0" hidden/>
			<label for="trainedRushSetup">Don't Rush Setup</label>

			<input type="radio" id="expertRushSetup" v-model="settingStore.rushSetup" :value="1" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Expert" hidden/>
			<label for="expertRushSetup">Expert: +5 DC, -1 Days Setup</label>

			<input type="radio" id="masterRushSetup" v-model="settingStore.rushSetup" :value="2" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Master" hidden/>
			<label for="masterRushSetup">Master: +10 DC, -2 Days Setup</label>

			<input type="radio" id="legendaryRushSetup" v-model="settingStore.rushSetup" :value="3" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Legendary" hidden/>
			<label for="legendaryRushSetup">Legendary: +15 DC, -3 Days Setup</label>
		</div>
	</fieldset>

	<SliderInput title="Item Level" :min="0" :max="25" :step="1" v-model="itemStore.itemLevel"/>
	<CoinInput v-model:copper-value="itemStore.itemCost"/>
	<fieldset class="radio-wrapper col-span-2">
		<legend>Rarity</legend>

		<div class="radio-options-wrapper radio-options-table">
			<input type="radio" id="common"   v-model.number="itemStore.rarity" :value="Rarity.Common" hidden/>
			<label for="common">Common (±0)</label>

			<input type="radio" id="uncommon"    v-model.number="itemStore.rarity" :value="Rarity.Uncommon" hidden/>
			<label for="uncommon">Uncommon (+2)</label>

			<input type="radio" id="rare"    v-model.number="itemStore.rarity" :value="Rarity.Rare" hidden/>
			<label for="rare">Rare (+5)</label>

			<input type="radio" id="unique" v-model.number="itemStore.rarity" :value="Rarity.Unique" hidden/>
			<label for="unique">Unique (+10)</label>
		</div>
	</fieldset>
	<fieldset class="number-wrapper">
		<legend>Batch Size</legend>
		<label for="batchSize" hidden>Batch Size</label>
		<input type="number" id="batchSize" min="1" v-model.number="itemStore.batchSize"/>
	</fieldset>
	<fieldset class="radio-wrapper">
		<legend>Item Type</legend>

		<div class="radio-options-wrapper radio-options-row">
			<input type="radio" id="isPermanentFalse" v-model="itemStore.isPermanent" :value="false" hidden/>
			<label for="isPermanentFalse">Consumable</label>

			<input type="radio" id="isPermanentTrue" v-model="itemStore.isPermanent" :value="true" hidden/>
			<label for="isPermanentTrue">Permanent</label>
		</div>
	</fieldset>
	<fieldset class="checkbox-wrapper">
		<legend>Rushing</legend>
		<input type="checkbox" id="rushFinishing" v-model="settingStore.rushFinishing">
		<label for="rushFinishing">Rush Finishing</label>
	</fieldset>
	<fieldset class="select-wrapper">
		<legend>Coin Display Mode</legend>
		<label for="coinDisplayMode" hidden>Coin Display Mode</label>
		<select id="coinDisplayMode" v-model.number="settingStore.coinFormat">
			<option :value="CoinFormat.Separate" >{{ formatCoins(123, CoinFormat.Separate) }}</option>
			<option :value="CoinFormat.DecimalGp">{{ formatCoins(123, CoinFormat.DecimalGp) }}</option>
			<option :value="CoinFormat.DecimalSp">{{ formatCoins(123, CoinFormat.DecimalSp) }}</option>
			<option :value="CoinFormat.DecimalCp">{{ formatCoins(123, CoinFormat.DecimalCp) }}</option>
		</select>
	</fieldset>
</template>

<script setup lang="ts">
import CoinInput from "./CoinInput.vue";

import { useCharacterStore } from "../stores/character";
import { useItemStore } from "../stores/item";
import { useSettingStore } from "../stores/settings";

import { ProficiencyLevel } from "../util/proficiency";
import { Rarity } from "../util/rarity";
import formatCoins, { CoinFormat } from "../util/formatCoins";
import SliderInput from "./SliderInput.vue";

const characterStore = useCharacterStore();
const itemStore = useItemStore()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">

</style>