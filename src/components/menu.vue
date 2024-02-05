<script lang="ts">
export default {
    name:'Menu'
}
</script>

<script setup lang="ts" name="Menu">
import { getCurrentInstance } from 'vue';
import { getCookie,delCookie } from '@/utils/cookie';
import { userDetail } from '@/types/userDetail';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();
const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;

const UserDetail: userDetail = {name:'未登录',uid:0,nickname:'未登录'}
var userCookie = getCookie('nickname');
if(userCookie){
    UserDetail.name = userCookie;
}

const resetLogin = () => {
    delCookie('token');
    delCookie('nickname');
    router.push('/Login')
}

const checkLogin = () => {
    if(!userCookie){
        delCookie('token');
        delCookie('nickname');
        router.push('/Login');
    }
    else{
        router.push('/myApplication')
    }
}
</script>

<template>
    <el-menu
    class="menu"
    mode="horizontal"
    :default-active="'/' + route.path.split('/')[1]"
    :router="true"
    :active-text-color="TWT"
    >
        <el-row class="TWT">
            <img src="@/assets/logo.png" alt="twt">
            <span class="title blue">天外天</span>
            <span class="title black">招募中心</span>
        </el-row>
        <el-menu-item class="items" index="/">首页推荐</el-menu-item>
        <el-menu-item class="items" index="/myapplication">我的申请</el-menu-item>
        <el-menu-item class="items" index="/applymanage">招募管理</el-menu-item>
        <el-menu-item class="items" index="/morehelp">更多帮助</el-menu-item>
        <el-sub-menu class="rightBar" index="">
            <template #title>
                <el-icon><User /></el-icon>
                <el-row class="mine">
                    {{UserDetail.name}}</el-row>
            </template>
            <el-menu-item @click="checkLogin()">个人信息</el-menu-item>
            <el-menu-item index="/Login" @click="resetLogin()">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style scoped>
.menu{
    display: flex;
    height:82px;
}
.items{
    font-size:18px;
    width:120px;
    font-weight: 400;
}
.rightBar{
    margin-left:480px;
}
.mine{
    font-size:20px;
}
.TWT{
    margin:0 27px 0 312px;
    height:100%;
    align-items:center;
}
.TWT img{
    height:36px;
}
.title {
    cursor: default;
    font-size: 20px;
    line-height: 82px;
}
.black {
    color: #454545;
    font-family: 'Microsoft YaHei'
}
.blue {
    color: v-bind(TWT);
    font-family: 'Microsoft YaHei SB'
}
</style>