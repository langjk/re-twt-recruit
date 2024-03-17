import type { RouteRecordRaw } from 'vue-router'

const loginRoutes: RouteRecordRaw[] = [
    {
        path: '/upload/:projectId',
        name: 'upload',
        component:  () => import("@/views/uploadApplication/uploadApplication.vue"),
    }
]

export default loginRoutes