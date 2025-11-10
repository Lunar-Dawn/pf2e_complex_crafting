<template>
	<div class="settings">
		<fieldset class="select-wrapper">
			<legend>Coin Display Mode</legend>
			<label for="coinDisplayMode" hidden>Coin Display Mode</label>
			<div class="fieldset-content">
				<select id="coinDisplayMode" v-model.number="settingStore.coinFormat">
					<option :value="CoinFormat.Separate" >{{ formatCoins(123, CoinFormat.Separate) }}</option>
					<option :value="CoinFormat.DecimalGp">{{ formatCoins(123, CoinFormat.DecimalGp) }}</option>
					<option :value="CoinFormat.DecimalSp">{{ formatCoins(123, CoinFormat.DecimalSp) }}</option>
					<option :value="CoinFormat.DecimalCp">{{ formatCoins(123, CoinFormat.DecimalCp) }}</option>
				</select>
			</div>
		</fieldset>
	</div>
</template>

<script setup lang="ts">
import { useSettingStore } from "../stores/settings";

import { CoinFormat, formatCoins } from "../util/format";

const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.settings {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
}
</style>