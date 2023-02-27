<template xmlns="http://www.w3.org/1999/html">
	<fieldset>
		<legend>Final crafting results</legend>
		<div class="wrapper">
			<div>
				Proficiency Bonus: {{ signNumber(characterStore.totalProficiency) }}
				<br/>
				Final modifier: {{ signNumber(calculationStore.finalCraftingMod) }}
				<br/>
				Assurance Result: {{ characterStore.assuranceResult }}
				({{rollString(baseRollOutcome(characterStore.assuranceResult, calculationStore.finalDC))}})
			</div>
			<div>
				Base Item DC: {{ itemStore.getDC }}
				<br/>
				Rush Modifier: {{ signNumber(calculationStore.rushModifier) }}
				<br/>
				Final DC {{ calculationStore.finalDC }}
			</div>
			<div>
				Success Chance: {{ percentString(calculationStore.outcomeChances.success) }}
				<br/>
				Critical Success Chance: {{ percentString(calculationStore.outcomeChances.criticalSuccess) }}
			</div>
			<div>
				Failure Chance: {{ percentString(calculationStore.outcomeChances.failure) }}
				<br/>
				Critical Failure Chance: {{ percentString(calculationStore.outcomeChances.criticalFailure) }}
			</div>
			<div class="row-span-2 roll-results">
				<h4>Crafting Outcomes</h4>
				<div class="roll-row">
					<span v-for="(outcome, index) in calculationStore.outcomeChances.outcomes" :class="{
						cs: outcome === Outcome.CriticalSuccess,
						s: outcome  === Outcome.Success,
						f: outcome  === Outcome.Failure,
						cf: outcome === Outcome.CriticalFailure,
					}">
						{{ index + 1}}
					</span>
				</div>
			</div>
			<div class="row-span-2 roll-results" v-if="calculationStore.rushFinishing">
				<h4>Rush Outcomes</h4>
				<div class="roll-row">
						<span v-for="roll in 20" :class="{
							cs: rollOutcome(roll, 0, calculationStore.finishRushDC) === Outcome.CriticalSuccess,
							s:  rollOutcome(roll, 0, calculationStore.finishRushDC) === Outcome.Success,
							f:  rollOutcome(roll, 0, calculationStore.finishRushDC) === Outcome.Failure,
							cf: rollOutcome(roll, 0, calculationStore.finishRushDC) === Outcome.CriticalFailure,
						}">
							{{ roll }}
						</span>
				</div>
			</div>
		</div>
	</fieldset>
</template>

<script setup lang="ts">
import { useCharacterStore } from "../stores/character";
import { useCalculationStore } from "../stores/calculation";
import { useItemStore } from "../stores/item";

import { signNumber } from "../util/format";
import { baseRollOutcome, Outcome, rollOutcome } from "../util/misc";

const characterStore = useCharacterStore();
const calculationStore = useCalculationStore();
const itemStore = useItemStore()

const percentString = (n: number): string => `${Math.round(n / 20 * 100)}%`

function rollString(outcome: Outcome): string {
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
</script>

<style scoped lang="scss">
fieldset {
	margin-bottom: .6em;
}
.wrapper {
	display: grid;
	grid-template-columns: repeat(2, calc(50% - .1em));
	grid-gap: .2em;

	overflow-wrap: break-word;

	p {
	}
}
.roll-results {
	text-align: center;

	.roll-row {
		display: grid;
		grid-template-columns: repeat(20, 1fr);

		font-family: sans-serif;
		font-weight: bold;

		.cs {
			background: dodgerblue;
		}
		.s {
			background: green;
		}
		.f {
			background: darkorange;
		}
		.cf {
			background: red;
		}

		.cs, .s, .f, .cf {
			&:first-of-type {
				border-bottom-left-radius: 10em;
				border-top-left-radius: 10em;
			}
			&:last-of-type {
				border-bottom-right-radius: 10em;
				border-top-right-radius: 10em;
			}
		}
	}

	h4 {
		margin-bottom: .5em;
		margin-top: 0;
	}
}
</style>