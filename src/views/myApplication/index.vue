<script setup lang="ts">
import { inject, ref, watch, onMounted } from 'vue';
import http from '@/utils/http'
import { ElMessage } from 'element-plus';

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT=ref('')
const lightTWT=ref('')
TWT.value = globalVars.TWT;
lightTWT.value =globalVars.lightTWT;
watch(() => globalVars.TWT, (newValue) => {
    TWT.value = newValue
})
watch(() => globalVars.lightTWT, (newValue) => {
    lightTWT.value =newValue
})

var baseurl = import.meta.env.VITE_API_URL

const messageData = ref<any>([])
const applicationData = ref<any>([])
const groupSelect = ref<any>([])
const isUser = ref<boolean>(false)
const isClub = ref<boolean>(false)
const userDetail = ref<any>({})
const clubDetail =ref<any>({})
const avatarList = ref<any>()
const myHeaders = {
    Authorization:localStorage.getItem('token') 
}


const fetchData = async () => {
    var accountType = Number(localStorage.getItem('accountType'))
    if(accountType > 1){            
        clubDetail.value = {
            clubName:localStorage.getItem('clubName'),
            clubScale:localStorage.getItem('scale'),
            avatar:localStorage.getItem('avatar')
        }
        isClub.value = true
    }
    else{
        userDetail.value = {
            name:localStorage.getItem('nickname'),
            major:localStorage.getItem('major'),
            grade:localStorage.getItem('grade'),
            uid:localStorage.getItem('uid'),
            department:localStorage.getItem('department'),
            stuType:localStorage.getItem('stuType'),
            campus:localStorage.getItem('campus'),
            telephone:localStorage.getItem('telephone')
        }
        isUser.value = true
    }
    await http.get("/v1/user/messages", {})
    .then((res:{code:number,result:any})=>{
        if(res.code == 200){
            messageData.value = res.result
        }
    });
    await http.get('/v1/user/applications',{})
    .then((res:{code:number,result:any})=>{
        if(res.code == 200){
            applicationData.value = res.result
            for(let i = 0; i< res.result.length; i++)
                groupSelect.value[i] = 0
        }
    });
}

onMounted(async () => {  
    try {  
        fetchData();} catch (error) {  
    console.error('Error fetching', error);  
    }  
}); 


const confirmMessage = (id:number) => {
    http.post("/v1/user/message/reply", {
        messageId:id,
        isReceive:1,
        reply:''
    })
    .then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('确认消息成功！')
            fetchData();
        }
    });
}

const handleSuccess = (response:any) => {
    ElMessage.success('更改头像成功！')
    clubDetail.value.avatar = response.result
    localStorage.setItem('avatar', response.result);
}
</script>

<template>
    <el-container class="mainContainer" v-if="isUser">
        <el-aside>
            <div>
                <div class="container">
                    <img src="@/assets/logo.png" class="avatar" />
                    <div class="nickName">{{userDetail.name}}</div>
                    <div class="orgTitle">
                        {{'20' + userDetail.uid?.slice(2,4) + '级'}}
                        {{ userDetail.stuType }}</div> 
                    <el-divider style="width:75%;margin:0 auto" />
                    <el-row class="infoContainer">
                        <div class="infoTitle">学院</div>
                        <div class="infoContent">{{userDetail.department}}</div>
                    </el-row>
                    <el-row class="infoContainer">
                        <div class="infoTitle">专业</div>
                        <div class="infoContent">{{userDetail.major}}</div>
                    </el-row>
                    <el-row class="infoContainer">
                        <div class="infoTitle">校区</div>
                        <div class="infoContent">{{userDetail.campus}}</div>
                    </el-row>
                    <el-row class="infoContainer">
                        <div class="infoTitle">电话</div>
                        <div class="infoContent">{{userDetail.telephone}}</div>
                    </el-row>
                </div>
            </div>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div class="blockContainer">
                <el-row class="blockTitle">
                    <span></span>
                    消息通知
                </el-row>
                <el-collapse accordion>
                    <el-collapse-item v-for="message in messageData" :key="message.messageId">
                        <template #title>
                            <el-row style="width:100%">
                                <el-col :span="3" class="messageTitleCol" style="justify-content: center;">
                                    <img :src="baseurl + message.clubAvatar" class="messageAvatar" />
                                </el-col>
                                <el-col :span="21">
                                    <el-row style="height:100%">
                                        <el-col :span="12" class="messageTitleCol messageTitle" style="text-align:left;font-weight:bold">
                                            {{message.clubName}}
                                        </el-col>
                                        <el-col :span="6" class="messageTitleCol" style="text-align:right;flex-direction: row-reverse">
                                            站内通知
                                        </el-col>
                                        <el-col :span="1" />
                                        <el-col :span="5" class="messageTitleCol" style="text-align:left">
                                            {{message.createdTime}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </template>
                        <div class="messageContentContainer">
                            {{ message.content }}
                            <el-row>
                                <el-col :span="17" />
                                <el-col :span="7">
                                    <el-button @click="confirmMessage(message.messageId)"
                                    type="primary" :disabled="message.isReceive != 0">
                                        {{(message.isReceive != 0) ? '已确认' : '待确认'}}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="blockContainer">
                <el-row class="blockTitle">
                    <span></span>
                    我的申请
                </el-row>
                <el-table :data="applicationData" stripe style="width: 100%" class="table">
                    <el-table-column prop="projectName" label="项目" />
                    <el-table-column prop="clubName" label="社团" />
                    <el-table-column label="报名组别">
                        <template #default="scope"> <!--逆天eslint怎么不去死啊？？-->
                            <el-select v-model="groupSelect[scope.$index]" class="messageSelect">
                                <el-option v-for="(group,index) in scope.row.groups" :key="group.id"
                                :label="group.groupName" :value="index" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope"> 
                            <!--groups[]里面   第n行(scope.$index）
                            所选中组别的面试状态groupsSelect-->
                            <div v-if="scope.row.groups[groupSelect[scope.$index]].status == 0"
                            style="color: #dc5c5c">未面试</div>
                            <div v-if="scope.row.groups[groupSelect[scope.$index]].status == 1"
                            class="color: #ffbf00">已面试</div>
                            <div v-if="scope.row.groups[groupSelect[scope.$index]].status == 2"
                            class="color: #93EA86;">一面过</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
    <div class="mainContainer" v-if="isClub">
        <div class="blockContainer" style="width:100%">
            <el-row>
                <el-row style="flex-direction:column;align-items: center;">
                    <img class="clubAvatar" :src="baseurl + clubDetail.avatar" />
                    <el-upload class="uploadAvatar"
                        v-model="avatarList"
                        :action="baseurl + '/v1/organ/avatar'"
                        :headers="myHeaders"
                        :name="'avatar'"
                        :on-success="handleSuccess"
                        >
                        <el-button type="primary">上传头像</el-button>
                    </el-upload>
                </el-row>
                <el-col :span="1" />
                <el-row style="flex-direction:column">
                    <div class="clubName">{{clubDetail.clubName}}</div>
                    <div class="clubScale">
                        {{(clubDetail.clubScale == 0) ? '院级学生社团' : '校级学生社团'}}
                    </div>
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
.mainContainer{
    padding: 25px 310px;
}
.container{
    position:fixed;
    display: flex;
    flex-direction: column;
    width: 288px;
    height: 760px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    font-weight: 400;
    color: #444444;
    text-align: center;
}
.avatar{
    width: 66px;
    height: 66px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 50%;
    margin:35px auto 0 auto;
}
.nickName{
    height: 14px;
    font-size: 16px;
    font-weight: 600;
    color: #444444;
    margin:30px 0 13px 0;
}
.orgTitle{
    height: 17px;
    font-size: 16px;
    margin-bottom:20px;
}
.sideMenu{
    margin-top:50px;
}
.menuItem{
    flex-direction: column;
    font-size:18px;
}.blockContainer{
    width:950px;
    padding:25px;
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
.infoContainer{
    width:100%;
    margin:40px 0 0 40px;
    font-size:14px;
}
.infoTitle{
    font-weight: bold;
    margin-right:10px;
}
.infoContent{
    white-space: nowrap;  
    overflow: hidden; 
    text-overflow: ellipsis;
}
.messageTitle{
    font-size:16px;
}
.messageContentContainer{
    margin-left:100px;
    margin-top:40px;
    font-size:16px;
}
.messageContentContainer button{
    width: 120px;
    height: 36px;
    border-radius: 5px;
}
.messageAvatar{
    width: 48px;
    height: 48px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 50%;
}
:deep(.el-collapse-item__header){
    height:60px;
}
.messageTitleCol{
    display: flex;
    align-items: center;
}
.messageSelect{
    width:150px;
}
:deep(.el-table .cell){
    text-align: center;
}
:deep(.el-table th.el-table__cell){
    color:white;
    background-color: v-bind(TWT) !important;
}
.table{
    border-radius: 10px;
}
.clubAvatar{
    height:300px;
    width:300px;
    border-radius: 50%;
}
.clubName{
    margin:50px 0 50px 0;
    font-size:30px;
    font-weight:bold;
}
.clubScale{
    font-size:26px;
}
.uploadAvatar{
    margin:30px 0 0 0;
}
.uploadAvatar button{
    height:40px;
    width:200px;
}
</style>