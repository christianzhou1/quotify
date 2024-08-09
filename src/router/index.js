import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
