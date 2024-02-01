import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from "@/layouts/basicLayouts.vue";

const moreHelpRoutes: RouteRecordRaw[] = [
    {
        path: '/morehelp',
        name: 'morehelp',
        component: BasicLayout,
        children: [
            {
                path:'/morehelp',
                name:'morehelp',
                component: () => import("@/views/moreHelp/index.vue")
            }
        ]
    }
]

export default moreHelpRoutes