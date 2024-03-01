<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router'
const route = useRoute();
const router = useRouter();
if(route.path == '/projectdetail'){
    router.push('/projectdetail/projectSet')
}
</script>


<template>
    <div class="mainContainer"> 
        <router-view></router-view>
    </div>
</template>

<style scoped>
.mainContainer{
    padding: 25px 310px;
}
</style>