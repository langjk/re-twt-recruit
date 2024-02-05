<script setup lang="ts">
import { getCurrentInstance} from 'vue';
import { useRouter } from 'vue-router'
const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const router = useRouter();

const handleOrg = () => {
    router.push("/applymanage/newproject");
}
</script>


<template>
    <div class="main">
        <div class="title">请选择您要管理的组织</div>
        <el-row class="warning">
                <el-icon><Warning /></el-icon>
                <div>为了您的身份信息安全，请不要进入您不熟悉的组织管理页面</div>
        </el-row>
        <div class="orgContainer">
            <el-button class="org" @click="handleOrg()">天外天工作室</el-button>
            <el-button class="org" @click="handleOrg()">天外天新闻中心</el-button>
        </div>
    </div>
</template>

<style scoped>
.main{
    height: 500px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.warning{
    width: 720px;
    height: 72px;
    background: #eaacab24;
    color: #eaacab;
    font-size:14px;
    border-radius: 10px;
    align-content: center;
    display:flex;

}
.title{
    font-size: 30px;
    margin:120px 0 36px 0;
    font-family: 'Microsoft YaHei SB'
}
.orgContainer{
    width: 720px;
    margin-top:36px;
    display: flex;
    justify-content: space-between;
    padding:0 60px;
    box-sizing: border-box;
}
.org{
    background: v-bind(TWT);
    color:white;
    text-align: center;
    width: 264px;
    height: 50px;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 5px;
    font-size:20px;
    line-height: 50px;
    font-family: 'Microsoft YaHei L';
}
</style>