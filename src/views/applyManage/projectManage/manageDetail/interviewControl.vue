<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
import searchBar from '@/components/manageDetail/searchBar.vue';
import http from '@/utils/http'
import { useRoute } from 'vue-router';
const route = useRoute();
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
var projectId = route.params.projectId
const searchText = ref<string>('') //搜索字符串
export type memberData = {
    name: string,
    uid: string,
    groups: any[],
    interviewState: number, //0未面试 1已面试 2一面过
}
const searchData = ref<memberData[]>([])
const fetchData = async (string:string) => {
    if(/^\d+$/.test(string))
        await http.get("/v1/staff/applications/brief", {
            uid:string,
            projectId:projectId
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                searchData.value = res.result
            }
        });
    else
        await http.get("/v1/staff/applications/brief", {
            name:string,
            projectId:projectId
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                searchData.value = res.result
            }
        });
}
onMounted(async () => {  
    try {  
        fetchData('');} catch (error) {  
    console.error('Error fetching', error);  
    }  
}); 
</script>

<template>
    <el-container>
        <el-aside>
            <projectSideBar></projectSideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div class="blockContainer">
                <el-row class="searchContainer">
                    <el-input class="input" v-model="searchText" placeholder="请输入你想要查询的姓名或学号" />
                    <el-button class="button" type="primary" @click="fetchData(searchText)">查询</el-button>
                </el-row>
                <el-space  direction="vertical" alignment="left" class="space">
                    <div v-for="index in searchData.length" :key="index">
                        <searchBar v-model="searchData[index-1]" ></searchBar>
                        <el-divider />
                    </div>
                </el-space>
            </div>
        </el-main>

    </el-container>
</template>

<style scoped>
.blockForm{
    margin-left:31px;
}
.blockContainer{
    width:850px;
    overflow: hidden;
    padding:31px 48px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    margin-bottom:24px;
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
.space{
    gap:3px 0px !important;
    width: 100%
}
.searchContainer{
    height:48px;
    flex-wrap: nowrap;
    font-size:16px;
    margin-bottom:24px;
}
.searchContainer .input{
    width:720px;
    border-radius: none;
}
:deep(.el-input__wrapper){
    border-radius: 5px 0 0 5px;
    font-size:16px;
}
.searchContainer .button{
    width:130px;
    height:48px;
    border-radius: 0 5px 5px 0;
    font-size:16px;
}
:deep(.el-divider){
    margin:12px 0;
}
</style>