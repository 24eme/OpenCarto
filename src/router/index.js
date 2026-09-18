import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import EtageView from "@/views/EtageView.vue";
import AddInfoPointView from "@/views/AddInfoPointView.vue";
import PrisePhotoView from "@/views/PrisePhotoView.vue";
import AddCoordonneesPoint from "@/views/AddCoordonneesPointView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:etage",
      name: "etage",
      component: EtageView,
    },
    {
      path: "/:etage/point/add",
      name: 'addInfoPoint',
      component: AddInfoPointView,
    },
    {
      path: "/:etage/point/prisePhoto",
      name: 'prisePhoto',
      component: PrisePhotoView,
    },
    {
      path: "/:etage/point/addCoordonneesPoint",
      name: 'addCoordonneesPoint',
      component: AddCoordonneesPoint,
    },
  ],
})

export default router
