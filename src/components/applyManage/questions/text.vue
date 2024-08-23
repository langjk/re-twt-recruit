<script lang="ts">
export default {
  name: "textQuest",
};
</script>
<script setup lang="ts" name="textQuest">
import { inject, ref } from "vue";
import { textQ } from "@/views/applyManage/newProject/newProjectType";
type gloVar = {
  TWT: string;
  lightTWT: string;
};
const globalVars: gloVar = inject<gloVar>("globalVars")!;
const TWT: string = globalVars.TWT;
const props = defineProps({
  serial: { type: Number, required: true },
  groups: {
    type: Array as () => Array<{ [key: string]: string | number }>,
    required: true,
  },
});
const model = defineModel<textQ>({
  default: { type: "s", title: "", required: false, groups: [] },
});
const groupsRef = ref(props.groups);
const clearSelect = () => {
  model.value.groups = [];
};
defineExpose({
  clearSelect,
});
const emit = defineEmits(["deleteQ"]);
const deleteQuestion = () => {
  emit("deleteQ", props.serial - 2);
};
</script>
<template>
  <el-form-item>
    <el-row style="flex-wrap: nowrap; margin-bottom: 0.7vw">
      <div class="groupTitle">{{ props.serial }}.</div>
      <el-select
        v-model="model.groups"
        collapse-tags
        multiple
        collapse-tags-tooltip
        :max-collapse-tags="2"
        class="groupSelector"
      >
        <el-option
          v-for="item in groupsRef"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-button class="questionSort" type="primary" plain icon="Sort" />
    </el-row>
    <el-row style="display: flex; align-items: flex-start">
      <div class="questionTitle">多行文本题</div>
      <el-row>
        <el-input
          placeholder="请输入问题描述"
          class="textInput"
          v-model="model.title"
        />
        <el-checkbox v-model="model.required" value="必填" label="必填" />
        <div class="deleteButton">
          <el-button circle plain type="danger" @click="deleteQuestion">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>
      </el-row>
    </el-row>
  </el-form-item>
</template>
<style scoped>
.groupSelector {
  min-width: 100px;
  height: 30px;
  border-radius: 5px;
}
.el-select__selection {
  flex-wrap: nowrap !important;
}
.groupTitle {
  font-size: 18px;
  color: v-bind(TWT);
  margin-right: 10px;
}
.questionTitle {
  font-size: 18px;
  color: v-bind(TWT);
  margin-right: 30px;
  margin-left: 30px;
}
.textInput {
  width: 500px;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-right: 20px;
}
.deleteButton {
  margin-left: 30px;
  height: 30px;
  width: 30px;
}
.questionSort {
  margin-left: 20px;
  width: 30px;
  height: 30px;
}
</style>
@/views/applyManage/newProject/newProjectType
