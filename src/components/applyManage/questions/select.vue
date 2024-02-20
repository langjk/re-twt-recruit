<script lang="ts">
export default {
    name:'selectQuest'
}
</script>
<script setup lang="ts" name="selectQuest">
import { getCurrentInstance,ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { ElMessage } from 'element-plus';
import { selectQ } from '@/views/applyManage/newProject/newProjectType'
const TWT:string = getCurrentInstance()?.appContext.config.globalProperties.$TWT;
const props = defineProps({
    serial: { type: Number, required: true },
    groups:{ type : Array as () => Array<{ [key: string]: string | number }>,required:true }
})
const model = defineModel<selectQ>(
    {
        default:{
            type:'s',
            title:'',
            required:false,
            groups:[],
            optionDetail:{
                options:[{label:'选项1',id:0},{label:'选项2',id:1}],
                maxSelect:1,
                minSelect:2,
                optionsIdCount:2,
            }
        }
    })
const groupsRef = ref(props.groups);
const addGroup = () => {
    let newOption = {label:'',id:model.value.optionDetail.optionsIdCount}
    model.value.optionDetail.options.push(newOption)
    model.value.optionDetail.optionsIdCount++;
}
const deleteGroup = (index:number) => {
    if(model.value.optionDetail.options.length == 1){
        ElMessage.warning('必须保留一个选项！')
        return
    }
    else{
        model.value.optionDetail.options.splice(index-1,1)
        if(model.value.optionDetail.maxSelect > model.value.optionDetail.options.length)
        {
            model.value.optionDetail.maxSelect = model.value.optionDetail.options.length
            if(model.value.optionDetail.maxSelect < model.value.optionDetail.minSelect)
                model.value.optionDetail.minSelect = model.value.optionDetail.maxSelect}
    }
} 
const clearSelect = () => {
    model.value.groups = []
}
defineExpose({  
    clearSelect,  
}); 
const emit = defineEmits(['deleteQ'])
const deleteQuestion = () => {
    emit('deleteQ', props.serial-2)
}
</script>
<template>
    <el-form-item>
        <el-row style="flex-wrap:nowrap;margin-bottom:0.7vw;">
            <div class="groupTitle">{{props.serial}}.</div>
            <el-select v-model="model.groups" 
            collapse-tags multiple
            collapse-tags-tooltip
            :max-collapse-tags="2" 
            class="groupSelector">
                <el-option v-for="item in groupsRef" :key="item.id" :label="item.label" :value="item.id"/>
            </el-select>
            <el-button class="questionSort"  
            type="primary" plain 
            icon="Sort"/>
        </el-row>
        <el-row style="display:flex;align-items: flex-start;">
            <div class="questionTitle">单选多选题</div>
            <el-row>
                <el-input placeholder="请输入问题描述" class="textInput" v-model="model.title"></el-input>
                <el-checkbox v-model="model.required" label="必填" />
                <div class="deleteButton">
                    <el-button circle plain type="danger" @click="deleteQuestion">
                        <el-icon><Delete /></el-icon>
                    </el-button>
                </div>
            </el-row>
        </el-row>
        
        <div class="groupForm">
            <VueDraggableNext :list="model.optionDetail.options" group="name" 
                animation="500" handle=".Sort">
                <transition-group>
                    <el-row class="selectOption" v-for="i in model.optionDetail.options.length" :key="i">
                        <el-col :span="19">
                            <el-input :placeholder="'选项'+i" v-model="model.optionDetail.options[i-1].label"/>
                        </el-col>
                        <el-col :span="5" class="buttonGroup">
                            <el-button 
                            type="danger" plain 
                            icon="Delete" @click="deleteGroup(i)"/>
                            <el-button class="Sort"  
                            type="primary" plain 
                            icon="Sort"/>
                        </el-col>
                    </el-row> 
                </transition-group>
            </VueDraggableNext>   
            <el-button class="addButton" @click="addGroup()">
                新增选项
            </el-button>
            <el-row class="numberInputContainer">
                <el-col :span="12">
                    至少选<el-input-number class="numberInput" 
                    :min="1" :max="model.optionDetail.maxSelect" 
                    v-model="model.optionDetail.minSelect" 
                    size="small"/>项
                </el-col>
                <el-col :span="12">
                    至多选<el-input-number class="numberInput" 
                    :min="model.optionDetail.minSelect" :max="model.optionDetail.options.length" 
                    v-model="model.optionDetail.maxSelect" 
                    size="small"/>项
                </el-col>
            </el-row>
        </div>
    </el-form-item>
</template>
<style scoped>
    .groupSelector{
    min-width: 100px;
    height: 30px;
    border-radius: 5px;
}
.groupTitle{
    font-size:18px;
    color:v-bind(TWT);
    margin-right:10px;
}
.questionTitle{
    font-size:18px;
    color:v-bind(TWT);
    margin-right:30px;
    margin-left:30px;
}
.textInput{
    width: 500px;
    border-radius: 5px;
    margin-bottom:20px;
    margin-right:20px;
}
.deleteButton{
    margin-left:30px;
    height:30px;
    width:30px;
}
.selectOption{
    margin:0 0 10px 150px;
    width:510px;
}
.buttonGroup{
    display: flex;
    justify-content: space-evenly;
    flex-direction: row-reverse;
    align-items:center;
    width:100%;
}
.buttonGroup button{
    width:23px;
    height:23px;
    margin: 0;
    margin-left:7px;
    padding: 0;
    font-size:13px;
    border: 0.05vw solid  #b2b2b2;
}
.Sort{
    margin:0;
}
.addButton{
    background-color: v-bind(TWT);
    color:white;
    width:405px;
    margin-left:150px;
}
.numberInputContainer{
    margin:20px 0 0 150px;
}
.numberInput{
    width:80px;
    margin:0 4px;
}
.questionSort{
    margin-left:20px;
    width:30px;
    height:30px
}
</style>@/views/applyManage/newProject/newProjectType