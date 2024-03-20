<script lang="ts">
export default {
    name:'messageBar'
}//面试控制页面搜索结果用组件
</script>
<script setup lang="ts" name="messageBar">
import { inject, ref } from 'vue';
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const model = defineModel<any>({default:{message:{}}})
</script>
<template>
    <div class="blockContainer">
        <el-space  direction="vertical" alignment="left" class="space"> 
            <el-row>
                <el-col :span="2">
                    <div class="icon">
                        <el-icon><User /></el-icon>
                    </div>
                </el-col>
                <el-col :span="3">
                    {{ model.userName }}
                </el-col>
                <el-col :span="5">
                    {{ model.uid }}
                </el-col>
                <el-col :span="3">
                    {{ model.telephone }}
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2"></el-col>
                <span :style="{color:TWT}">{{ '  [' + model.createdTime + ']  '}}</span>
                <span>发送消息</span>
            </el-row>
            <el-row>
                <el-col :span="3"></el-col>
                <span>{{ model.content }}</span>
            </el-row>
            <el-row>
                <el-col :span="2"></el-col>
                <span :style="(model.isReceive == 0) ? 'color: #dc5c5c' : 'color: #93EA86;'">
                    {{ (model.isReceive == 0) ? '对方未确认' : ('对方已于'+ model.updatedTime + '确认') }}
                </span>
            </el-row>
        </el-space>
    </div>
</template>
<style scoped>
span{
    font-size:14px;
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
.icon{
    width: 48px;
    height: 48px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 50%;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#727272;
    font-size:26px;
}
:deep(.el-col){
    display: flex;
    line-height:48px;
    font-size:16px;
}
.space{
    gap:8px 0px !important;
    width:100%
}
</style>