<script setup lang="ts">
import sideBar from '@/components/applyManage/sideBar.vue'
</script>

<template>
    <div class="mainContainer">
        <el-container>
            <el-aside>
                <sideBar></sideBar>
            </el-aside>
        </el-container>
    </div>
</template>

<style scoped>
.mainContainer{
    padding: 25px 310px;
}
</style>