import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from "@/layouts/basicLayouts.vue";

const applyManageRoutes: RouteRecordRaw[] = [
    {
        path: '/applymanage',
        name: 'applymanage',
        component: BasicLayout,
        children: [
            {
                path:'/applymanage',
                name:'applymanage',
                component: () => import("@/views/applyManage/index.vue")
            }
        ]
    }
]

export default applyManageRoutes