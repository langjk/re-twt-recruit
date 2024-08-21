<script lang="ts">
export default {
  name: "projectBar",
};
</script>
<script setup lang="ts" name="projectBar">
import http from "@/utils/http";
import { ElMessage } from "element-plus";
import { inject, ref, watch } from "vue";
import type { Bar } from "@/views/applyManage/projectManage/projectBarType";
import { useRouter } from "vue-router";
type gloVar = {
  TWT: string;
  lightTWT: string;
};
const globalVars: gloVar = inject<gloVar>("globalVars")!;
const TWT = ref("");
const lightTWT = ref("");
TWT.value = globalVars.TWT;
lightTWT.value = globalVars.lightTWT;
watch(
  () => globalVars.TWT,
  (newValue) => {
    TWT.value = newValue;
  }
);
watch(
  () => globalVars.lightTWT,
  (newValue) => {
    lightTWT.value = newValue;
  }
);
const router = useRouter();
const props = defineProps<{
  data: Bar;
}>();
const gotoProject = () => {
  const url = router.resolve({
    name: "projectdetail",
    params: {
      projectId: props.data.projectId,
    },
  }).href;
  window.open(url, "_blank");
};
const deleteProject = () => {
  http
    .post("/v1/child/project/delete", {
      projectId: props.data.projectId,
    })
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage.success("删除成功！");
        router.go(0);
      }
    });
};
</script>
<template v-if="">
  <el-row class="barContainer">
    <el-col :span="2">
      <div class="imgContainer"></div>
    </el-col>
    <el-col :span="12" class="text">
      <div class="title">{{ props.data.title }}</div>
      <el-row>
        <div :class="props.data.status < 2 ? 'isRecruit' : 'stopRecruit'">
          {{
            props.data.status < 2
              ? props.data.status == 0
                ? "正在招募/公开"
                : "正在招募/非公开"
              : props.data.status == 2
              ? "停止招募/公开"
              : "停止招募/非公开"
          }}
        </div>
        <div class="date">{{ props.data.endTime.slice(0, 10) }}</div>
      </el-row>
    </el-col>
    <el-col :span="4" class="text">
      <div class="member">{{ props.data.applicationNum }}人参与</div>
    </el-col>
    <el-col :span="5" class="buttonContainer">
      <el-button class="button" type="primary" @click="gotoProject()"
        >管理</el-button
      >
      <el-button class="button" type="danger" @click="deleteProject()"
        >删除</el-button
      >
    </el-col>
  </el-row>
</template>
<style scoped>
.barContainer {
  width: 930px;
  height: 50px;
}
.imgContainer {
  height: 50px;
  width: 50px;
  background-image: url("@/assets/logo.png");
  background-size: contain;
}
.avatar {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.title {
  width: 245px;
  height: 19px;
  font-weight: 400;
  font-size: 18px;
  line-height: 19px;
  color: #444444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.isRecruit {
  height: 14px;
  font-weight: 300;
  font-size: 14px;
  color: #93ea86;
}
.stopRecruit {
  height: 14px;
  font-weight: 300;
  font-size: 14px;
  color: #eaacab;
}
.date {
  height: 13px;
  font-weight: 300;
  font-size: 14px;
  color: #a6a6a6;
  margin-left: 36px;
}
.text {
  flex-direction: column;
  align-content: space-between;
  display: flex;
  justify-content: space-around;
  height: 50px;
}
.member {
  width: 80%;
  height: 20px;
  line-height: 20px;
  font-weight: 300;
  font-size: 16px;
  color: #444444;
  text-align: right;
}
.buttonContainer {
  align-items: center;
  display: flex;
  height: 50px;
}
.button {
  width: 72px;
  height: 30px;
  border-radius: 5px;
}
</style>
