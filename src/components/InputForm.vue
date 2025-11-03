<template>
	<SliderInput title="Character Level"    :min="1" :max="20" :step="1" v-model="characterStore.characterLevel"/>
	<SliderInput title="Intelligence Score" :min="6" :max="30" :step="1" v-model="characterStore.intScore">
		({{ signNumber(characterStore.intMod) }})
	</SliderInput>
	<fieldset class="number-wrapper">
		<legend>Crafting Modifier</legend>
		<label for="modifier" hidden>Crafting Modifier</label>
		<div class="fieldset-content">
			<input type="number" id="modifier" v-model.number="calculationStore.craftingModifier"/>
		</div>
	</fieldset>
	<fieldset class="checkbox-wrapper">
		<legend>Quick Setup</legend>
		<div class="fieldset-content">
			<input type="checkbox" id="hasQuickSetup" v-model="characterStore.hasQuickSetup">
			<label for="hasQuickSetup">Character has Quick Setup</label>
		</div>
	</fieldset>

	<RadioInput class="format-table col-span-2" title="Proficiency Level" v-model="characterStore.proficiencyLevel" :entries="[
		{ title: 'Trained',   optionValue: ProficiencyLevel.Trained   },
		{ title: 'Expert',    optionValue: ProficiencyLevel.Expert    },
		{ title: 'Master',    optionValue: ProficiencyLevel.Master    },
		{ title: 'Legendary', optionValue: ProficiencyLevel.Legendary },
	]"/>
	<RadioInput class="format-table col-span-2" title="Rush Setup" v-model="calculationStore.rushSetup" :entries="[
		{ title: 'Don\'t Rush Setup',                optionValue: 0 },
		{ title: 'Expert: +5 DC, -1 Days Setup',     optionValue: 1, isDisabled: () => characterStore.proficiencyLevel < ProficiencyLevel.Expert },
		{ title: 'Master: +10 DC, -2 Days Setup',    optionValue: 2, isDisabled: () => characterStore.proficiencyLevel < ProficiencyLevel.Master },
		{ title: 'Legendary: +15 DC, -3 Days Setup', optionValue: 3, isDisabled: () => characterStore.proficiencyLevel < ProficiencyLevel.Legendary },
	]"/>

	<SliderInput title="Item Level" :min="0" :max="25" :step="1" v-model="itemStore.itemLevel"/>
	<CoinInput v-model:copper-value="itemStore.itemCost"/>
	<RadioInput class="format-table col-span-2" title="Item Rarity" v-model="itemStore.rarity" :entries="[
		{ title: 'Common (±0)',   optionValue: Rarity.Common   },
		{ title: 'Uncommon (+2)', optionValue: Rarity.Uncommon },
		{ title: 'Rare (+5)',     optionValue: Rarity.Rare     },
		{ title: 'Unique (+10)',  optionValue: Rarity.Unique   },
	]"/>
	<fieldset class="number-wrapper">
		<legend>Batch Size</legend>
		<div class="fieldset-content">
			<label for="batchSize" hidden>Batch Size</label>
			<input type="number" id="batchSize" min="1" v-model.number="itemStore.batchSize"/>
		</div>
	</fieldset>
	<RadioInput class="format-row" title="Item Type" v-model="itemStore.isPermanent" :entries="[
		{ title: 'Consumable', optionValue: false },
		{ title: 'Permanent',  optionValue: true  },
	]"/>
	<fieldset class="checkbox-wrapper">
		<legend>Rushing</legend>
		<div class="fieldset-content">
			<input type="checkbox" id="rushFinishing" v-model="calculationStore.rushFinishing">
			<label for="rushFinishing">Rush Finishing</label>
		</div>
	</fieldset>
	<fieldset class="checkbox-wrapper">
		<legend>Formula</legend>
		<div class="fieldset-content">
			<input type="checkbox" id="hasFormula" v-model="calculationStore.hasFormula">
			<label for="hasFormula">Has formula</label>
		</div>
	</fieldset>
	<fieldset class="select-wrapper">
		<legend>Coin Display Mode</legend>
		<label for="coinDisplayMode" hidden>Coin Display Mode</label>
		<div class="fieldset-content">
			<select id="coinDisplayMode" v-model.number="settingStore.coinFormat">
				<option :value="CoinFormat.Separate" >{{ formatCoins(123, CoinFormat.Separate) }}</option>
				<option :value="CoinFormat.DecimalGp">{{ formatCoins(123, CoinFormat.DecimalGp) }}</option>
				<option :value="CoinFormat.DecimalSp">{{ formatCoins(123, CoinFormat.DecimalSp) }}</option>
				<option :value="CoinFormat.DecimalCp">{{ formatCoins(123, CoinFormat.DecimalCp) }}</option>
			</select>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import CoinInput from "./input/CoinInput.vue";
import SliderInput from "./input/SliderInput.vue";
import RadioInput from "./input/RadioInput.vue";

import { useCharacterStore } from "../stores/character";
import { useCalculationStore } from "../stores/calculation";
import { useItemStore } from "../stores/item";
import { useSettingStore } from "../stores/settings";

import { ProficiencyLevel } from "../util/proficiency";
import { Rarity } from "../util/rarity";
import { CoinFormat, formatCoins, signNumber } from "../util/format";

const characterStore = useCharacterStore();
const calculationStore = useCalculationStore();
const itemStore = useItemStore()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">

</style>