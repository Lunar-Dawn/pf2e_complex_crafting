<template>
	<div>
		<fieldset class="sliderWrapper">
			<legend>Character Level</legend>
			<label for="characterLevel" hidden>Character Level</label>
			<input
					type="range" id="characterLevel"
					min="1" max="20" step="1"
					v-model.number="characterStore.characterLevel"/>
			{{ characterStore.characterLevel }}
		</fieldset>
		<fieldset class="radioWrapper">
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
		<fieldset class="sliderWrapper">
			<legend>Intelligence Score</legend>
			<input
					type="range" id="intelligenceScore"
					min="8" max="30" step="1"
					v-model.number="characterStore.intScore"/>
			{{ characterStore.intScore }}
			({{ characterStore.intMod === 0 ? '±' : '' }}{{ characterStore.intMod > 0 ? '+' : '' }}{{ characterStore.intMod }})
		</fieldset>
		<fieldset class="checkboxWrapper">
			<legend>Quick Setup</legend>
			<input type="checkbox" id="hasQuickSetup" v-model="characterStore.hasQuickSetup">
			<label for="hasQuickSetup">Character has Quick Setup</label>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "../stores/character";
import { ProficiencyLevel } from "../util/proficiency";

const characterStore = useCharacterStore();
</script>

<style scoped lang="scss">

</style>