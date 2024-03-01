<script lang="ts">
export default {
    name:'projectBar'
}
</script>
<script setup lang="ts" name="projectBar">
import type { Bar } from '@/views/applyManage/projectManage/projectBarType';
const props = defineProps<{
    data:Bar
}>()
</script>
<template>
    <el-row class="barContainer">
        <el-col :span="2">
            <img src="@/assets/logo.png" class="avatar" />
        </el-col>
        <el-col :span="12" class="text">
            <div class="title">{{props.data.title}}</div>
            <el-row>
                <div :class="props.data.status==1?'isRecruit':'stopRecruit'">
                    {{ props.data.status==1?'正在招募':'停止招募' }}
                </div>
                <div class="date">{{props.data.date}}</div>
            </el-row>
        </el-col>
        <el-col :span="4" class="text">
            <div class="member">{{props.data.member}}人参与</div>
        </el-col>
        <el-col :span="5" class="buttonContainer">
            <el-button class="button" type="primary">管理</el-button>
            <el-button class="button" type="danger">删除</el-button>
        </el-col>
    </el-row>
</template>
<style scoped>
.barContainer{
    width:930px;
}
.avatar{
    width: 50px;
    height: 50px;
    background: #FFFFFF;
    border-radius: 50%;
}
.title{
    width: 245px;
    height: 19px;
    font-weight: 400;
    font-size: 18px;
    line-height: 19px;
    color: #444444;
    white-space: nowrap;  
    overflow: hidden; 
    text-overflow: ellipsis;
}
.isRecruit{
    height: 14px;
    font-weight: 300;
    font-size: 14px;
    color: #93EA86;
}
.stopRecruit{
    height: 14px;
    font-weight: 300;
    font-size: 14px;
    color: #EAACAB;
}
.date{
    height: 13px;
    font-weight: 300;
    font-size: 14px;
    color: #A6A6A6;
    margin-left:36px;
}
.text{
    flex-direction:column;
    align-content: space-between;
    display: flex;
    justify-content: space-around;
}
.member{
    width: 80%;
    height: 20px;
    line-height:20px;
    font-weight: 300;
    font-size: 16px;
    color: #444444;
    text-align: right;
}
.buttonContainer{
    align-items: center;
    display: flex;
}
.button{
    width: 72px;
    height: 30px;
    box-shadow: 0px 1px 2px 0px rgba(92,92,92,0.12);
    border-radius: 5px;
}
</style>