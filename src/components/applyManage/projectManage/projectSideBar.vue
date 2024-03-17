<script lang="ts">
export default {
    name:'projectSideBar'
}
</script>
<script setup lang="ts" name="projectSideBar">
import { inject, ref } from 'vue';
import { useRoute } from 'vue-router'
import http from '@/utils/http'

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const route = useRoute();
var projectId = route.params.projectId
console.log(projectId[2])

const title = ref('')
const statusNum = ref(0)
const status = ['正在招募-公开','正在招募-非公开','停止招募-公开','停止招募-非公开']
http.get("/v1/user/project", {projectId:projectId
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                title.value = res.result.title
                statusNum.value = res.result.status
            }
        });
</script>

<template>
    <div class="container">
        <img src="@/assets/logo.png" class="avatar" />
        <div class="nickName">{{title}}</div>
        <div class="statusTitle" :style="(statusNum<2)?('color:#93EA86'):('color:#DC5C5C')">{{status[statusNum]}}</div> 
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
    font-size: 14px;
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
</style>