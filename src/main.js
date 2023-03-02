import { createApp } from 'vue'
import { createPinia } from 'pinia'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

//bootstrap5
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/all.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.mount('#app')
