<template>
	<main>
		<div class="column">
			<InputCategory title="Character" :reset="characterStore.reset">
				<SliderInput title="Character Level" :min="1" :max="20" :step="1" v-model="characterStore.characterLevel"/>

				<SliderInput title="Intelligence Modifier" :min="-2" :max="+10" :step="1" v-model="characterStore.intModifier"/>

				<RadioInput title="Crafting Proficiency Level" v-model="characterStore.proficiencyLevel" :entries="[
					{ title: 'Trained',   optionValue: ProficiencyLevel.Trained   },
					{ title: 'Expert',    optionValue: ProficiencyLevel.Expert    },
					{ title: 'Master',    optionValue: ProficiencyLevel.Master    },
					{ title: 'Legendary', optionValue: ProficiencyLevel.Legendary },
				]"/>

				<div class="input-header number-header">
					<label class="header" for="modifier">Crafting Modifiers</label>
					<input type="number" id="modifier" min="-10" max="10" v-model.number="characterStore.otherModifier"/>
				</div>

				<div class="input-header checkbox-header">
					<label class="header" for="hasQuickSetup">Has Quick Setup</label>
					<input type="checkbox" id="hasQuickSetup" v-model="characterStore.hasQuickSetup" :disabled="characterStore.proficiencyLevel < ProficiencyLevel.Master">
				</div>
			</InputCategory>
		</div>

		<div class="column">
			<InputCategory title="Item" :reset="itemStore.reset">
				<SliderInput title="Item Level" :min="0" :max="25" :step="1" v-model="itemStore.itemLevel"/>
				<CoinInput v-model="itemStore.itemCost"/>
				<RadioInput title="Item Rarity" v-model="itemStore.rarity" :entries="[
					{ title: 'Common (±0)',   optionValue: Rarity.Common   },
					{ title: 'Uncommon (+2)', optionValue: Rarity.Uncommon },
					{ title: 'Rare (+5)',     optionValue: Rarity.Rare     },
					{ title: 'Unique (+10)',  optionValue: Rarity.Unique   },
				]"/>

				<RadioInput title="Item Type" v-model="itemStore.isPermanent" narrow :entries="[
					{ title: 'Permanent',  optionValue: true  },
					{ title: 'Consumable', optionValue: false },
				]"/>

				<CollapseAnimation :condition="!itemStore.isPermanent">
					<div class="input-header number-header">
						<label class="header" for="batchSize">Batch Size</label>
						<input type="number" id="batchSize" min="1" max="10" v-model.number="itemStore.batchSize"/>
					</div>
				</CollapseAnimation>

				<div class="input-header checkbox-header">
					<label class="header" for="hasFormula">Have formula</label>
					<input type="checkbox" id="hasFormula" v-model="itemStore.hasFormula">
				</div>
			</InputCategory>
			<InputCategory title="Rushing">
				<RushSetup v-model="calculationStore.rushSetup"/>
				<div class="input-header checkbox-header">
					<label class="header" for="rushFinishing">Rush Finishing</label>
					<input type="checkbox" id="rushFinishing" v-model="calculationStore.rushFinishing">
				</div>
			</InputCategory>
		</div>

		<div class="column">
			<aside>
				<CraftingInfo/>
			</aside>
			<aside>
				<CostTable/>
			</aside>
		</div>
	</main>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { useCalculationStore } from "../stores/calculation";
import { useCharacterStore } from "../stores/character";
import { useItemStore } from "../stores/item";

import { ProficiencyLevel } from "../util/proficiency";
import { Rarity } from "../util/rarity";

import CollapseAnimation from "./animations/CollapseAnimation.vue";
import CostTable from "./CostTable.vue";
import CraftingInfo from "./CraftingInfo.vue";
import CoinInput from "./input/CoinInput.vue";
import RadioInput from "./input/RadioInput.vue";
import RushSetup from "./input/RushSetup.vue";
import SliderInput from "./input/SliderInput.vue";
import InputCategory from "./InputCategory.vue";

const characterStore = useCharacterStore();
const calculationStore = useCalculationStore();
const itemStore = useItemStore()

watch(() => characterStore.proficiencyLevel, (prof) => {
	if(prof < ProficiencyLevel.Master)
		characterStore.hasQuickSetup = false
})
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";
main {
	display: grid;
	grid-template-columns: 3fr 3fr 4fr;

	column-gap: 10px;
}

:deep(input) {
	background: theme.$input-bg;
	padding: 0;

	&:hover, &:focus-visible {
		background: theme.$input-bg-active;
	}

	&[type=number] {
		border-bottom: 1px theme.$highlight-color solid;

		&:hover, &:focus-visible {
			border-bottom: 2px theme.$highlight-color solid;
			padding-top: 1px;
		}
	}

	&[type=checkbox] {
		height: calc(100% - 2px);
		margin: 1px;
		aspect-ratio: 1;

		appearance: none;

		display: grid;
		place-content: center;

		transition: box-shadow .25s;

		color: theme.$highlight-color;

		&::after {
			content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='#{theme.$highlight-color}' %3E%3Cpath d='M382-208 122-468l90-90 170 170 366-366 90 90-456 456Z'/%3E%3C/svg%3E");
			transform: scale(0%);

			height: 2em;
			width: 2em;

			transition: transform .25s;
		}

		&:checked {
			box-shadow: theme.$highlight-color .25em .25em inset, theme.$highlight-color -.25em -.25em inset;

			&::after {
				transform: scale(100%);
			}
		}

		&:disabled {
			cursor: not-allowed;

			background: repeating-linear-gradient(
				45deg,
				theme.$input-bg,
				theme.$input-bg calc(2px * sqrt(2)),
				theme.$input-bg-active calc(2px * sqrt(2)),
				theme.$input-bg-active calc(4px * sqrt(2))
			);
		}
	}
}

:deep(.input-header)  {
	align-self: stretch;

	margin-top: 10px;
	border-top: theme.$highlight-color 1px solid;

	background: theme.$subheader-bg;

	display: grid;

	.header {
		padding: 3px 0 3px 1em;
		font-size: 1.5em;
		font-weight: bold;
	}
}
:deep(.number-header) {
	grid-template-columns: 1fr minmax(8ch, auto);
}
:deep(.checkbox-header) {
	grid-template-columns: 1fr auto;
}
</style>