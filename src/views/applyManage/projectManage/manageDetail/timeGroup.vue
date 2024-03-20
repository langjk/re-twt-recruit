<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
import http from '@/utils/http'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const timeData = ref<any[]>([])//各时间人数信息
const newCount = ref<number>(0)//新增人数
const update = ref<string>('')//上次更新时间
const startTime = ref<any>('')//开始面试时间
var projectId = route.params.projectId
for(let i = 0; i < 15; i++){
    let numberData = {
        time: (i + 7)+':00-' + (i + 8)+':00',//表头
        day1:0 + '人',
        day2:0 + '人',
        day3:0 + '人'
    }
    timeData.value.push(numberData)
}
const fetchData = async () => {
    await http.get("/v1/inter/time", {projectId:projectId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            newCount.value = res.result.newCount
            update.value = res.result.update
            for(let i = 0; i < 15; i++){
                timeData.value[i].day1 = res.result.times[i][0] + '人'
                timeData.value[i].day2 = res.result.times[i][1] + '人'
                timeData.value[i].day3 = res.result.times[i][2] + '人'
            }
            startTime.value = res.result.startTime
            ElMessage.success('数据刷新成功！')
        }
    });
}
const refreshData = async () => {
    await http.post("/v1/inter/time", {projectId:projectId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            newCount.value = res.result.newCount
            update.value = res.result.update
            for(let i = 0; i < 15; i++){
                timeData.value[i].day1 = res.result.times[i][0] + '人'
                timeData.value[i].day2 = res.result.times[i][1] + '人'
                timeData.value[i].day3 = res.result.times[i][2] + '人'
            }
            ElMessage.success('数据刷新成功！')
        }
    });
}
onMounted(async () => {  
    try {  
        fetchData();} catch (error) {  
    console.error('Error fetching', error);  
    }  
}); 
const exportExcel = async () => {
    const response = await http.getFile("/v1/inter/export/time", {projectId: projectId});  
        
    // 创建一个blob对象  
    const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });  
        
    // 创建一个下载链接  
    const url = window.URL.createObjectURL(blob);  
    const link = document.createElement('a');  
    link.href = url;  
    link.setAttribute('download', 'exported_data.xlsx'); // 设置下载的文件名  
        
    // 模拟点击下载链接  
    document.body.appendChild(link);  
    link.click();  
        
    // 清理  
    window.URL.revokeObjectURL(url);  
    document.body.removeChild(link);  
        
    ElMessage.success('生成Excel成功！');  
}
const disabledDate = (time: Date) => {
    return time.getTime() < Date.now()
}
const getInterviewTime = (type : number) => {
    var date = new Date(startTime.value);  
    var month:any = date.getMonth() + 1;  
    month = month < 10 ? '0' + month : month;
    var day:any = date.getDate() + type;  
    day = day < 10 ? '0' + day : day;
    var formattedDate = month + '月' + day + '日';  
    return(formattedDate)
}
const changeStartTime = () => {
    http.post("/v1/inter/day", {projectId:projectId,startTime:startTime.value
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('修改面试时间成功！')
        }
    });
}
</script>

<template>
    <el-container>
        <el-aside>
            <projectSideBar></projectSideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div class="blockContainer">
                <el-row class="blockTitle">
                    <span></span>
                    时间分组
                </el-row>
                <el-row class="manageContainer">
                    <el-col :span="4" class="text">今日新增人数<span style="color:#dc5c5c">{{ newCount }}</span>人</el-col>
                    <el-col :span="10" class="text">
                        面试开始时间 <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="请选择面试开始的时间"
                        :clearable="false"
                        :disabled-date="disabledDate"
                        format="YYYY/MM/DD"
                        value-format="x"
                        @change="changeStartTime"
                        />
                    </el-col>
                    <el-col :span="4">
                        <el-button class="defaultButton" @click="refreshData">更新分组</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="defaultButton" @click="exportExcel">导出表格</el-button>
                    </el-col>
                </el-row>
                <el-table :data="timeData" stripe style="width: 100%" class="table">
                    <el-table-column prop="time" label="时间段" />
                    <el-table-column prop="day1" :label="getInterviewTime(0)" />
                    <el-table-column prop="day2" :label="getInterviewTime(1)" />
                    <el-table-column prop="day3" :label="getInterviewTime(2)" />
                </el-table>
                <div class="updateTime">上次更新时间 <span :style="{color:TWT}"> {{ update }}</span></div>
            </div>
        </el-main>
    </el-container>
    <!-- <el-dialog v-model="changeDialogVisible" :title="'请选择' + clubMemberName + '的权限类型'">
        <div style="display:flex;justify-content:center">
            <el-select class="roleSelect" v-model="newRoleType">
                <el-option v-for="(option,index) in roles" :key="index"
                :label="option.valueOf()" :value="index" />
            </el-select>
        </div>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="changeDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="changeTypeConfirm()">
                添加
            </el-button>
        </div>
        </template>
    </el-dialog> -->
</template>

<style scoped>
.blockContainer{
    width:950px;
    overflow: hidden;
    padding:25px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    margin-bottom:24px;
}
.blockTitle{
    height: 20px;
    font-size: 20px;
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
.numberInput{
    width: 240px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 10px;
}
.manageContainer{
    margin-bottom:12px;
    display:flex;
    justify-content: space-around;
    align-items: center;
}
.manageContainer .text{
    font-size:16px;
    margin-left:14px;
}
.roleSelect{
    width: 192px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-left:24px;
}
.defaultButton{
    width: 100px;
    margin-left:24px;
}
.space{
    gap:3px 0px !important;
}
.updateTime{
    margin:12px 0 0 32px;
    font-size:16px;
}
</style>