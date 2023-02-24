import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes : [
		{
			name: 'index',
			path: '/',
			component: () => import('./components/Calculator.vue')
		},
		{
			name: 'about',
			path: '/about',
			component: () => import('./components/About.vue')
		}
	]
})

export default router
