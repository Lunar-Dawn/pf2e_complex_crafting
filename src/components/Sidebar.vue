<template>
	<nav class="sidebar">
		<router-link :to="{ name:'index' }">Calculator</router-link>
		<router-link :to="{ name: 'about' }">About</router-link>
	</nav>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
nav {
	text-align: right;

	display: flex;
	flex-direction: column;

	line-height: 2.5em;

	border-right: 1px lightgrey solid;

	> * {
		margin-right: 1em;
	}
}
</style>