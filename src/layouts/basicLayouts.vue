<script setup lang="ts">
</script>

<template>
    <el-container>
        <el-header
            bordered
            collapse-mode="width"
            :width="220"
            :native-scrollbar="false"
        >
            <el-menu
            class="el-menu-demo"
            mode="horizontal"
            default-active="/"
            router="true"
            >
                <el-menu-item index="/">首页推荐</el-menu-item>
                <el-menu-item index="/myapplication">我的申请</el-menu-item>
                <el-menu-item index="/applymanage">招募管理</el-menu-item>
                <el-menu-item index="/morehelp">更多帮助</el-menu-item>
            </el-menu>
        </el-header>

        <article flex-1 flex flex-col overflow-hidden>
            <section flex-1 overflow-hidden bg="#f5f6fb">
            <router-view v-slot="{ Component, route }">
                <template v-if="Component">
                <component :is="Component" :key="route.path" />
                </template>
            </router-view>
            </section>
        </article>
    </el-container>
</template>

<style scoped></style>