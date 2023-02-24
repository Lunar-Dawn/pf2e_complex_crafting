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
	day: number,
	isSetup: boolean,
	criticalSuccess: SuccessDay,
	success: SuccessDay,
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
				* (this.settingStore.rushFinishing ? 2 : 1);

	calculateRow(day: number): TableRow {
		const baseCost = this.itemStore.batchCost / 2;

		const dayAdjusted = Math.max(day - this.setupDays(), 0);
		const successProgress  = this.earnIncomeLevel(false) * dayAdjusted
		const criticalProgress = this.earnIncomeLevel(true ) * dayAdjusted

		return {
			day,
			isSetup: day <= this.setupDays(),
			success: {
				valueSpent: baseCost,
				valueTotal: Math.min(baseCost + successProgress, this.itemStore.batchCost),
				costRemaining: Math.max(baseCost - successProgress, 0),
			},
			criticalSuccess: {
				valueSpent: baseCost,
				valueTotal: Math.min(baseCost + criticalProgress, this.itemStore.batchCost),
				costRemaining: Math.max(baseCost - criticalProgress, 0),
			}
		}
	}

	* finalCalculation(): Generator<TableRow> {
		for(let day = 1;; day++) {
			const row = this.calculateRow(day);
			yield row

			if (row.success.costRemaining <= 0 && day >= this.setupDays())
				break
		}
	}
}

export default CraftingCalculations