<script setup lang="ts">
import projectSideBar from '@/components/applyManage/projectManage/projectSideBar.vue'
</script>

<template>
    <div class="mainContainer">
        <el-container>
            <el-aside>
                <projectSideBar></projectSideBar>
            </el-aside>
        </el-container>
    </div>
</template>

<style scoped>
.mainContainer{
    padding: 25px 310px;
}
</style>