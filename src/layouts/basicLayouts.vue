<script setup lang="ts">
import Menu from '@/components/menu.vue'
</script>

<template>
    <el-container>
        <el-header height="82px">
            <Menu></Menu>
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