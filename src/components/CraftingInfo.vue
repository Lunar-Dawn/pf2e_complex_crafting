<template>
	<InputCategory title="Results">
		<h2>
			Modifier & DC
		</h2>

		<div class="number-table">
			<span class="left-text">Proficiency Modifier</span>
			<span class="sign"></span>
			<span class="left-num">{{ characterStore.totalProficiency }}</span>
			<span class="sign"></span>
			<span class="right-num">{{ itemStore.levelBasedDC }}</span>
			<span class="right-text">Level-Based DC</span>

			<span class="left-text">Intelligence Modifier</span>
			<span class="sign">{{ signSymbol(characterStore.intModifier) }}</span>
			<span class="left-num">{{ Math.abs(characterStore.intModifier) }}</span>
			<span class="sign">+</span>
			<span class="right-num">{{ Math.abs(itemStore.rarity) }}</span>
			<span class="right-text">Rarity DC Modifier</span>

			<span class="left-text">Other Modifiers</span>
			<span class="sign">{{ signSymbol(characterStore.otherModifier) }}</span>
			<span class="left-num">{{ Math.abs(characterStore.otherModifier) }}</span>
			<span class="sign">+</span>
			<span class="right-num">{{ Math.abs(calculationStore.rushModifier) }}</span>
			<span class="right-text">Rushed Setup Modifier</span>

			<span class="left-text">Total Crafting Modifier</span>
			<span class="sign">=</span>
			<span class="left-num">{{ characterStore.craftingModifier }}</span>
			<span class="sign">=</span>
			<span class="right-num">{{ calculationStore.finalDC }}</span>
			<span class="right-text">Final Crafting DC</span>
		</div>

		<h2>
			Crafting Roll Outcomes
		</h2>

		<div class="roll-wrapper">
			<div class="roll-overview">
				<template v-if="characterStore.assuranceResult < characterStore.craftingModifier + 1">
					<span class="bubble" :class="outcomeClass(calculationStore.assuranceOutcome)">{{ characterStore.assuranceResult }}</span>
				</template>
				<div v-else></div>

				<template v-for="{ outcome, total, roll } in calculationStore.outcomeChances">
					<span :class="[outcomeClass(outcome), { 'cap-left': roll === 1, 'cap-right': roll === 20 }]">
						{{ total }}
					</span>
				</template>

				<template v-if="characterStore.assuranceResult > characterStore.craftingModifier + 20">
					<span class="bubble" :class="outcomeClass(calculationStore.assuranceOutcome)">{{ characterStore.assuranceResult }}</span>
				</template>
				<div v-else></div>

				<div class="assurance-wrapper"
				     :class="outcomeClass(calculationStore.assuranceOutcome)"
				     :style="{ '--position': assurancePosition() }"
				>
					<div :aria-label="`Assurance result: ${ characterStore.assuranceResult } (${outcomeString(calculationStore.assuranceOutcome)})`">
						Assurance
					</div>
				</div>
			</div>
		</div>

		<CollapseAnimation :condition="calculationStore.rushFinishing">
			<h2>
				Rush Finishing Outcomes
			</h2>

			<div class="roll-wrapper">
				<div class="roll-overview">
					<div></div>
					<template v-for="roll in 20">
					<span   class="show"
					        :class="[outcomeClass(rollOutcome(roll, 0, calculationStore.finishRushDC)),
							{ 'cap-left': roll === 1, 'cap-right': roll === 20 }]"
					>
						{{ roll }}
					</span>
					</template>
					<div></div>
				</div>
			</div>
		</CollapseAnimation>
		<div class="spacer"></div>
	</InputCategory>
</template>

<script setup lang="ts">
import { useCalculationStore } from "../stores/calculation";
import { useCharacterStore } from "../stores/character";
import { useItemStore } from "../stores/item";

import { signSymbol } from "../util/format";
import { Outcome, rollOutcome } from "../util/misc";

import CollapseAnimation from "./animations/CollapseAnimation.vue";
import InputCategory from "./InputCategory.vue";

const characterStore = useCharacterStore();
const calculationStore = useCalculationStore();
const itemStore = useItemStore()

function outcomeString(outcome: Outcome): string {
	switch (outcome) {
		case Outcome.CriticalFailure:
			return "Critical Failure";
		case Outcome.Failure:
			return "Failure";
		case Outcome.Success:
			return "Success";
		case Outcome.CriticalSuccess:
			return "Critical Success";
	}
}

const outcomeClass = (outcome: Outcome) => {
	switch (outcome) {
		case Outcome.CriticalSuccess:
			return 'cs'
		case Outcome.Success:
			return 's'
		case Outcome.Failure:
			return 'f'
		case Outcome.CriticalFailure:
			return 'cf'
	}
}

const assurancePosition = (): number => {
	const ret = characterStore.assuranceResult - characterStore.craftingModifier

	if(ret < 0)
		return 0
	if(ret > 21)
		return 21

	return ret
}
</script>

<style scoped lang="scss">
@use "/src/assets/styles/_theme.scss";

h2 {
	align-self: stretch;

	margin: 10px 0 0;
	border-top: theme.$highlight-color 1px solid;

	background: theme.$subheader-bg;

	padding: 3px 0 3px 1em;
	font-size: 1.5em;
	font-weight: bold;
}

.number-table {
	display: grid;
	grid-template-columns: 1fr min-content 4ch min-content 4ch 1fr;

	margin-top: 10px;

	span {
		padding: .3em 1ch;
	}

	.left-num, .right-num, .sign {
		background-color: theme.$input-bg;
	}

	.left-text, .left-num, .right-num {
		text-align: right;
	}
	.left-num {
		border-right: 1px theme.$highlight-color solid;
	}
	.sign {
		padding-right: 0;
	}
}

.roll-wrapper {
	display: flex;
	justify-content: center;
	width: 100%;

	overflow-x: hidden;
}

.roll-overview {
	margin-top: 10px;

	display: flex;
	text-align: center;

	flex-wrap: wrap;
	align-items: baseline;

	width: 90%;
	color: black;

	> * {
		width: calc(100% / 22);
	}

	span {
		padding: .1em 0;

		font-weight: bold;

		background: var(--bg-color);
	}

	.cap-left {
		border-radius: 10em 0 0 10em;
	}
	.cap-right {
		border-radius: 0 10em 10em 0;
	}
	.bubble {
		border-radius: 10em;
	}

	.assurance-wrapper {
		margin-left: calc(calc(100% / 22) * (var(--position)) + 100%/44);

		display: grid;
		width: 0;

		> div {
			margin-top: 5px;
			padding: .2em .5ch;
			border-radius: 5px;

			position: relative;
			left: -50%;

			background: var(--bg-color);

			&::after {
				content: "";
				position: absolute;
				bottom: 100%;
				left: 50%;

				height: 22px;
				width: 22px;

				background: radial-gradient(
					white, var(--bg-color), var(--bg-color)
				);
				clip-path: polygon(0 100%, 50% 50%, 100% 100%);

				margin-left: -11px;
				margin-bottom: -1px;
			}
		}
	}
}

.spacer {
	margin-bottom: 10px;
}
</style>