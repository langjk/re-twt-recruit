import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { useRouter } from '@/router'

const app = createApp(App)

app.use(ElementPlus)
useRouter(app)
app.mount('#app')