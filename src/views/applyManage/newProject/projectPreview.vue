<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const route = useRoute()
const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const data = JSON.parse(route.params.data as string);
</script>
<template>
    <div class="container">
        <el-row class="warnDiv">
            <el-icon><Warning /></el-icon>
            <div>此为预览页面 仅供参考</div>
        </el-row>
        <div class="avatar" />
        <div class="title"> {{ data.title }}</div>
        <div class="blockContainer">
            <el-row class="blockTitle">
                <span></span>
                项目简介
            </el-row>
            <MdPreview :modelValue="data.brief.toString()"></MdPreview>
        </div>
        <div class="blockContainer">
            <el-row class="blockTitle">
                <span></span>
                个人资料
            </el-row>
            <el-row class="inforContainer">
                <el-col :span="1">姓名</el-col>
                <el-col :span="7">预览页面</el-col>
                <el-col :span="1">学院</el-col>
                <el-col :span="6">预览页面</el-col>
            </el-row>
            <el-row class="inforContainer">
                <el-col :span="1">专业</el-col>
                <el-col :span="7">预览页面</el-col>
                <el-col :span="1">年级</el-col>
                <el-col :span="6">预览页面</el-col>
            </el-row>
            <br />
            <el-row class="blockTitle">
                <span></span>
                联系方式
            </el-row>
            <el-row class="inforContainer">
                <el-col :span="1">校区</el-col>
                <el-col :span="7">预览页面</el-col>
                <el-col :span="1">电话</el-col>
                <el-col :span="6">预览页面</el-col>
            </el-row>
            <el-row class="inforContainer">
                <el-col :span="1">邮箱</el-col>
                <el-col :span="7">预览页面</el-col>
            </el-row>
            <br />
            <el-row class="blockTitle">
                <span></span>
                申请信息
            </el-row>
            <div class="inforContainer">
                <div class="questTitle">
                    1.组别（请按志愿顺序排序）
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    align-items: center;
    padding:26px 0;
    flex-direction: column;
    justify-content: center;
}
.warnDiv{
    width: 1200px;
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    justify-content: center;
    align-content: center;
    font-size: 16px;
}
.warnDiv .el-icon{
    margin-top: 5px;
}
.avatar{
    width: 100px;
    height: 100px;
    margin: 23px 0;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 50%;
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url("@/assets/logo.png");
}
.title{
    height: 30px;
    font-size: 24px;
    color: #444444;
    margin-bottom:23px;
}
.blockContainer{
    width:1200px;
    padding:25px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    margin-bottom:24px;
    font-size:14px;
}
.blockTitle{
    height: 20px;
    font-size: 18px;
    line-height: 20px;
    font-weight: 400;
    color: #444444;
    margin-bottom:20px;
}
.blockTitle span{
    width: 6px;
    margin-right:18px;
    background: v-bind(TWT);
}
.inforContainer{
    margin-left:30px;
    font-size:14px;
    margin-bottom:15px;
}
.questTitle{
    width: 215px;
    height: 17px;
    font-size: 16px;
    color: v-bind(TWT);
}
</style>