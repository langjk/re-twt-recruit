<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
import messageBar from '@/components/manageDetail/messageBar.vue';
import http from '@/utils/http'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
const TWT:string = globalVars.TWT;
var projectId = route.params.projectId
const messageData = ref<any[]>([])
const fetchData = async () => {
    await http.get("/v1/staff/messages", {projectId:projectId
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            messageData.value = res.result.records
            ElMessage.success('数据刷新成功！')
        }
    });
}
onMounted(async () => {  
    try {  
        fetchData();} catch (error) {  
    console.error('Error fetching', error);  
    }  
}); 
</script>

<template>
    <el-container>
        <el-aside>
            <projectSideBar></projectSideBar>
        </el-aside>
        <el-main style="padding:0;overflow:hidden">
            <div v-for="( message, index ) in messageData" :key="message.messageId">
                <messageBar v-model="messageData[index]"></messageBar>
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>
</style>