<script setup lang="ts">
import { ref, onMounted } from 'vue';
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
import messageBar from '@/components/manageDetail/messageBar.vue';
import http from '@/utils/http'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
var projectId = route.params.projectId
const messageData = ref<any[]>([])
const currentPage = ref<number>(1)
const totalPage = ref<number>(0)
const fetchData = async (page:number) => {
    currentPage.value = page
    await http.get("/v1/staff/messages", {
        projectId:projectId,
        page:page,
        pageSize:5
    }).then((res:{code:number,result:any})=>{
        if(res.code == 200){
            messageData.value = res.result.records
            totalPage.value = res.result.total
            ElMessage.success('数据刷新成功！')
        }
    });
}
onMounted(async () => {  
    try {  
        fetchData(currentPage.value);} catch (error) {  
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
            <div class="paginationContainer">
                <el-pagination :current-page="currentPage" :page-size="5"
                @update:current-page="(page) => fetchData(page)"
                layout="prev, pager, next" :total="totalPage" />
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>
.paginationContainer{
    width:100%;
    display:flex;
    justify-content: center;
    align-content: center;
}
</style>