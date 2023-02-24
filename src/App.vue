<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
	<article id="body-wrapper">
		<header>
			Advanced Crafting Calculator
		</header>
		<Sidebar/>
		<div id="main-wrapper">
			<router-view/>
		</div>
	</article>
</template>

<style scoped lang="scss">
#body-wrapper {
	display: grid;

	grid-template-rows: auto 1fr;
	grid-template-columns: 15% 85%;

	grid-template-areas:
		"header header"
		"sidebar main";

	height: 100vh;
}
header {
	font-family: sans-serif;
	font-weight: bold;
	font-size: 1.5em;
	border-bottom: 1px lightgrey solid;

	text-align: center;
	padding: .2em;

	background-color: inherit;

	grid-area: header;
}
#main-wrapper {
	padding: .3em;

	overflow: auto;
}
</style>
