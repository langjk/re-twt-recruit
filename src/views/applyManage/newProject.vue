<script setup lang="ts">
import { getCurrentInstance,ref } from 'vue';
import sideBar from '@/components/applyManage/sideBar.vue'
const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const title = ref('')
const filterMethod = ref("0")
const endTime = ref('')
const contact = ref('')
</script>

<template>
        <el-container>
            <el-aside>
                <sideBar></sideBar>
            </el-aside>
            <el-main>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        项目设定
                    </el-row>
                    <el-form label-position="left" class="blockForm">
                        <el-space  direction="vertical" alignment="left">
                            <el-form-item label="标题">
                                <el-input class="blockInput" v-model="title" placeholder="请输入招募标题"/>
                            </el-form-item>
                            <el-form-item label="组别">
                                <div class="groupForm">
                                    <el-row class="groupTitle">
                                        <el-col :span="3">组别文字</el-col>
                                        <el-col :span="13"></el-col>
                                        <el-col :span="4">增加/删除</el-col>
                                        <el-col :span="4">上移/下移</el-col>
                                    </el-row>
                                    <el-row class="groupOption" v-for="i in 3" :key="i">
                                        <el-col :span="16">
                                            <el-input :placeholder="'组别'+i" />
                                        </el-col>
                                        <el-col :span="4" class="buttonGroup">
                                            <el-button class="groupOptionButton">
                                                <el-icon><Plus /></el-icon>
                                            </el-button>
                                            <el-button class="groupOptionButton">
                                                <el-icon><Minus /></el-icon>
                                            </el-button>
                                        </el-col>
                                        <el-col :span="4" class="buttonGroup">
                                            <el-button class="groupOptionButton">
                                                <el-icon><Top /></el-icon>
                                            </el-button>
                                            <el-button class="groupOptionButton">
                                                <el-icon><Bottom /></el-icon>
                                            </el-button>
                                        </el-col>
                                    </el-row>    
                                    <el-row class="warning">
                                        <el-icon class="icon"><Warning /></el-icon>
                                        <div>如您未设置组别，将会生成一个默认组别 如项目只有一个组别，在表单中将不显示组别选项，直接选中组别</div>
                                    </el-row>
                                </div>
                            
                            </el-form-item>
                            <el-form-item label="筛选方式">
                                <div class="filterMethod">
                                    <el-radio-group v-model="filterMethod">
                                        <el-radio label="0" size="default">按照第一志愿筛选</el-radio>
                                        <el-radio label="1" size="default">按照多组别筛选</el-radio>
                                    </el-radio-group>
                                    <el-row class="warning">
                                        <el-icon class="icon"><Warning /></el-icon>
                                        <div>组别和筛选方式在项目公开后不可更改</div>
                                    </el-row>
                                </div>
                            </el-form-item>
                            <el-form-item label="招募截止时间">
                                <div class="datePicker">
                                    <el-date-picker
                                        v-model="endTime"
                                        type="date"
                                        placeholder="请选择截止日期"
                                    />
                                    <el-row class="warning">
                                        <el-icon class="icon"><Warning /></el-icon>
                                        <div>招募时间将截止到您选择日期当日24:00</div>
                                    </el-row>
                                </div>
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <el-input class="contactInput" v-model="contact" placeholder="请输入联系方式"/>
                            </el-form-item>
                        </el-space>
                    </el-form>
                </div>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        项目简介
                    </el-row>
                </div>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        样式设定
                    </el-row>
                </div>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        申请表单
                    </el-row>
                </div>
            </el-main>
        </el-container>
</template>

<style scoped>
.blockContainer{
    width: 888px;
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
.blockInput{
    width:330px;
    margin-left:70px;   
}
.blockForm{
    margin-left:47px;
}
.groupTitle{
    width: 500px;
    background: #F6F6F6;
    border-radius: 2px; 
    color: #727272;
    padding-left:23px;
    text-align: center;
}
.groupForm{
    padding-left:70px;
}
.groupOption{
    margin-top:20px;
}
.buttonGroup{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width:100%;
}
.groupOptionButton{
    width:20px;
    height:20px;
    margin: 0;
    padding: 0;
    font-size:13px;
    border: 2px solid  #959595;
}
.filterMethod{
    margin-left:38px;
    font-size:18px;
}
.warning{
    display:flex;
    color:#EAABAA;  
    width:330px;
    flex-wrap: nowrap;
    font-size:14px;
}
.warning .icon{
    margin-top:10px;
}
.warning div{
    font-size:12px;
    margin-left:10px;
}
.datePicker{
    margin-left:6px;
}
.contactInput{
    width:330px;
    margin-left:38px; 
}
</style>