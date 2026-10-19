import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import EtageView from "@/views/EtageView.vue";
import AddInfoPosteView from "@/views/AddInfoPosteView.vue";
import PrisePhotoView from "@/views/PrisePhotoView.vue";
import AddCoordonneesPoste from "@/views/AddCoordonneesPosteView.vue";
import TableInfoPoste from "@/components/TableInfoPoste.vue";
import RapportView from '@/views/RapportView.vue';
import SuiviInfestationView from '@/views/SuiviInfestationView.vue';

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
      ]
    },
    {
      path: "/:etage/poste/add",
      name: "addInfoPoste",
      component: AddInfoPosteView,
    },
    {
      path: "/:etage/poste/prisePhoto",
      name: 'prisePhoto',
      component: PrisePhotoView,
    },
    {
      path: "/:etage/poste/rapport",
      name: 'rapport',
      component: RapportView,
    },
    {
      path: "/:etage/poste/addCoordonneesPoste",
      name: "addCoordonneesPoste",
      component: AddCoordonneesPoste,
    },

    {
      path: "/:etage/:poste/suiviInfestation",
      name: 'suiviInfestation',
      component: SuiviInfestationView,
    },
  ],
})

export default router
