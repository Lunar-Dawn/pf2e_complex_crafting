import { useSettingStore } from "../stores/settings";

export enum CoinFormat {
	Default,
	DecimalCp,
	DecimalSp,
	DecimalGp,
	Separate,
}

function separateFormatting(cp: number): string {
	let coins: string[] = []

	const gp = Math.floor(cp / 100)
	cp %= 100
	if (gp)
		coins.push(`${gp} gp`)

	const sp = Math.floor(cp / 10)
	cp %= 10
	if(sp)
		coins.push(`${sp} sp`)

	if(cp)
		coins.push(`${cp} cp`)

	return coins.join(', ')
}

function formatCoins(cp: number, format: CoinFormat = CoinFormat.Default): string {
	if (cp == 0)
		return '—'

	switch (format) {
		case CoinFormat.Default:
			return formatCoins(cp, useSettingStore().coinFormat)
		case CoinFormat.DecimalCp:
			return cp.toString() + " cp"
		case CoinFormat.DecimalSp:
			return (cp / 10).toString() + " sp"
		case CoinFormat.DecimalGp:
			return (cp / 100).toString() + " gp"
		case CoinFormat.Separate:
			return separateFormatting(cp)
	}
}

export default formatCoins
