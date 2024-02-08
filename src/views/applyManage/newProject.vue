<script setup lang="ts">
import { getCurrentInstance,ref } from 'vue';
import sideBar from '@/components/applyManage/sideBar.vue'
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElMessage } from 'element-plus';


const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const title = ref('')
const filterMethod = ref("0")
const endTime = ref('')
const contact = ref('')
const brief= ref('')
const coverUrl = ref('')
const backUrl = ref('')
const titleColor = ref('#FFFFFF')
const backColor = ref('#00a1e9')
const pageMethod = ref('25%')
const circleMethod = ref('repeat')
const lockMethod = ref('fixed')
const beforeUpload = (file:any) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) {
            ElMessage.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
            ElMessage.error('上传图片大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
    }
const handleCoverUpload = (response: any) => 
{
    coverUrl.value = 'http://43.138.43.34:9925' + response.result
}
const handleBackUpload = (response: any) => 
{
    backUrl.value = 'http://43.138.43.34:9925' + response.result
}
</script>

<template>
        <el-container>
            <el-aside>
                <sideBar></sideBar>
            </el-aside>
            <el-main style="padding:0">
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        项目设定
                    </el-row>
                    <el-form label-position="left" class="blockForm">
                        <el-space  direction="vertical" alignment="left" class="space">
                            <el-form-item label="标题">
                                <el-input class="blockInput" v-model="title" placeholder="请输入招募标题"/>
                            </el-form-item>
                            <el-form-item label="组别">
                                <div class="groupForm">
                                    <el-row class="groupTitle">
                                        <el-col :span="3">组别文字</el-col>
                                        <el-col :span="13"></el-col>
                                        <el-col :span="2">增加</el-col>
                                        <el-col :span="2">删除</el-col>
                                        <el-col :span="2">上移</el-col>
                                        <el-col :span="2">下移</el-col>
                                    </el-row>
                                    <el-row class="groupOption" v-for="i in 3" :key="i">
                                        <el-col :span="16">
                                            <el-input :placeholder="'组别'+i" />
                                        </el-col>
                                        <el-col :span="8" class="buttonGroup">
                                            <el-button class="groupOptionButton" icon="Plus" />
                                            <el-button class="groupOptionButton" icon="Minus" />
                                            <el-button class="groupOptionButton" icon="Top" />
                                            <el-button class="groupOptionButton" icon="Bottom" />
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
                                        <el-popover
                                            placement="right"
                                            :width="200"
                                            trigger="hover"
                                        >
                                            <template #reference>
                                            <div class="questButton">?</div>
                                            </template>
                                            <div>
                                                <b>按第一志愿筛选：</b>申请表仅投递至第一志愿组别,由第一志愿组别决定是否通过<br>     
                                                <b>多组别分别筛选：</b>申请表分为多个副本同时投递至报名组
                                            </div>
                                        </el-popover>
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
                                <el-popover
                                    placement="right"
                                    :width="200"
                                    trigger="hover"
                                >
                                    <template #reference>
                                    <div class="questButton">?</div>
                                    </template>
                                    <div>
                                        请填写本项目的相关联系方式，此内容将提供给申 请者，以便在需要时与项目负责人取得联系
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-space>
                    </el-form>
                </div>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        项目简介
                    </el-row>
                    <div class="mdEditor">
                        
                    <MdEditor v-model="brief" class="editor">
                    </MdEditor>
                    <el-row class="warning">
                        <el-icon class="icon"><Warning /></el-icon>
                        <div>图片最大尺寸1280*1280px,支持Markdown语法</div>
                    </el-row>   
                    </div>
                </div>
                <div class="blockContainer">
                    <el-row class="blockTitle">
                        <span></span>
                        样式设定
                    </el-row>
                    <el-form label-position="left" class="blockForm">
                        <el-space  direction="vertical" alignment="left" class="space">
                            <el-form-item label="封面图">
                                <div class="imgUploadContainer">
                                    <el-upload 
                                    action="http://43.138.43.34:9925/v1/user/img"
                                    accept="image/jpeg,image/png"
                                    :before-upload="beforeUpload"
                                    :show-file-list="false"
                                    multiple
                                    :on-success="handleCoverUpload"
                                    class="imgUpload"
                                    >
                                        <el-image :src="coverUrl" fit="contain" style="height: 100%;width:100%">
                                            <template #error>
                                                <div class="uploadHint">
                                                    <el-icon><CirclePlus /></el-icon>
                                                </div>
                                            </template>
                                        </el-image> 
                                    </el-upload>
                                    <el-row class="warning">
                                        <el-icon class="icon"><Warning /></el-icon>
                                        <div>最大尺寸600*400px,推荐比例3:2</div>
                                    </el-row>
                                </div>
                            </el-form-item>
                            <el-form-item label="报名页设定">
                                <div class="styleDefaultMethod">
                                    <el-radio-group v-model="filterMethod">
                                        <el-radio label="0" size="default">默认样式</el-radio>
                                        <el-radio label="1" size="default">自定义格式</el-radio>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                            <el-form-item label="标题色">
                                <el-row class="colorPicker">
                                    <el-color-picker v-model="titleColor" :popper-class="'hex'" />
                                    <div>{{titleColor}}</div>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="背景色">
                                <el-row class="colorPicker">
                                    <el-color-picker v-model="backColor"  :popper-class="'hex'"  />
                                    <div>{{backColor}}</div>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="背景图">
                                <div class="imgUploadContainer">
                                    <el-upload 
                                    action="http://43.138.43.34:9925/v1/user/img"
                                    accept="image/jpeg,image/png"
                                    :before-upload="beforeUpload"
                                    :show-file-list="false"
                                    multiple
                                    :on-success="handleBackUpload"
                                    class="imgUpload"
                                    >
                                        <el-image :src="backUrl" fit="contain" style="height: 100%;width:100%">
                                            <template #error>
                                                <div class="uploadHint">
                                                    <el-icon><CirclePlus /></el-icon>
                                                </div>
                                            </template>
                                        </el-image> 
                                    </el-upload>
                                    <el-row class="warning">
                                        <el-icon class="icon"><Warning /></el-icon>
                                        <div>最大尺寸1920*1080px</div>
                                    </el-row>
                                </div>
                            </el-form-item>
                            <el-form-item label="背景图设定">
                                <div class="styleDefaultMethod">
                                    <el-radio-group v-model="pageMethod">
                                        <el-radio label="25%" size="default">保持原始尺寸</el-radio>
                                        <el-radio label="cover" size="default">填充</el-radio>
                                        <el-radio label="contain" size="default">适应</el-radio>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                            <el-form-item label="循环方式">
                                <div class="filterMethod">
                                    <el-radio-group v-model="circleMethod">
                                        <el-radio label="repeat" size="default">循环</el-radio>
                                        <el-radio label="repeat-x" size="default">横向循环</el-radio>
                                        <el-radio label="repeat-y" size="default">纵向循环</el-radio>
                                        <el-radio label="no-repeat" size="default">不循环</el-radio>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                            <el-form-item label="滑动锁定">
                                <div class="filterMethod">
                                    <el-radio-group v-model="lockMethod">
                                        <el-radio label="fixed" size="default">锁定</el-radio>
                                        <el-radio label="scroll" size="default">不锁定</el-radio>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                            <el-form-item label="背景预览">
                                <div class="previewDiv"  :style="(lockMethod == 'fixed')?('background-image:url(' + backUrl + ')'):''"><!--如果背景图片位于父div，则不会滚动 解决了background-attachment问题-->
                                    <div class="previewContainer" :style="(lockMethod != 'fixed')?('background-image:url(' + backUrl + ')'):'background-color:#ffffff00'">
                                        <div class="title">我好想做嘉然小姐的狗啊</div>
                                        <div class="content">
                                            可是嘉然小姐说她喜欢的是猫，我哭了。
                                            我知道既不是狗也不是猫的我为什么要哭的。因为我其实是一只老鼠。
                                            我从没奢望嘉然小姐能喜欢自己。我明白的，所有人都喜欢理解余裕上手天才打钱的萌萌的狗狗或者猫猫，没有人会喜欢阴湿带病的老鼠。
                                            但我还是问了嘉然小姐:“我能不能做你的狗？”
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-space>
                    </el-form>
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
.space{
    gap:10px 0px !important;
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
    width:23px;
    height:23px;
    margin: 0;
    margin-left:7px;
    padding: 0;
    font-size:13px;
    border: 0.05vw solid  #b2b2b2;
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
    line-height:16px;
    margin-top:10px;
}
.warning .icon{
    margin-top:2px;
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
    margin:0 38px; 
}
.questButton{
    width:15px;
    height:15px;
    line-height:15px;
    font-size: 13px;
    text-align: center;
    margin: 0;
    padding: 0;
    border: 0.05vw solid  v-bind(TWT);
    color:v-bind(TWT);
    border-radius: 20px;
}
.mdEditor{
    margin:15px 48px;
    width:792px;
}
.editor{
    height:300px;
    box-shadow:0;
    border: 0.05vw solid #D4D4D4;
    border-radius: 5px;
}
.imgUpload{
    width: 193px;
    height: 128px;
    background: #F6F6F6;
    display:flex;
    justify-content: space-evenly;
}
.uploadHint{
    width: 193px;
    height: 128px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:25px;
    color:v-bind(TWT);
}
.imgUploadContainer{
    width: 193px;
    height: 128px;
    margin-left:54px;
    display:flex;
    flex-direction: column;
}
.styleDefaultMethod{
    margin-left:22px;
    font-size:18px;
}
.colorPicker{
    margin-left:54px;
}
.colorPicker    div{
        margin-left:5px;
    }
.previewDiv{
    width:500px;
    height:300px;
    margin-left:38px;
    font-size:20px; 
    overflow-y: scroll;
    background-size: v-bind(pageMethod);
    background-repeat: v-bind(circleMethod);
    background-color:v-bind(backColor);

}
.previewContainer{
    background-size: v-bind(pageMethod);
    background-repeat: v-bind(circleMethod);
    background-color:v-bind(backColor);
    height:700px;
    width:500px;
    padding:20px 0;
}
.previewContainer .title{
    color:v-bind(titleColor);
    text-align: center;
    margin:40px auto;
    font-weight: 700;
    font-size:30px;
}
.previewContainer .content{
    text-indent: 2em;
    background-color: white;
    border-radius: 5px;
    width:260px;
    height:450px;
    padding:30px 20px;
    line-height:40px;
    margin: 0 auto;
}

</style>