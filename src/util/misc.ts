// Splits cp into [gp, sp, cp]
export function splitCoins(cp: number): {gp: number, sp: number, cp: number} {
	const gp = Math.floor(cp / 100)
	cp %= 100
	const sp = Math.floor(cp / 10)
	cp %= 10

	return {gp, sp, cp}
}
