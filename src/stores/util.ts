import { Store, storeToRefs } from "pinia";
import { ref, Ref, watch } from "vue";

export function localStorageRef<T>(key: string, defaultValue: T): Ref<T> {
	const storedValue = localStorage.getItem(key);

	const boundRef = ref(storedValue === null ? defaultValue : JSON.parse(storedValue) as T) as Ref<T>;

	watch(boundRef, () => {
		localStorage.setItem(key, JSON.stringify(boundRef.value))
	})

	return boundRef;
}

// Caches the $state of an entire store and creates a function that restores it, used to undo a store reset
export function createUndoPatchFunction(store: Store) {
	const oldState = Object.fromEntries(
		Object.entries(storeToRefs(store))
			.map(([k, v]) => [k, (v as Ref).value])
	)

	return () => store.$patch(oldState)
}
