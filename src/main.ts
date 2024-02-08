import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { useRouter } from '@/router'
import './style.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App)

//注册elementui内icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//主题色
app.config.globalProperties.$lightTWT = '#E3F5FD'; 
app.config.globalProperties.$TWT = '#00a1e9'; 
app.config.globalProperties.$orgId = 773804030; 

app.use(ElementPlus, {
  locale: zhCn,
})
useRouter(app)
app.mount('#app')