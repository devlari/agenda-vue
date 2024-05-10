import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PhosphorIcons)

app.mount('#app')
