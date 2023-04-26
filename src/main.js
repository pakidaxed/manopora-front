import { createApp } from 'vue'
import { createPinia } from 'pinia'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
import App from './App.vue'
import './assets/main.scss'
import router from "./router";
import axios from "axios";

axios.defaults.withCredentials = true;

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(WaveUI, { theme: 'light' })

app.mount('#app')
