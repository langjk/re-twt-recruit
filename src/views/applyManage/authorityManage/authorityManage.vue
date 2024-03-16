<script setup lang="ts">
import { inject, ref, onMounted} from 'vue';
import sideBar from '@/components/applyManage/sideBar.vue'
import type { author } from './authorType';
import http from '@/utils/http'
import { ElMessage } from 'element-plus';
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const changeDialogVisible = ref(false)
const tableData = ref<author[]>([])
const refreshList = () => {
    http.get("/v1/organ/members", {}).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            tableData.value = res.result
        }
    });
}
onMounted(async () => {  
    try {  
        refreshList();} catch (error) {  
    console.error('Error fetching member:', error);  
    }  
}); 
const roleSelect = ref('ROLE_STAFF');
const uid = ref('')
const roles = {
    ROLE_STAFF:'成员',
    ROLE_CHILD:'子管理员',
    ROLE_INTER:'面试官',
}
const addMember = async () => {
    await http.post("/v1/organ/member", {
        uid:uid.value,
        clubId:localStorage.getItem('clubId'),
        role:roleSelect.value
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('添加成员成功')
        }
    });
    refreshList();
}
const clubMemberId = ref('')
const clubMemberName = ref('')
const handleEdit = (row:any) => {
    changeDialogVisible.value = true
    clubMemberId.value = row.clubMemberId
    clubMemberName.value = row.name
}
const newRoleType = ref('ROLE_STAFF')
const changeTypeConfirm = async () => {
    await http.post("/v1/organ/member/role", {
        clubMemberId:clubMemberId.value,
        role:newRoleType.value
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('修改权限成功！')
        }
    });
    refreshList();
    changeDialogVisible.value = false
}
const handleDelete = async (row: any) => {
    await http.post("/v1/organ/member/out", {
        clubMemberId:row.clubMemberId,
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            ElMessage.success('修改权限成功！')
        }
    });
    refreshList();
}
</script>

<template>
    <el-container>
        <el-aside>
            <sideBar></sideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div class="blockContainer">
                <el-row class="manageContainer">
                    <el-input v-model="uid" class="numberInput" placeholder="请输入添加成员的学号" />
                    <el-select class="roleSelect" v-model="roleSelect">
                        <el-option v-for="(option,index) in roles" :key="index"
                        :label="option.valueOf()" :value="index" />
                    </el-select>
                    <el-button class="defaultButton" @click="addMember()" type="primary">添加</el-button>
                    <el-button class="defaultButton">表格导入</el-button>
                </el-row>
                <el-table :data="tableData" stripe style="width: 100%" class="table">
                    <el-table-column prop="name" label="用户" width="180" />
                    <el-table-column prop="uid" label="学号" width="180" />
                    <el-table-column prop="role" label="权限">
                        <template #default="scope">
                            {{ roles[scope.row.role as keyof typeof roles] }} <!--逆天eslint怎么不去死啊？？-->
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.row)">
                                更改</el-button>
                            <el-popconfirm title="确定删除该成员吗"  @confirm="handleDelete(scope.row)">
                                <template #reference>
                                    <el-button size="small" type="danger">
                                        删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
    <el-dialog v-model="changeDialogVisible" :title="'请选择' + clubMemberName + '的权限类型'">
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
    </el-dialog>
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
    margin-bottom:36px;
    display:flex;
    justify-content: space-around;
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


</style>