<script setup lang="ts">
import { inject, ref } from 'vue';
import recruitList from './recruitsList.vue';
import recruitMore from './recruitsMore.vue';
import { Recruit } from './home.types';
import http from '@/utils/http'

const schoolRecruit = ref<Recruit[]>([])
const departmentRecruit = ref<Recruit[]>([])
const showAll = ref<Recruit[]>([])
const showTotal = ref(0)
const showType = ref(2) //2:各五个，0/1：显示更多
http.get("/v1/user/project/all", {status:0,page:1,pageSize:5,scale:0
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                departmentRecruit.value = res.result.records
            }
        });
http.get("/v1/user/project/all", {status:0,page:1,pageSize:5,scale:1
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                schoolRecruit.value = res.result.records
            }
        });
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const lightTWT:string =globalVars.lightTWT;
lightTWT;TWT
const showMore = async(type:number,page:number) => {
    await http.get("/v1/user/project/all", {status:0,page:page,pageSize:10,scale:type
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                showAll.value = res.result.records
                showTotal.value = res.result.total
                showType.value = type
            }
        });
}
const handlePageChange = (page:number) => {
    showMore(showType.value,page)
}
</script>

<template>
    <div class="cover" v-if="showType == 2"></div>
    <div v-if="showType == 2">
        <recruitList :title="'院级招募'" :recruit="departmentRecruit" />
        <el-button class="button" @click="showMore(0,1)">查看更多</el-button>
        <recruitList :title="'校级招募'" :recruit="schoolRecruit" />
        <el-button class="button" @click="showMore(1,1)">查看更多</el-button>
    </div>
    <div v-if="showType < 2">
        <recruitMore :recruit="showAll" :total="showTotal" @changePage="handlePageChange"></recruitMore>
    </div>
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