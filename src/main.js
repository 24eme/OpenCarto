import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { hydrateFromServer } from "@/store/postes";

await hydrateFromServer();

const app = createApp(App)

app.use(router)

app.mount('#app')
