import { useCharacterStore } from "../stores/character";
import { useItemStore } from "../stores/item";
import { useSettingStore } from "../stores/settings";
import earnIncomeTable from "./earnIncomeTable";

interface SuccessDay {
	valueSpent: number, // Half the original cost
	valueTotal: number, // How much the item is worth now
	costRemaining: number,
}

interface TableRow {
	criticalSuccess: SuccessDay,
	success: SuccessDay,
}

interface FinalTable {
	days: TableRow[]
}

class CraftingCalculations {
	private characterStore = useCharacterStore()
	private itemStore = useItemStore()
	private settingStore = useSettingStore()

	setupDays(): number {
		const levelDifference = this.itemStore.itemLevel - this.characterStore.characterLevel;

		let nDays = 4;
		if (this.itemStore.isPermanent)
			nDays += 2;

		if (this.characterStore.hasQuickSetup && levelDifference <= -6)
			nDays -= 3
		else if(levelDifference <= -3)
			nDays -= 2
		else if(levelDifference <= -1)
			nDays -= 1

		nDays -= this.settingStore.rushSetup;

		// For the purposes of this calculator times below one day don't exist since there's no room for savings
		nDays = Math.max(nDays, 1)

		return nDays
	}
	earnIncomeLevel = (critical = false):
		number =>
			(earnIncomeTable
				.levels[this.characterStore.characterLevel + (critical ? 1 : 0)]
				?.success
				.get(this.characterStore.proficiencyLevel) ?? 0)
				* (this.settingStore.rushFinishing ? 2 : 1)

	finalCalculation(): FinalTable {
		const baseCost = this.itemStore.batchCost / 2;
		const setupRows: TableRow = {
			criticalSuccess: {
				valueSpent: baseCost,
				valueTotal: baseCost,
				costRemaining: baseCost,
			},
			success: {
				valueSpent: baseCost,
				valueTotal: baseCost,
				costRemaining: baseCost,
			}
		}

		const table: FinalTable = {
			days: new Array(this.setupDays()).fill(setupRows)
		}

		const successIncome  = this.earnIncomeLevel(false)
		const criticalIncome = this.earnIncomeLevel(true )

		for(;;) {
			let nextRow = structuredClone(table.days[table.days.length - 1])

			nextRow.success.costRemaining -= successIncome
			nextRow.success.valueTotal    += successIncome

			if(nextRow.success.costRemaining < 0) {
				nextRow.success.costRemaining = 0
				nextRow.success.valueTotal    = this.itemStore.batchCost
			}

			if(nextRow.criticalSuccess.costRemaining > 0) {
				nextRow.criticalSuccess.costRemaining -= criticalIncome
				nextRow.criticalSuccess.valueTotal    += criticalIncome

				if(nextRow.criticalSuccess.costRemaining < 0) {
					nextRow.criticalSuccess.costRemaining = 0
					nextRow.criticalSuccess.valueTotal    = this.itemStore.batchCost
				}
			}

			table.days.push(nextRow)

			if (nextRow.success.costRemaining <= 0)
				break
		}

		return table;
	}
}

export default CraftingCalculations