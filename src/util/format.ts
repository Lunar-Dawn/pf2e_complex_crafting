import { useSettingStore } from "../stores/settings";

import { splitCoins } from "./misc";

export enum CoinFormat {
	Default,
	DecimalCp,
	DecimalSp,
	DecimalGp,
	Separate,
}

function formatDigits(coins: number, decimals: number = 0) : string {
	return coins.toLocaleString(undefined,
		{
			numberingSystem: 'arabic',
			maximumFractionDigits: decimals,
			trailingZeroDisplay: 'stripIfInteger',
			useGrouping: 'min2'
		});
}

function separateFormatting(value: number): string {
	let coins: string[] = []

	const {gp, sp, cp} = splitCoins(value);

	if (gp)
		coins.push(`${formatDigits(gp)} gp`)
	if(sp)
		coins.push(`${sp} sp`)
	if(cp)
		coins.push(`${cp} cp`)

	return coins.join(', ')
}

export function formatCoins(cp: number, format: CoinFormat = CoinFormat.Default): string {
	switch (format) {
		case CoinFormat.Default:
			return formatCoins(cp, useSettingStore().coinFormat)
		case CoinFormat.DecimalCp:
			return formatDigits(cp) + " cp"
		case CoinFormat.DecimalSp:
			return formatDigits(cp / 10, 1) + " sp"
		case CoinFormat.DecimalGp:
			return formatDigits(cp / 100, 2) + " gp"
		case CoinFormat.Separate:
			return separateFormatting(cp)
	}
}

export function formatCoinTableRow(cp: number): string {
	if (cp == 0)
		return '—'

	return formatCoins(cp)
}

export function signSymbol(n: number): string {
	switch (Math.sign(n)) {
		case 1:
			return '+'
		case -1:
			return '-'
		default:
			return '±'
	}
}

