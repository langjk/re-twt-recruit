<script setup lang="ts">
import { inject,ref } from 'vue';
const lightcolor = ref('')
const color = ref('')
type gloVar = {
    TWT:string,
    lightTWT:string
}
const globalVars:gloVar = inject<gloVar>('globalVars')!;
lightcolor.value = globalVars.lightTWT;
color.value  = globalVars.TWT;
const changeColor = () => {
    globalVars.TWT = color.value
}
const changeLightColor = () => {
    globalVars.lightTWT = lightcolor.value
}
</script>

<template>
    <div class="container">
        <div class="blockContainer">
            <h3>测试功能</h3>
            <h1>主题颜色</h1>
            <div>
                <el-color-picker v-model="color" @change="changeColor()" size="large" />
                <el-color-picker v-model="lightcolor" @change="changeLightColor()" ssize="large" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    align-items: center;
    padding:26px 0;
    flex-direction: column;
    justify-content: center;
    min-height:100vh;
}
.blockContainer{
    width:950px;
    padding:25px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(92,92,92,0.12);
    border-radius: 10px;
    margin-bottom:24px;
}
</style>