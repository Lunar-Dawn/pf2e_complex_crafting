import { Base64 } from "js-base64";
import { ref, Ref, watch } from "vue";

// Try to enforce at least *some* consistency and order with indexes
export enum URLPos {
	CraftingModifier,
	RushFinishing,
	RushSetup,
	CharacterLevel,
	ProficiencyLevel,
	IntScore,
	HasQuickSetup,
	ItemCost,
	ItemLevel,
	Rarity,
	BatchSize,
	IsPermanent,
	HasFormula,
}

function getUrlValue<T>(key: URLPos): T {
	return JSON.parse(Base64.decode(location.hash) || "[]")[key] as T;
}
function setUrlValue<T>(key: URLPos, value: T) {
	const data = JSON.parse(Base64.decode(location.hash) || "[]")
	data[key] = value
	location.hash = Base64.encodeURL(JSON.stringify(data))
}

export function urlRef<T>(key: URLPos, defaultValue: T): Ref<T> {
	const storedValue = getUrlValue(key) as T

	const boundRef = ref(storedValue ?? defaultValue) as Ref<T>;
	setUrlValue(key, boundRef.value)

	watch(boundRef, (newValue) => {
		setUrlValue(key, newValue)
	})

	return boundRef
}

export function localStorageRef<T>(key: string, defaultValue: T): Ref<T> {
	const storedValue = localStorage.getItem(key);

	const boundRef = ref(storedValue === null ? defaultValue : JSON.parse(storedValue) as T) as Ref<T>;

	watch(boundRef, () => {
		localStorage.setItem(key, JSON.stringify(boundRef.value))
	})

	return boundRef;
}
