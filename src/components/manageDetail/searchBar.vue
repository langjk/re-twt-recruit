<script lang="ts">
export default {
  name: "searchBar",
}; //面试控制页面搜索结果用组件
</script>
<script setup lang="ts" name="searchBar">
import { ref } from "vue";
import { memberData } from "@/views/applyManage/projectManage/manageDetail/interviewControl.vue";

const model = defineModel<memberData>({ default: { showDetail: {} } });
const groupSelect = ref<any>(0); //选择的组别
</script>
<template>
  <el-row class="barContainer" v-if="model.groups">
    <el-col :span="2">
      <div class="icon">
        <el-icon><User /></el-icon>
      </div>
    </el-col>
    <el-col :span="3">
      {{ model.name }}
    </el-col>
    <el-col :span="3">
      {{ model.uid }}
    </el-col>
    <el-col :span="5">
      <el-select class="select" v-model="groupSelect" placeholder="选择组别">
        <el-option
          v-for="(item, index) in model.groups"
          :key="item.groupId"
          :label="item.groupName"
          :value="index"
        />
      </el-select>
    </el-col>
    <el-col :span="8">
      {{
        model.groups[groupSelect] ? model.groups[groupSelect].categories : "-"
      }}
    </el-col>
    <el-col :span="3">
      <div v-if="model.groups[groupSelect].status == 0" style="color: #dc5c5c">
        未面试
      </div>
      <div v-if="model.groups[groupSelect].status == 1" class="color: #ffbf00">
        已面试
      </div>
      <div v-if="model.groups[groupSelect].status == 2" class="color: #93EA86;">
        一面过
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.barContainer {
  align-items: center;
  color: #444444;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  cursor: pointer;
}
.icon {
  width: 48px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #727272;
  font-size: 26px;
}
:deep(.el-icon svg) {
  height: 30px;
  width: 30px;
}
.select {
  width: 100px;
}
:deep(.el-col) {
  justify-content: center;
  display: flex;
}
.uninter {
  color: rgb(255, 191, 0);
}
</style>
