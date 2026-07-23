import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddInfoPointView from '../views/AddInfoPointView.vue'
import PrisePhotoView from '../views/PrisePhotoView.vue'
import AddCoordonneesPoint from '../views/addCoordonneesPointView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/addInfoPoint',
      name: 'addInfoPoint',
      component: AddInfoPointView,
    },
    {
      path: '/prisePhoto',
      name: 'prisePhoto',
      component: PrisePhotoView,
    },
    {
      path: '/addCoordonneesPoint',
      name: 'addCoordonneesPoint',
      component: AddCoordonneesPoint,
    },
  ],
})

export default router
