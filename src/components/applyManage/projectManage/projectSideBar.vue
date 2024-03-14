<script lang="ts">
export default {
    name:'projectSideBar'
}
</script>
<script setup lang="ts" name="projectSideBar">
import { inject } from 'vue';
import { useRoute } from 'vue-router'

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const route = useRoute();

const props = defineProps({
    title: { type: String, required: true },
    status:{ type: Number, required: true }
})
const status = ['正在招募-公开','正在招募-非公开','停止招募-公开','停止招募-非公开']
</script>

<template>
    <div class="container">
        <img src="@/assets/logo.png" class="avatar" />
        <div class="nickName">{{props.title}}</div>
        <div class="statusTitle" :style="(props.status<2)?('color:#93EA86'):('color:#DC5C5C')">{{status[props.status]}}</div> 
        <el-divider style="width:75%;margin:0 auto" />
        <el-menu mode="vertical" class="sideMenu" :router="true" :default-active="route.path"
        :active-text-color="TWT"    >
            <el-menu-item class="menuItem" index="/projectdetail/projectSet">
                项目设定
            </el-menu-item>
            <el-menu-item class="menuItem" index="/projectdetail/appManage">
                申请管理
            </el-menu-item>
            <el-menu-item class="menuItem" index="/projectdetail/appInter">
                申请录入
            </el-menu-item>
            <el-menu-item class="menuItem" index="/projectdetail/interviewControl">
                面试控制
            </el-menu-item>
            <el-menu-item class="menuItem" index="/projectdetail/timeGroup">
                时间分组
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