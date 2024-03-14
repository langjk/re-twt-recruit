<script setup lang="ts">
import { inject} from 'vue';
import sideBar from '@/components/applyManage/sideBar.vue'
import projectBar from '@/components/applyManage/projectManage/projectBar.vue'
import type { Bar } from './projectBarType'
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const projectData:Bar[] = [
    {
        title:'测1111111111111111111111111111试',
        status:1,
        member:20,
        date:'2020-1-20'
    },
    {
        title:'测21121试',
        status:2,
        member:23,
        date:'2021-1-20'
    },
    {
        title:'测31111试',
        status:2,
        member:4,
        date:'2024-1-20'
    },
]
</script>

<template>
    <el-container>
        <el-aside>
            <sideBar></sideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <el-space  direction="vertical" alignment="left" class="space">
            <div class="blockContainer">
                <el-row class="blockTitle">
                    <span></span>
                    项目管理
                </el-row>
                <el-form label-position="left" class="blockForm">
                    <el-space  direction="vertical" class="space">
                        <div v-for="(data,index) in projectData" :key="index">
                            <projectBar :data="data"></projectBar>
                            <el-divider />
                        </div>
                    </el-space>
                </el-form>
            </div>
            </el-space>
        </el-main>

    </el-container>
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
</style>