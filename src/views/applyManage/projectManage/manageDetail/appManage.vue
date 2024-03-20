<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
import http from '@/utils/http'
import detailBar from '@/components/manageDetail/detailBar.vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();

type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const lightTWT:string = globalVars.lightTWT

var projectId = route.params.projectId


const groups = ref<any>([]) //组别
const timeQuest = ref<number[]>([]) //记录全部时间段是否被选为面试时间的数组
const tableData = ref<any>([]) //‘全部’页面的人员展示表格数据暂存
const timeSlotSelect = ref(0) //上午中午下午
const timeSelect = ref(0) //当前选择的时间段
const countData = ref<any>([]) // 各面试时间的人数
const categoryList = ref<any>([]) //各组别的分类数据
const categorySelect = ref<number>(0) //当前选择的分类
const daySelect = ref<number>(0)
const interviewCount = ref<number[]>([0,0,0]) //各面试进度人数
const interviewType = ref<any>(0) //当前选择的面试进度类型
const nowTableData = ref<any>([]) //当前页面人员展示表格数据，和tableData区分开
//各面试时间、面试进度人数单独储存(countData,interviewCount)，不要使用{{插值}}，防止http获取数据失败产生0值报错

const activeName = ref<any>(0) //选取展示详情的人员
const userSelect = ref<any>([]) //组别页面选中的人
const isAllSelect = ref<boolean>(false) //👆是否全选
const nowSelectGroup = ref<number>(0)


//各个弹窗显示flag--------------------------
const newCategoryFlag = ref<boolean>(false)
const moveFlag = ref<boolean>(false)
const copyFlag = ref<boolean>(false)
const sendFlag = ref<boolean>(false)
const exportFlag = ref<boolean>(false)
//-----------------------------------------

const categoryName = ref<string>('') //新增分类的名称
const targetCategory = ref<string>('') //复制、移动的目标分类

export type Detail = {
    createdTime: string,
    DepartmentAndMajor: string,
    contact: string,
    groups: any[],
    questions: [],
    comments: []
}
const showDetail = ref<Detail>({
    createdTime: '',
    DepartmentAndMajor: '',
    contact: '',
    groups: [],
    questions: [],
    comments: []
}) //展示的信息
const fetchTimeData = async () => {
await http.get("/v1/user/project", {projectId:projectId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            groups.value = res.result.groups
            timeQuest.value = JSON.parse(res.result.rules).time
        }
    });
await  http.get("/v1/staff/category/detail", {projectId:projectId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            tableData.value = res.result
            for(let i = 0;i<tableData.value.length;i++)
                countData.value[i] = tableData.value[i][daySelect.value].count
        }
    });
}
onMounted(async () => {  
    try {  
        fetchTimeData();} catch (error) {  
    console.error('Error fetching', error);  
    }  
}); 

//改变上午、下午、晚上时间段函数，改变后将tableData暂存的数据赋值给nowTableData用来展示
const changeSlot = (slot:number) => {
    timeSlotSelect.value = slot;
    let tempTime = timeQuest.value.slice(0 + slot * 5, 5 + slot * 5)
    activeName.value = 0
    for(let i = 0; i < tempTime.length; i++){
        if(tempTime[i] == 1){
//if == 1用来判断这个时间段是否在该问卷的面试时间内，如果在面试时间就将时间段移到这里
//用于刷新选择区域和防止选中到非面试时间
            timeSelect.value = i + slot * 5;
            nowTableData.value = tableData.value[timeSelect.value][daySelect.value].applications
            return
        }
    }
}

//改变日期函数
const changeDay = (day:number) => {
    daySelect.value = day;
    for(let i = 0;i<tableData.value.length;i++)
        countData.value[i] = tableData.value[i][daySelect.value].count
    changeSlot(0);
}

//改变选择时间函数 同时更新人员显示
const changeTime = (time:number) => {
    if(timeQuest.value[time] == 1){
        timeSelect.value = time
        nowTableData.value = tableData.value[timeSelect.value][daySelect.value].applications
        activeName.value = 0
        //当前显示的人员应当是：人员数据[选中的面试时间].applications
    }
}
//获取类别函数 同时更新人员显示
const getCategory = async (pane: any) => {
    nowSelectGroup.value = groups.value[pane.index-1].groupId
    console.log(groups.value[pane.index-1])
    if(pane.index == 0){
        fetchTimeData();
        changeSlot(0);
    }
    else{
        var groupId = groups.value[pane.index-1].groupId
        await http.get("/v1/staff/category/detail", {projectId:projectId,groupId:groupId
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                categoryList.value = res.result.categories
                interviewType.value = 0 //切换了页面 将选中面试阶段回到0
                for(let i = 0; i<3; i++){
                    interviewCount.value[i] = Number(categoryList.value[categorySelect.value].content[i].count)
                //三个值分别对应未面试 已面试和一面过,在：类别[当前选中的类别].content[三个值index].count获取
                }
                nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
                //当前显示的人员应当是：类别[选中的类别].content[选中的面试阶段].applications
            }
        });
    }
    activeName.value = 0
    showDetail.value = {
        createdTime: '',
        DepartmentAndMajor: '',
        contact: '',
        groups: [],
        questions: [],
        comments: []
    }
    for(let i = 0; i < nowTableData.value.length; i++){
        userSelect.value[i] = false
    }
    isAllSelect.value = false;
}

//改变面试进度函数 同时更新人员显示
const changeInter = (type:number) => {
    interviewType.value = type
    nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
    activeName.value = 0
    for(let i = 0; i < nowTableData.value.length; i++){
        userSelect.value[i] = false
    }
    isAllSelect.value =  false;
    //当前显示的人员应当是：类别[选中的类别].content[选中的面试阶段].applications
}

//获取人员详细问卷信息
const getShowDetail = async (name : any) => {
    if(name){
        await http.get("/v1/staff/applications", {applicationIds:name
            }).then((res:{code:number,result:any})=>{
                if(res.code == 200){
                    console.log(res.result[0])
                    showDetail.value.createdTime = res.result[0].createdTime.slice(0,10) +' ' +  res.result[0].createdTime.slice(11,19)
                    showDetail.value.DepartmentAndMajor = res.result[0].department + '-' + res.result[0].major
                    showDetail.value.contact = res.result[0].applicationCampus + '-' + res.result[0].applicationContact
                    showDetail.value.groups = res.result[0].groups
                    showDetail.value.comments = res.result[0].comments
                }
            });
    }
    else
        showDetail.value = {
            createdTime: '',
            DepartmentAndMajor: '',
            contact: '',
            groups: [],
            questions: [],
            comments: []
        }
}

//全选/取消全选
const allSelect = () => {
    console.log(isAllSelect.value)
    for(let i = 0; i < nowTableData.value.length; i++){
        userSelect.value[i] = isAllSelect.value
    }
}

//校验是否全选
const checkAllSelect = () => {
    var flag = true
    for(let i = 0; i < nowTableData.value.length; i++){
        if(userSelect.value[i] == false)
            flag = false
    }
    isAllSelect.value = flag
}

//获取选中的applicationId
const getId = () => {
    var IdString = ''
    for(let i = 0; i < nowTableData.value.length; i++){
        if(userSelect.value[i] == true)
            IdString = IdString + nowTableData.value[i].applicationId + ','
    }
    IdString = IdString.slice(0,IdString.length - 1)
    return IdString
}

//复制
const copyUser = () => {
    var applicationId = getId()
    http.post("/v1/inter/category/copy", {
        applicationId:applicationId,
        categoryId:targetCategory.value
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('复制成功！')
            copyFlag.value = false
            http.get("/v1/staff/category/detail", {projectId:projectId,groupId:nowSelectGroup.value
            }).then((res:{code:number,result:any})=>{
                if(res.code == 200){
                    categoryList.value = res.result.categories
                    interviewType.value = 0 //切换了页面 将选中面试阶段回到0
                    for(let i = 0; i<3; i++){
                        interviewCount.value[i] = Number(categoryList.value[categorySelect.value].content[i].count)
                    //三个值分别对应未面试 已面试和一面过,在：类别[当前选中的类别].content[三个值index].count获取
                    }
                    nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
                    //当前显示的人员应当是：类别[选中的类别].content[选中的面试阶段].applications
                }
            });
            activeName.value = 0
            for(let i = 0; i < nowTableData.value.length; i++){
                userSelect.value[i] = false
            }
            isAllSelect.value =  false;
        }
    });
}

//移动
const moveUser = () => {
    var applicationId = getId()
    http.post("/v1/inter/category/cut", {
        applicationId:applicationId,
        newCategoryId:targetCategory.value,
        oldCategoryId:categoryList.value[categorySelect.value].categoryId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('移动成功！')
            moveFlag.value = false
            http.get("/v1/staff/category/detail", {projectId:projectId,groupId:nowSelectGroup.value
            }).then((res:{code:number,result:any})=>{
                if(res.code == 200){
                    categoryList.value = res.result.categories
                    interviewType.value = 0 //切换了页面 将选中面试阶段回到0
                    for(let i = 0; i<3; i++){
                        interviewCount.value[i] = Number(categoryList.value[categorySelect.value].content[i].count)
                    //三个值分别对应未面试 已面试和一面过,在：类别[当前选中的类别].content[三个值index].count获取
                    }
                    nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
                    //当前显示的人员应当是：类别[选中的类别].content[选中的面试阶段].applications
                }
            });
            activeName.value = 0
            for(let i = 0; i < nowTableData.value.length; i++){
                userSelect.value[i] = false
            }
            isAllSelect.value =  false;
        }
    });
}

//发送短信
const sendMessage = () => {
    console.log(getId())
}

//导出信息
const exportData = async () => {
    var applicationIds = getId()
    const response = await http.getFile("/v1/inter/export", {applicationIds:applicationIds})
        
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

//增加分类
const addCategory = async () => {
    await http.post("/v1/inter/category/new", {groupId:nowSelectGroup.value,
        projectId:projectId,
        categoryName:categoryName.value
        }).then((res:{code:number,result:any})=>{
            if(res.code == 200){
                ElMessage.success('添加分类成功！')
                http.get("/v1/staff/category/detail", {projectId:projectId,groupId:nowSelectGroup.value
                }).then((res:{code:number,result:any})=>{
                    if(res.code == 200){
                        categoryList.value = res.result.categories
                        interviewType.value = 0 //切换了页面 将选中面试阶段回到0
                        for(let i = 0; i<3; i++){
                            interviewCount.value[i] = Number(categoryList.value[categorySelect.value].content[i].count)
                        //三个值分别对应未面试 已面试和一面过,在：类别[当前选中的类别].content[三个值index].count获取
                        }
                        nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
                        //当前显示的人员应当是：类别[选中的类别].content[选中的面试阶段].applications
                    }
                });
                newCategoryFlag.value = false
            }
        });
}

//改变分类 同时更新人员显示、、
const changeCategory = (index:number) => {
    categorySelect.value = index
    nowTableData.value = categoryList.value[categorySelect.value].content[interviewType.value].applications
    for(let i = 0; i < 3; i++)
        interviewCount.value[i] = Number(categoryList.value[categorySelect.value].content[i].count)
                //三个值分别对应未面试 已面试和一面过,在：类别[当前选中的类别].content[三个值index].count获取
    activeName.value = 0
    for(let i = 0; i < nowTableData.value.length; i++){
        userSelect.value[i] = false
    }
    isAllSelect.value =  false;
}
</script>

<template>
    <el-container>
        <el-aside>
            <projectSideBar></projectSideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <el-tabs class="Tabs" type="border-card"  @tab-click="getCategory">
                <el-tab-pane label="全部" @tab-click="fetchTimeData()">
                        <div class="tab-title">选择天数</div>
                        <div class="tab-buttonContainer">
                            <div :class="(daySelect == 0) ? 'active' : 'normal'" @click="changeDay(0)">第一天</div>
                            <div :class="(daySelect == 1) ? 'active' : 'normal'" @click="changeDay(1)">第二天</div>
                            <div :class="(daySelect == 2) ? 'active' : 'normal'" @click="changeDay(2)">第三天</div>
                        </div>
                        <div class="tab-title">选择时段</div>
                        <div class="tab-buttonContainer">
                            <div :class="(timeSlotSelect == 0) ? 'active' : 'normal'" @click="changeSlot(0)">上午</div>
                            <div :class="(timeSlotSelect == 1) ? 'active' : 'normal'" @click="changeSlot(1)">下午</div>
                            <div :class="(timeSlotSelect == 2) ? 'active' : 'normal'" @click="changeSlot(2)">晚上</div>
                        </div>
                        <div class="tab-title">选择具体时间段</div>
                        <div class="tab-buttonContainer">
                            <div v-for="(time,index) in timeQuest.slice(0 + timeSlotSelect * 5, 5 + timeSlotSelect * 5)" 
                            :key="index"
                            :class="(time == 1) ? 
                                ((timeSelect == index + timeSlotSelect * 5) ?'active' : 'normal') : 'unable' " 
                                @click="changeTime(index + timeSlotSelect * 5)">
                                {{ (index+7 + timeSlotSelect * 5)+':00-'}}
                                {{(index + 8 +timeSlotSelect * 5)+':00' }}
                                {{ '(' + countData[index + timeSlotSelect * 5] + ')' }}
                            </div>
                        </div>
                        <el-collapse class="collapse" accordion @change="getShowDetail" v-model="activeName">
                            <el-collapse-item v-for="(item,index) in nowTableData" :key="index" :name="item.applicationId">
                                <template #title>
                                    <el-row style="width:100%">
                                        <el-col style="font-weight: bold;text-align:left" :span="4">{{item.applicationName}}</el-col>
                                        <el-col :span="10">{{item.comment}}</el-col>
                                        <el-col :span="6">{{item.commentTime}}</el-col>
                                        <el-col style="text-align:right" :span="4">查看更多</el-col>
                                    </el-row>
                                </template>
                                <detailBar v-model="showDetail" ></detailBar>
                            </el-collapse-item>
                        </el-collapse>
                </el-tab-pane>
                <el-tab-pane v-for="group in groups" :key="group.groupId" :label="group.groupName" :table="'123123'" >
                        <div class="tab-title">选择分类</div>
                        <div class="tab-buttonContainer">
                            <div v-for="(category, index) in categoryList" :key="index" 
                            :class="(categorySelect == index) ? 'active' : 'normal'" @click="changeCategory(index)">{{category.categoryName}}</div>
                            <div class="normal" @click="newCategoryFlag = true"><el-icon><Plus /></el-icon></div>
                        </div>
                        <div class="tab-title">面试进度</div>
                        <div class="tab-buttonContainer">
                            <div :class="(interviewType == 0) ? 'active' : 'normal'" @click="changeInter(0)">
                                未面试{{ '(' + interviewCount[0] + ')' }}
                            </div>
                            <div :class="(interviewType == 1) ? 'active' : 'normal'" @click="changeInter(1)">
                                已面试{{ '(' + interviewCount[1] + ')' }}
                            </div>
                            <div :class="(interviewType == 2) ? 'active' : 'normal'" @click="changeInter(2)">
                                一面过{{ '(' + interviewCount[2] + ')' }}
                            </div>
                        </div>
                        <el-row class="buttonContainer">
                            <el-col :span="14" style="justify-items:left">
                                <el-checkbox @change="allSelect" v-model="isAllSelect">全选</el-checkbox>
                            </el-col>
                            <el-col :span="10">
                                <el-button class="button" @click="copyFlag = true">复制</el-button>
                                <el-button class="button" @click="moveFlag = true">移动</el-button>
                                <el-button class="button" @click="sendMessage">发送短信</el-button>
                                <el-button class="button" @click="exportData">导出信息</el-button>
                            </el-col>
                        </el-row>
                        <el-collapse class="collapse" accordion @change="getShowDetail" v-model="activeName">
                            <el-row style="align-items: flex-start;" v-for="(item,index) in nowTableData" :key="index">
                                <el-col :span="1">
                                    <el-checkbox class="checkbox" @change="checkAllSelect" v-model="userSelect[index]"></el-checkbox>
                                </el-col>
                                <el-col :span="23">
                                    <el-collapse-item :name="item.applicationId">
                                        <template #title>
                                            <el-row style="width:100%">
                                                <el-col style="font-weight: bold;text-align:left" :span="4">{{item.applicationName}}</el-col>
                                                <el-col :span="10">{{item.comment}}</el-col>
                                                <el-col :span="6">{{item.commentTime}}</el-col>
                                                <el-col style="text-align:right" :span="4">查看更多</el-col>
                                            </el-row>
                                        </template>
                                        <detailBar v-model="showDetail" ></detailBar>
                                    </el-collapse-item>
                                </el-col>
                            </el-row>
                        </el-collapse>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>


<!--新建分类弹窗-->
<el-dialog v-model="newCategoryFlag" >
    <template #header>
        <div class="dialogTitle">
            <div class="dialogSpan"/>新增分类 
        </div> 
    </template>
    <div style="display:flex;justify-content:center;align-items:center">
        <span style="font-weight:bold">新分类名称</span>
        <el-input class="categoryInput" v-model="categoryName" />
    </div>
    <template #footer>
    <div class="dialog-footer">
        <el-button @click="newCategoryFlag = false">取消</el-button>
        <el-button type="primary" @click="addCategory()">
            添加
        </el-button>
    </div>
    </template>
</el-dialog>

<!--复制弹窗-->
<el-dialog v-model="copyFlag">
    <template #header>
        <div class="dialogTitle">
            <div class="dialogSpan"/>复制组别  
        </div> 
    </template>
    <div style="display:flex;justify-content:center;align-items:center">
        <span style="font-weight:bold">分类名称</span>
        <el-select class="roleSelect" v-model="targetCategory">
            <el-option v-for="(category,index) in categoryList.slice(0,categoryList.length)" :key="index"
            :label="category.categoryName" :value="category.categoryId" />
        </el-select>
    </div>
    <template #footer>
    <div class="dialog-footer">
        <el-button @click="copyFlag = false">取消</el-button>
        <el-button type="primary" @click="copyUser()">
            添加
        </el-button>
    </div>
    </template>
</el-dialog>

<!--移动弹窗-->
<el-dialog v-model="moveFlag" >
    <template #header>
        <div class="dialogTitle">
            <div class="dialogSpan"/>移动组别 
        </div> 
    </template>
    <div style="display:flex;justify-content:center;align-items:center">
        <span style="font-weight:bold">分类名称</span>
        <el-select class="roleSelect" v-model="targetCategory">
            <el-option v-for="(category,index) in categoryList.slice(0,categoryList.length)" :key="index"
            :label="category.categoryName" :value="category.categoryId" />
        </el-select>
    </div>
    <template #footer>
    <div class="dialog-footer">
        <el-button @click="moveFlag = false">取消</el-button>
        <el-button type="primary" @click="moveUser()">
            添加 
        </el-button>
    </div>
    </template>
</el-dialog>

<!--发送信息弹窗-->
<el-dialog v-model="moveFlag" >
    <template #header>
        <div class="dialogTitle">发送消息
        </div> 
    </template>
    <div style="display:flex;justify-content:center;align-items:center">
        <span style="font-weight:bold">分类名称</span>
        <el-select class="roleSelect" v-model="targetCategory">
            <el-option v-for="(category,index) in categoryList.slice(0,categoryList.length)" :key="index"
            :label="category.categoryName" :value="category.categoryId" />
        </el-select>
    </div>
    <template #footer>
    <div class="dialog-footer">
        <el-button @click="moveFlag = false">取消</el-button>
        <el-button type="primary" @click="moveUser()">
            添加 
        </el-button>
    </div>
    </template>
</el-dialog>
</template>

<style scoped>
.blockForm{
    margin-left:31px;
}
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
}
:deep(.el-tabs__item){
    width:144px;
    height:48px;
}
:deep(.el-tabs__item.is-active){
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px 10px 0px 0px;
}
:deep(.el-tabs__nav-scroll){
    background-color:var(--background-color)
}
:deep(.el-tabs--border-card){
    border:none;
    border-radius:10px;
}
:deep(.el-tabs__content){
    padding: 36px 24px;
}
.tab-title{
    height: 18px;
    font-weight: bold;
    font-size: 18px;
}
.tab-buttonContainer{
    display:flex;
    margin-top:24px;
    margin-bottom:36px;
    justify-content: flex-start;
}
.tab-buttonContainer div{
    width: 150px;
    font-size:15px;
    height: 50px;    
    border-radius: 5px;
    line-height: 50px;
    text-align: center;
    margin-right:40px;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
}
.tab-buttonContainer .normal{
    background: #FFFFFF;
    cursor: pointer;
}
.tab-buttonContainer .active{
    background: v-bind(lightTWT);
    color:v-bind(TWT);
}
.tab-buttonContainer .unable{
    cursor:not-allowed;
    background: var(--background-color);
    color:#444444;
}
.collapse{
    width:900px;
    margin:0 10px;
}
.collapse .checkbox{
    margin-top:7px;
}
:deep(.el-collapse-item__header){
    font-size:18px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.buttonContainer{
    margin:0 0 15px 10px;
}
:deep(.el-checkbox__label){
    margin-left:15px;
}
.categoryInput{
    width:280px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-left:30px;
}
.roleSelect{
    width: 300px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 10px;
    margin-left:30px;
}
.Tabs{
    width:1000px;
}
.dialogTitle{
    font-size:20px;
    line-height: 100%;
    font-weight:bold;
    display:flex;
}
.dialogSpan{
    width: 6px !important;
    height: 25px;
    display: block;
    margin-right:18px;
    background-color:#00a1e9;
    margin-right:5px !important;
}
</style>