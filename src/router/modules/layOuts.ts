import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from "@/layouts/basicLayouts.vue";

const layOutsRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layouts',
        component: BasicLayout,
        children: [
            {
                path:'/',
                name:'homepage',
                component: () => import("@/views/homePage/index.vue")
            },
            {
                path:'applymanage',
                name:'applymanage',
                component: () => import("@/views/applyManage/index.vue"),
                children:[
                    {
                        path:'newproject',
                        name:'newproject',
                        component:  () => import("@/views/applyManage/newProject/newProject.vue")
                    },
                    {
                        path:'authoritymanage',
                        name:'authoritymanage',
                        component:  () => import("@/views/applyManage/authorityManage.vue")
                    },
                    {
                        path:'messagemanage',
                        name:'messagemanage',
                        component:  () => import("@/views/applyManage/messageManage.vue")
                    },
                    {
                        path:'projectmanage',
                        name:'projectmanage',
                        component:  () => import("@/views/applyManage/projectManage.vue")
                    },
                    {
                        path:'orgselect',
                        name:'orgselect',
                        component:  () => import("@/views/applyManage/orgSelect.vue")
                    },
                ]
            },
            {
                path:'morehelp',
                name:'morehelp',
                component: () => import("@/views/moreHelp/index.vue")
            },
            {
                path: 'myapplication',
                name: 'myapplication',
                component: () => import("@/views/myApplication/index.vue"),
            }
        ]
    }
]

export default layOutsRoutes