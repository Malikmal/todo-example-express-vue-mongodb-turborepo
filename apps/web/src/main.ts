import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

// Create a QueryClient for vue-query
const queryClient = new QueryClient()

app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
