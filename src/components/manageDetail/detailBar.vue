<script lang="ts">
export default {
    name:'detailBar'
}//申请管理页面个人详细信息用组件
</script>
<script setup lang="ts" name="detailBar">
import { inject } from 'vue';
import { Detail } from '@/views/applyManage/projectManage/manageDetail/appManage.vue';
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
const model = defineModel<Detail>({default:{showDetail:{}}})
</script>
<template>
    <el-space  direction="vertical" alignment="left" class="space"> 
        <el-row class="detailContainer">
            <div class="detailTitle">报名时间</div>
            <div class="detailData">
                {{ model.createdTime }}
            </div>
        </el-row>
        <el-row class="detailContainer">
            <div class="detailTitle">学院专业</div>
            <div class="detailData">
                {{ model.DepartmentAndMajor }}
            </div>
        </el-row>
        <el-row class="detailContainer">
            <div class="detailTitle">联系方式</div>
            <div class="detailData">
                {{ model.contact }}
            </div>
        </el-row>
        <div class="detailContainer" v-for="(group,index) in model.groups" :key="index">
            <div class="detailTitle active">{{ group.groupName }}</div>
            <div class="detailData questions" v-for="(question,index) in group.questions" :key="index">
                <div>
                    {{ JSON.parse(question.questionContent).title }}
                </div>
                <div>
                    {{ question.answerContent }}
                </div>
            </div>
        </div>
        <div class="detailContainer">
            <div class="detailTitle active">评论</div>
            <div v-for="( comment, index ) in model.comments" :key="index" class="comment">
                <div class="time"> {{ comment[0] }}</div>
                <div class="user"> {{ comment[1] }}</div>
                <div class="content"> {{ comment[2] }}</div>
            </div>
        </div>
    </el-space>
</template>
<style scoped>
.buttonContainer{
    margin:70px 49px 24px 20px;
}
.button{
    width: 96px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 20px;
}
.detailContainer{
    font-size:16px;
}
.detailTitle{
    margin-right:12px;
}
.space{
    gap:3px 0px !important;
    margin:12px 0;
}
.active{
    color:v-bind(TWT)
}
.questions{
    margin-left:30px;
}
.comment{
    display:flex;
}
.comment .time{
    color: v-bind(TWT)
}
.comment .user{
    color: v-bind(TWT)
}
</style>