<template>
	<div>
		<fieldset class="priceWrapper numberWrapper">
			<legend>Item Price</legend>
			<input type="number" id="gold"   min="0" v-model.number="gold">
			<label for="gold">gp</label>
			<input type="number" id="silver" min="0" v-model.number="silver">
			<label for="silver">sp</label>
			<input type="number" id="copper" min="0" v-model.number="copper">
			<label for="copper">cp</label>
		</fieldset>
		<fieldset class="sliderWrapper">
			<legend>Item Level</legend>
			<label for="itemLevel" hidden>Item Level</label>
			<input
					type="range" id="itemLevel"
					min="0" max="25" step="1"
					v-model.number="itemStore.itemLevel"/>
			{{ itemStore.itemLevel }}
		</fieldset>
		<fieldset class="radioWrapper">
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
		<fieldset class="numberWrapper">
			<legend>Batch Size</legend>
			<label for="batchSize" hidden>Batch Size</label>
			<input type="number" id="batchSize" min="1" v-model.number="itemStore.batchSize"/>
		</fieldset>
		<fieldset class="radioWrapper">
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
	</div>
</template>

<script setup lang="ts">
import { useItemStore } from "../stores/item";
import { computed, watch } from "vue";
import { Rarity } from "../util/rarity";

const itemStore = useItemStore()

const copper = $ref(0)
const silver = $ref(0)
const gold   = $ref(0)

const copperTotal = computed(():number => gold * 100 + silver * 10 + copper)

watch(copperTotal, async (total) => {
	itemStore.itemCost = total
})
</script>

<style scoped lang="scss">

</style>