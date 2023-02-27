import { ref, Ref, watch } from "vue";

// Splits cp into [gp, sp, cp]
export function splitCoins(cp: number): {gp: number, sp: number, cp: number} {
	const gp = Math.floor(cp / 100)
	cp %= 100
	const sp = Math.floor(cp / 10)
	cp %= 10

	return {gp, sp, cp}
}
export enum Outcome {
	CriticalFailure,
	Failure,
	Success,
	CriticalSuccess,
}
export function baseRollOutcome (roll: number, dc: number): Outcome {
	const delta = roll - dc

	if(delta <= -9)
		return Outcome.CriticalFailure
	if(delta <= -1)
		return Outcome.Failure
	if(delta <= 9)
		return Outcome.Success
	return Outcome.CriticalSuccess
}
export function rollOutcome(roll: number, modifier: number, dc: number): Outcome {
	const result = roll + modifier;
	if(roll == 1)
		return Math.max(baseRollOutcome(result, dc) - 1, Outcome.CriticalFailure)
	if(roll == 20)
		return Math.min(baseRollOutcome(result, dc) + 1, Outcome.CriticalSuccess)
	return baseRollOutcome(result, dc)
}
export function localStorageRef<T>(key: string, defaultValue: T): Ref<T> {
	const storedValue = localStorage.getItem(key);

	const boundRef = ref(storedValue === null ? defaultValue : JSON.parse(storedValue) as T) as Ref<T>;

	watch(boundRef, () => {
		localStorage.setItem('coinFormat', JSON.stringify(boundRef.value))
	})

	return boundRef;
}
