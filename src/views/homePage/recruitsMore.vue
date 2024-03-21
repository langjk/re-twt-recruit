<script lang="ts">
export default {
    name:'recruitList'
}
</script>

<script setup lang="ts" name="recruitList">
import { inject, ref } from 'vue';
import { Recruit } from './home.types'
import { useRouter } from 'vue-router';

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string =globalVars.TWT;
const lightTWT:string =globalVars.lightTWT;

interface PropsMore {
    recruit: Recruit[],
    total:number,
    type:number
}
const props = defineProps<PropsMore>()
const scaleType = ref<number>(0)
scaleType.value = props.type
const emit = defineEmits(['changePage','getBack'])
const currentPage = ref(1)
const changePage = (page:number) => {
    currentPage.value = page
    emit('changePage', page, scaleType.value, statusType.value)
}
const statusType = ref()
const router = useRouter();
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
const goBack = () => {
    emit('getBack')
}
</script>
<template>
    <div class="optionContainer">
        <el-row class="recruitTitle">
            <span></span>
            招募列表
            <el-button class="goBack" @click="goBack()">回首页</el-button>
        </el-row>
        <el-form class="form">
            <el-form-item label="招募范围">
                <el-radio-group v-model="scaleType" class="radio-group" @change="changePage(currentPage)">
                    <el-radio :label="1" size="large">校级招募</el-radio>
                    <el-radio :label="0" size="large">院级招募</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="招募状态">
                <el-radio-group v-model="statusType" class="radio-group" @change="changePage(currentPage)">
                    <el-radio  size="large">全部</el-radio>
                    <el-radio :label="0" size="large">正在招募</el-radio>
                    <el-radio :label="2" size="large">停止招募</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
    <el-row class="recruitContainer">
        <div v-for="(items,index) in recruit" :key="index" class="recruit" @click="gotoUpload(index)" >
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
    <div class="paginationContainer">
        <el-pagination :current-page="currentPage" 
        @update:current-page="(page) => changePage(page)"
        layout="prev, pager, next" :total="props.total" />
    </div>
</template>
<style scoped>
.optionContainer{
    width:1296px;
    margin:26px 312px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    padding:36px 0 5px 24px;
}
.recruitTitle{
    height: 35px;
    font-size: 35px;
    font-weight: 600;
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
    margin-bottom:50px;
}
.recruit .img{
    height:180px;
    background-color: v-bind(lightTWT);
    overflow: hidden;
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
.paginationContainer{
    width:100%;
    display:flex;
    justify-content: center;
    align-content: center;
}
.form{
    margin:30px 30px;
}
:deep(.el-form-item){
    align-items: center;
}
.radio-group{
    margin-left:20px;
}
.goBack{
    margin-left:30px;
    margin-top:15px;
    font-size:14px;
    font-weight:400;
    color:v-bind(TWT);
    cursor: pointer;
}
</style>