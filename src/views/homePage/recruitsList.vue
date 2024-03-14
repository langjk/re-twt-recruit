<script lang="ts">
export default {
    name:'recruitList'
}
</script>

<script setup lang="ts" name="recruitList">
import { inject } from 'vue';
import { Recruit } from './home.types'

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const lightTWT:string =globalVars.lightTWT;

interface Props {
    title: string
    recruit: Recruit[]
}

const props = defineProps<Props>()

</script>
<template>
    <el-row class="recruitTitle">
        <span></span>
        {{props.title}}
    </el-row>
    <el-row class="recruitContainer">
        <div v-for="(items,index) in recruit.slice(0,5)" :key="index" class="recruit">
            <div class="img">
                <img :src="items.img" />
            </div>
            <div class="title">
                {{ items.title }}
            </div>  
            <div class="org">
                {{ items.organization }}
            </div>
            <div class="people">
                {{ items.people }}人参加
            </div>
        </div>
    </el-row>
    <el-button class="button">查看更多</el-button>
</template>
<style scoped>
.recruitTitle{
    margin:64px 0 0 312px;
    height: 35px;
    font-size: 35px;
    font-weight: 400;
    color: #444444;
}
.recruitTitle span{
    width:10px;
    margin-right:21px;
    background: v-bind(TWT);
}
.recruitContainer{
    margin:36px 0 0 312px;
    width:1296px;
    justify-content: space-between;
    flex-wrap: wrap;    
    align-content: flex-end;
}
.recruit{
    width:240px;
    height:350px;
    background: white;
}
.recruit .img{
    height:180px;
    background-color: v-bind(lightTWT);
}
.recruit .title{
    width: 118px;
    height: 19px;
    margin:23px 0 0 23px;
    font-size: 22px;
    font-weight: 600;
    color: #444444;
}
.recruit .org{
    width: 96px;
    height: 16px;
    margin:13px 0 0 23px;
    font-size: 16px;
    color: #727272;
}
.recruit .people{
    margin:63px 0 0 23px;
    font-size: 14px;
    color: #727272;
}
.button{
    margin:48px 0 0 720px;
    width:480px;
    height:48px;
    background: v-bind(TWT);
    color:white;
    font-size:18px;
    font-weight: 400;
}
</style>