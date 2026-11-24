import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import EtageView from "@/views/EtageView.vue";
import AddInfoPosteView from "@/views/AddInfoPosteView.vue";
import PrisePhotoView from "@/views/PrisePhotoView.vue";
import AddCoordonneesPoste from "@/views/AddCoordonneesPosteView.vue";
import TableInfoPoste from "@/components/TableInfoPoste.vue";
import TableHistoryPoste from "@/components/TableHistoryPoste.vue";

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
      children: [
        {
          path: "p/:poste",
          name: "posteInfos",
          component: TableInfoPoste,
        },
        {
          path: "p/:poste/history",
          name: "posteHistory",
          component: TableHistoryPoste,
        },
      ]
    },
    {
      path: "/:etage/poste/add",
      name: "addInfoPoste",
      component: AddInfoPosteView,
      props: { isExistingPoste: false },
    },
    {
      path: "/:etage/poste/prisePhoto",
      name: 'prisePhoto',
      component: PrisePhotoView,
    },
    {
      path: "/:etage/poste/addCoordonneesPoste",
      name: "addCoordonneesPoste",
      component: AddCoordonneesPoste,
    },
    {
      path: "/:etage/:poste/edit",
      name: "editInfoPoste",
      component: AddInfoPosteView,
      props: { isExistingPoste: true },
    },
  ],
})

export default router
