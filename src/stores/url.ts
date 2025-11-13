import { Base64 } from "js-base64";
import { defineStore } from "pinia";
import { ref, Ref, watch, WatchHandle } from "vue";

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

// Meta-store to keep track of url-bound parameters and keep them updated when something writes to the hash
export const useURLMetaStore = defineStore('URLMetaStore', () => {
	const trackedRefs = ref<Ref[]>([])
	const hashSetWatcher = ref<WatchHandle | null>(null)

	const onHashChangeIgnoreNext = ref(0)

	const resetWatcher = () => {
		hashSetWatcher.value?.()
		hashSetWatcher.value = watch(trackedRefs.value, values => {
			onHashChangeIgnoreNext.value++

			const oldValues = JSON.parse(Base64.decode(location.hash) || "[]") as any[]
			const newValues = values.map((value, index) => value.value ?? oldValues[index])
			location.hash = Base64.encodeURL(JSON.stringify(newValues))
		}, { immediate: false })
	}

	const registerURLParameter = (key: URLPos, ref: Ref): void => {
		const storedValue = getUrlValue(key)

		if(storedValue !== undefined && storedValue !== null)
			ref.value = storedValue

		trackedRefs.value[key] = ref

		resetWatcher()
	}

	window.addEventListener("hashchange", () => {
		if(onHashChangeIgnoreNext.value > 0) {
			onHashChangeIgnoreNext.value--
			return
		}

		const newValues = JSON.parse(Base64.decode(location.hash) || "[]") as any[]

		for(let i = 0; i < trackedRefs.value.length; i++) {
			const value = trackedRefs.value[i]
			const newValue = newValues[i]
			if(value.value !== newValue && newValue !== undefined && newValue !== null) {
				onHashChangeIgnoreNext.value = -1
				value.value = newValue ?? value.value
			}
		}
	})

	return {
		trackedRefs, hashSetWatcher, onHashChangeIgnoreNext,
		registerURLParameter
	}
})
