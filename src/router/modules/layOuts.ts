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
                meta: { requiresAuth: true },
                children:[
                    {
                        path:'newproject',
                        name:'newproject',
                        component:  () => import("@/views/applyManage/newProject/newProject.vue") , 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'authoritymanage',
                        name:'authoritymanage',
                        component:  () => import("@/views/applyManage/authorityManage/authorityManage.vue"), 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'projectmanage',
                        name:'projectmanage',
                        component:  () => import("@/views/applyManage/projectManage/projectManage.vue"), 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'orgselect',
                        name:'orgselect',
                        component:  () => import("@/views/applyManage/orgSelect.vue"), 
                        meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
            },
            {
                path: 'projectdetail/:projectId',
                name: 'projectdetail',
                component: () => import("@/views/applyManage/projectDetail.vue"), 
                meta: { requiresAuth: true },
                children:[
                    {
                        path:'appInter',
                        name:'appInter',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/appInter.vue"),
                        props:true, 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'appManage',
                        name:'appManage',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/appManage.vue"),
                        props:true, 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'interviewControl',
                        name:'interviewControl',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/interviewControl.vue"),
                        props:true, 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'',
                        name:'projectSet',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/projectSet.vue"),
                        props:true, 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'timeGroup',
                        name:'timeGroup',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/timeGroup.vue"),
                        props:true, 
                        meta: { requiresAuth: true },
                    },
                    {
                        path:'messagemanage',
                        name:'messagemanage',
                        component:  () => import("@/views/applyManage/projectManage/manageDetail/messageManage.vue"), 
                        meta: { requiresAuth: true },
                    },
                ],
                props:true
            },
            {
                path:'projectPreview/:data',
                name:'projectPreview',
                component:  () => import("@/views/applyManage/newProject/projectPreview.vue"), 
                meta: { requiresAuth: true },
            },
        ]
    }
]

export default layOutsRoutes