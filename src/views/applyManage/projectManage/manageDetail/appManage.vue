<script setup lang="ts">
import { inject} from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
</script>

<template>
    <el-container>
        <el-aside>
            <projectSideBar :title="'测试项目'" :status="3"></projectSideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <el-space  direction="vertical" alignment="left" class="space">
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