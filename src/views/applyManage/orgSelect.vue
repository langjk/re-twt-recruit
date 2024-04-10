<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router'
import http from '@/utils/http'
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const router = useRouter();

const handleOrg = (club:clubDetail) => {
    localStorage.setItem('clubId',club.clubId.toString())
    localStorage.setItem('scale',club.scale.toString())
    localStorage.setItem('clubName', club.name);
    var uid = localStorage.getItem('uid')
    http.get("/v1/user/token", {uid:uid,clubId:club.clubId}).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                    localStorage.setItem('token', res.result);
                    router.push("/applymanage/newproject");
                }
        });
}
type clubDetail = {
    clubId: number,
    name: string,
    scale: number,
}
const clubs = ref<clubDetail[]>([])
const userType:any = localStorage.getItem('accountType')
const warningText = ref('为了您的身份信息安全，请不要进入您不熟悉的组织管理页面')
if(userType == 1){
    http.get("/v1/user/organs", {}).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                if(res.result.length > 0){
                    clubs.value = res.result
                }
                else if(res.result.length == 0)
                warningText.value = '您暂时没有加入的社团，请联系社团组织在招募管理-权限管理内添加您为成员'
            }
        });
}
else{
    router.push("/applymanage/newproject");
}
</script>


<template>
    <div class="main">
        <div class="title">请选择您要管理的组织</div>
        <el-row class="warning">
                <el-icon><Warning /></el-icon>
                <div>{{warningText}}</div>
        </el-row>
        <div class="orgContainer">
            <el-button v-for="club in clubs" :key="club.clubId" class="org" @click="handleOrg(club)">{{club.name}}</el-button>
        </div>
    </div>
</template>

<style scoped>
.main{
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:50px;
}
.warning{
    width: 720px;
    height: 72px;
    background: #eaacab24;
    color: #eaacab;
    font-size:14px;
    border-radius: 10px;
    align-items: center;
    display:flex;
    justify-content: center;

}
.warning div{
    margin-left:12px;
}
.title{
    font-size: 30px;
    margin:120px 0 36px 0;
    font-weight: 500;
}
.orgContainer{
    width: 720px;
    margin-top:36px;
    display: flex;
    justify-content: space-between;
    padding:0 60px;
    flex-wrap: wrap;
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
    font-weight: lighter;
    margin-bottom:40px;
    margin-left:0px;
}
</style>