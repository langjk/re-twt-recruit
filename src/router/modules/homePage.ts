import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from "@/layouts/basicLayouts.vue";

const homePageRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'homepage',
        component: BasicLayout,
        children: [
            {
                path:'/',
                name:'homepage',
                component: () => import("@/views/homePage/index.vue")
            }
        ]
    }
]

export default homePageRoutes