<script lang="ts">
export default {
    name:'appSideBar'
}
</script>
<script setup lang="ts" name="appSideBar">
import { inject, computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore(); 
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
var clubName = localStorage.getItem('clubName')
var userScale = localStorage.getItem('scale')
store.commit('SET_CLUB_NAME', clubName);   
store.commit('SET_USER_SCALE', userScale);   
const userInfo = computed(() => store.state.clubName);  
const Scale = computed(() => store.state.scale);  
</script>

<template>
    <div class="container">
        <img src="@/assets/logo.png" class="avatar" />
        <div class="nickName">{{userInfo}}</div>
        <div class="orgTitle">{{(Scale == 0) ? '院级学生组织' : '校级学生组织'}}</div> 
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
                人员管理
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
</style>