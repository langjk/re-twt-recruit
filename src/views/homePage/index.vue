<script setup lang="ts">
import { inject } from 'vue';
import recruitList from './recruitsList.vue';
import { Recruit } from './home.types';
import http from '@/utils/http'


http.get("/v1/user/project", {projectId:20
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                console.log(res.result)
            }
        });

const recruit:Recruit[]=[
    {
        title:'测试用1',
        organization:'社团1',
        people:114
    },
    {
        title:'测试用2',
        organization:'社团2',
        people:514
    },
    {
        title:'测试用3',
        organization:'社团3',
        people:123
    },
    {
        title:'测试用4',
        organization:'社团4',
        people:1111
    },
    {
        title:'测试用5',
        organization:'社团5',
        people:133
    },
    {
        title:'测试用1',
        organization:'社团1',
        people:114
    },
]
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const lightTWT:string =globalVars.lightTWT;
lightTWT;TWT

</script>

<template>
    <div class="cover"></div>
    <recruitList :title="'院级招募'" :recruit="recruit"></recruitList>
    <recruitList :title="'校级招募'" :recruit="recruit"></recruitList>
    <div style="height:200px"></div>
</template>

<style scoped>
.cover{
    width:1296px;
    height: 438px;
    margin-left:312px;
    margin-top:48px;
    background-image: url(@/assets/homePageCover.jpg);
    background-position: center;
    background-size: 100%;
}
</style>