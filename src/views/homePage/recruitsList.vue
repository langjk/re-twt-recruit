<script lang="ts">
export default {
    name:'recruitList'
}
</script>

<script setup lang="ts" name="recruitList">
import { inject } from 'vue';
import { Recruit } from './home.types'
import { useRouter } from 'vue-router';
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

const router = useRouter();
const props = defineProps<Props>()
const gotoUpload = (index:number) => {
    const url = router.resolve(
        { 
            name: 'upload', 
            params: { 
                projectId:props.recruit[index].projectId
            } 
        }
    ).href;
    window.open(url, '_blank');
}
const baseurl = import.meta.env.VITE_API_URL
</script>
<template>
    <el-row class="recruitTitle">
        <span></span>
        {{props.title}}
    </el-row>
    <el-row class="recruitContainer">
        <div v-for="(items,index) in recruit" :key="index" class="recruit"  @click="gotoUpload(index)">
            <div class="img">
                <img style="width:100%" :src="baseurl + items.cover" />
            </div>
            <div class="title">
                {{ items.title }}
            </div>  
            <div class="org">
                {{ items.clubName }}
            </div>
            <div class="people">
                {{ items.applicationNum }}人参加
            </div>
        </div>
    </el-row>
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
    overflow: hidden;
}
.recruit .title{
    height: 22px;
    margin:23px 0 0 23px;
    font-size: 22px;
    line-height:22px;
    font-weight: 600;
    color: #444444;
    overflow:hidden;
    white-space: nowarp;
    text-overflow: ellipsis;
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
</style>