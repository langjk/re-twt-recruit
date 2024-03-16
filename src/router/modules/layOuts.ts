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
                        component:  () => import("@/views/applyManage/authorityManage/authorityManage.vue")
                    },
                    {
                        path:'messagemanage',
                        name:'messagemanage',
                        component:  () => import("@/views/applyManage/messageManage.vue")
                    },
                    {
                        path:'projectmanage',
                        name:'projectmanage',
                        component:  () => import("@/views/applyManage/projectManage/projectManage.vue")
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
            },
            {
                path: 'projectdetail/:projectId',
                name: 'projectdetail',
                component: () => import("@/views/applyManage/projectDetail.vue"),
                children:[
                    {
                        path:'appInter',
                        name:'appInter',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/appInter.vue"),
                        props:true
                    },
                    {
                        path:'appManage',
                        name:'appManage',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/appManage.vue"),
                        props:true
                    },
                    {
                        path:'interviewControl',
                        name:'interviewControl',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/interviewControl.vue"),
                        props:true
                    },
                    {
                        path:'',
                        name:'projectSet',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/projectSet.vue"),
                        props:true
                    },
                    {
                        path:'timeGroup',
                        name:'timeGroup',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/timeGroup.vue"),
                        props:true
                    },
                ],
                props:true
            },
            {
                path:'projectPreview/:data',
                name:'projectPreview',
                component:  () => import("@/views/applyManage/newProject/projectPreview.vue")
            },
        ]
    }
]

export default layOutsRoutes