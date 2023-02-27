import { useSettingStore } from "../stores/settings";

import { splitCoins } from "./misc";

export enum CoinFormat {
	Default,
	DecimalCp,
	DecimalSp,
	DecimalGp,
	Separate,
}

function separateFormatting(value: number): string {
	let coins: string[] = []

	const {gp, sp, cp} = splitCoins(value);

	if (gp)
		coins.push(`${gp} gp`)
	if(sp)
		coins.push(`${sp} sp`)
	if(cp)
		coins.push(`${cp} cp`)

	return coins.join(', ')
}

export function formatCoins(cp: number, format: CoinFormat = CoinFormat.Default): string {
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

export function signSymbol(n: number): string {
	switch (Math.sign(n)) {
		case 1:
			return '+'
		case -1:
			return ''
		default:
			return '±'
	}
}
