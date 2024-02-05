<script lang="ts">
export default {
    name:'appSideBar'
}
</script>
<script setup lang="ts" name="appSideBar">
import { getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const router = useRouter();
const route = useRoute();
</script>

<template>
    <div class="container">
        <img src="@/assets/logo.png" class="avatar" />
        <div class="nickName">天外天工作室</div>
        <div class="orgTitle">校级学生组织</div> 
        <el-divider style="width:75%;margin:0 auto" />
        <el-menu mode="vertical" class="sideMenu" :router="true" :default-active="route.path"
        :active-text-color="TWT"    >
            <el-menu-item class="menuItem" index="/applymanage/newproject">
                新建项目
            </el-menu-item>
            <el-menu-item class="menuItem" index="/applymanage/projectmanage">
                项目管理
            </el-menu-item>
            <el-menu-item class="menuItem" index="/applymanage/authoritymanage">
                权限管理
            </el-menu-item>
            <el-menu-item class="menuItem" index="/applymanage/messagemanage">
                消息管理
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped>
.container{
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
.orgTitle{
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
</style>