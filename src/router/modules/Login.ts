import type { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component:  () => import("@/views/Login/Login.vue"),
    }
]

export default loginRoutes