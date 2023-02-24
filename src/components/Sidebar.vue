<template>
	<div class="sidebar-wrapper">
		<nav class="sidebar">
			<router-link :to="{ name:'index' }">Calculator</router-link>
			<router-link :to="{ name: 'license' }">License</router-link>
		</nav>
		<p class="copyright">
			Copyright &copy; 2023 Lunar Requiem
			<br/>
			Licensed under the MIT license
			<br/>
			<a href="https://github.com/LunarRequiem/pf2e_complex_crafting">Source code available on GitHub</a>
		</p>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.sidebar-wrapper {
	border-right: 1px lightgrey solid;

	display: flex;
	flex-direction: column;

	nav {
		text-align: right;

		display: flex;
		flex-direction: column;

		line-height: 2.5em;

		margin-right: 1em;
	}
	.copyright {
		margin-top: auto;
		text-align: center;

		font-size: .8em;
		color: darkgrey;
	}
}
</style>