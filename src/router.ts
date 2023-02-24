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
			name: 'license',
			path: '/license',
			component: () => import('./components/License.vue')
		}
	]
})

export default router
