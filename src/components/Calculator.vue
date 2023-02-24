<template>
	<CharacterForm/>
	<ItemForm/>
	<SettingsForm/>
	<Results/>
</template>

<script setup lang="ts">
import CharacterForm from "./CharacterForm.vue";
import ItemForm from "./ItemForm.vue";
import SettingsForm from "./SettingsForm.vue";
import Results from "./Results.vue";
</script>

<style scoped lang="scss">
fieldset {
	display: flex;
	flex-direction: column;
}
</style>