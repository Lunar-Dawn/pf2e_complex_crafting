<template>
	<fieldset class="slider-wrapper">
		<legend>Character Level</legend>
		<label for="characterLevel" hidden>Character Level</label>
		<input
				type="range" id="characterLevel"
				min="1" max="20" step="1"
				v-model.number="characterStore.characterLevel"/>
		<div class="value-display">
			{{ characterStore.characterLevel }}
		</div>
	</fieldset>
	<fieldset class="slider-wrapper">
		<legend>Intelligence Score</legend>
		<input
				type="range" id="intelligenceScore"
				min="8" max="30" step="1"
				v-model.number="characterStore.intScore"/>
		<div class="value-display">
			{{ characterStore.intScore }}
			({{ characterStore.intMod === 0 ? '±' : '' }}{{ characterStore.intMod > 0 ? '+' : '' }}{{ characterStore.intMod }})
		</div>
	</fieldset>
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

		<div class="radioRow">
			<input type="radio" id="trained"   v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Trained"/>
			<label for="trained">Trained</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="expert"    v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Expert"/>
			<label for="expert">Expert</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="master"    v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Master"/>
			<label for="master">Master</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="legendary" v-model.number="characterStore.proficiencyLevel" :value="ProficiencyLevel.Legendary"/>
			<label for="legendary">Legendary</label>
		</div>
	</fieldset>
	<fieldset class="radio-wrapper col-span-2">
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

	<fieldset class="slider-wrapper">
		<legend>Item Level</legend>
		<label for="itemLevel" hidden>Item Level</label>
		<input
				type="range" id="itemLevel"
				min="0" max="25" step="1"
				v-model.number="itemStore.itemLevel"/>
		<div class="value-display">
			{{ itemStore.itemLevel }}
		</div>
	</fieldset>
	<CoinInput v-model:copper-value="itemStore.itemCost"/>
	<fieldset class="radio-wrapper col-span-2">
		<legend>Rarity</legend>
		<div class="radioRow">
			<input type="radio" id="common"   v-model.number="itemStore.rarity" :value="Rarity.Common"/>
			<label for="common">Common (±0)</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="uncommon"    v-model.number="itemStore.rarity" :value="Rarity.Uncommon"/>
			<label for="uncommon">Uncommon (+2)</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="rare"    v-model.number="itemStore.rarity" :value="Rarity.Rare"/>
			<label for="rare">Rare (+5)</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="unique" v-model.number="itemStore.rarity" :value="Rarity.Unique"/>
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
		<div class="radioRow">
			<input type="radio" id="isPermanentFalse" v-model="itemStore.isPermanent" :value="false"/>
			<label for="isPermanentFalse">Consumable</label>
		</div>
		<div class="radioRow">
			<input type="radio" id="isPermanentTrue" v-model="itemStore.isPermanent" :value="true"/>
			<label for="isPermanentTrue">Permanent</label>
		</div>
	</fieldset>
	<fieldset class="checkbox-wrapper col-span-2">
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

const characterStore = useCharacterStore();
const itemStore = useItemStore()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">

</style>