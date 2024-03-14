<script setup lang="ts">
import { inject,ref} from 'vue';
import sideBar from '@/components/applyManage/sideBar.vue'
import type { author } from './authorType';
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const tableData:author[]=[
    {
        name:'路人甲',
        number:3020000,
        role:0
    },
    {
        name:'路人乙',
        number:3020000,
        role:1
    },
    {
        name:'路人丙 ',
        number:3020000,
        role:2
    },
]
const roles = [
    {
        label:'面试官',
        value:0
    },
    {
        label:'子管理员',
        value:1
    },
    {
        label:'成员',
        value:2
    },
]
const roleSelect = ref(0);
</script>

<template>
    <el-container>
        <el-aside>
            <sideBar></sideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div class="blockContainer">
                <el-row class="manageContainer">
                    <el-input class="numberInput" placeholder="请输入添加成员的学号" />
                    <el-select class="roleSelect" v-model="roleSelect">
                        <el-option v-for="(option,index) in roles" :key="index"
                        :label="option.label" :value="option.value" />
                    </el-select>
                    <el-button class="defaultButton">添加</el-button>
                    <el-button class="defaultButton">表格导入</el-button>
                    <el-button class="defaultButton" type="primary">管理</el-button>
                </el-row>
                <el-table :data="tableData" stripe style="width: 100%" class="table">
                    <el-table-column prop="name" label="用户" width="180" />
                    <el-table-column prop="number" label="学号" width="180" />
                    <el-table-column prop="role" label="权限">
                        <template #default="scope">
                            {{ roles[scope.row.role].label }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>
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