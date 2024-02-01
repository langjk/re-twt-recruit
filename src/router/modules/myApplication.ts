import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from "@/layouts/basicLayouts.vue";

const myApplicationRoutes: RouteRecordRaw[] = [
    {
        path: '/myapplication',
        name: 'myapplication',
        component: BasicLayout,
        children: [
            {
                path: '/myapplication',
                name: 'myapplication',
                component: () => import("@/views/myApplication/index.vue"),
            }
        ]
    }
]

export default myApplicationRoutes