<script lang="ts">
export default {
    name:'projectSideBar'
}
</script>
<script setup lang="ts" name="projectSideBar">
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import http from '@/utils/http'
import { ElMessage } from 'element-plus';

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT=ref('')
const lightTWT=ref('')
TWT.value = globalVars.TWT;
lightTWT.value =globalVars.lightTWT;
watch(() => globalVars.TWT, (newValue) => {
    TWT.value = newValue
})
watch(() => globalVars.lightTWT, (newValue) => {
    lightTWT.value =newValue
})


const route = useRoute();
var projectId = route.params.projectId

const title = ref('')
const selectColor = ref('')
const statusNum = ref(0)
const status = [
    {
        label:'正在招募-公开',
        id:0,
        color:'#93EA86'
    },
    {
        label:'正在招募-非公开',
        id:1,
        color:'#93EA86'
    },
    {
        label:'停止招募-公开',
        id:2,
        color:'#DC5C5C'
    },
        {
        label:'停止招募-非公开',
        id:3,
        color:'#DC5C5C'
    }
]
const statusSelect = ref<number>(0)
http.get("/v1/user/project", {projectId:projectId
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                title.value = res.result.title
                statusNum.value = res.result.status
                statusSelect.value = res.result.status
                selectColor.value = status[statusSelect.value].color
            }
        });


const changeStatus = () => {
    if(statusSelect != statusNum){
        http.post("/v1/child/project/status", {
            projectId:projectId,
            status:statusSelect.value
                }).then((res:{code:number,result:any})=>{
                    if(res.code == 200){
                        statusNum.value = statusSelect.value
                        selectColor.value = status[statusSelect.value].color
                        ElMessage.success('修改项目状态成功')
                    }
                    else{
                        statusSelect.value = statusNum.value
                        ElMessage.error('修改项目状态失败')
                    }
                }).catch(() => {
                    statusSelect.value = statusNum.value
                    selectColor.value = status[statusSelect.value].color
                })
    }
}
</script>

<template>
    <div class="container">
        <img src="@/assets/logo.png" class="avatar" />
        <div class="nickName">{{title}}</div>
        <el-select v-model="statusSelect" value-key="id" class="statusSelector" @change="changeStatus()">
            <el-option v-for="i in status" :key="i.id" :value="i.id" :label="i.label">
                <div class="statusTitle" :style="(i.id<2)?('color:#93EA86'):('color:#DC5C5C')">{{status[i.id].label}}</div> 
            </el-option>
        </el-select>
        <el-divider style="width:75%;margin:0 auto" />
        <el-menu mode="vertical" class="sideMenu" :router="true" :default-active="route.path"
        :active-text-color="TWT"    >
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId">
                项目设定
            </el-menu-item>
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId+'/appManage'">
                申请管理
            </el-menu-item>
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId+'/appInter'">
                申请录入
            </el-menu-item>
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId+'/interviewControl'">
                面试控制
            </el-menu-item>
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId+'/timeGroup'">
                时间分组
            </el-menu-item>
            <el-menu-item class="menuItem" :index="'/projectdetail/'+projectId+'/messagemanage'">
                消息管理
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped>
.container{
    position:fixed;
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 760px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    font-weight: 400;
    color: #444444;
    text-align: center;
    justify-items: center;
}
.avatar{
    width: 66px;
    height: 66px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 50%;
    margin:35px auto 0 auto;
}
.nickName{
    height: 14px;
    font-size: 20px;
    font-weight: 600;
    color: #444444;
    margin:30px 0 13px 0;
}
.statusTitle{
    height: 17px;
    font-size: 16px;
    margin-bottom:20px;
}
.sideMenu{
    margin-top:50px;
}
.menuItem{
    flex-direction: column;
    font-size:18px;
}
.el-menu{
    border-right: solid 0.05vw var(--el-menu-border-color);
}
:deep(.el-menu--horizontal>.el-menu-item.is-active){
    color:v-bind(TWT) !important;
}
:deep(.el-menu-item.is-active){
    background-color:v-bind(lightTWT) !important;
    color:v-bind(TWT) !important;
    border-right:2px solid v-bind(TWT) !important;
}
.statusSelector{
    width:188px;
    margin:15px 0 20px 80px;
}
:deep(.el-select__placeholder){
    color: v-bind( selectColor ) !important;
    font-size:16px;
}
:deep(.el-select__wrapper) {
    box-shadow:none;
}
</style>