<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const route = useRoute();
type gloVar = {
  TWT: string;
  lightTWT: string;
};
const globalVars: gloVar = inject<gloVar>("globalVars")!;
const TWT: string = globalVars.TWT;
const data = JSON.parse(route.params.data as string);

type Answer = {
  questionId: number;
  questionAnswer: any;
};
type uploadAnswer = {
  groupId: number;
  quest: Answer[];
};
const answers = ref<uploadAnswer[]>([]);
const questions: any = ref([]);
const fetchGroup = () => {
  console.log(data);
  for (let i = 0; i < data.groups.length; i++) {
    let uploadAnswer: uploadAnswer = { groupId: 0, quest: [] };
    questions.value.push([]);
    for (let j = 0; j < data.Questions.length; j++) {
      if (data.Questions[j].groups.includes(data.groups[i].label)) {
        if (data.Questions[j].type == "s")
          uploadAnswer.quest.push({ questionId: 0, questionAnswer: [] });
        else uploadAnswer.quest.push({ questionId: 0, questionAnswer: "" });
        questions.value[i].push(data.Questions[j]);
      }
    }
    answers.value.push(uploadAnswer);
  }
};
const titleColor = data.titleColor;
const backColor = data.backColor;
const groupSelect = ref<number[]>([]);
const checkGroupSelect = (id: number) => {
  return groupSelect.value.indexOf(id) != -1;
};
onMounted(async () => {
  try {
    fetchGroup();
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
});
const timeSelect = ref([]);
</script>
<template>
  <div class="container">
    <el-row class="warnDiv">
      <el-icon><Warning /></el-icon>
      <div>此为预览页面 仅供参考</div>
    </el-row>
    <div class="avatar" />
    <div class="title">{{ data.title }}</div>
    <div class="blockContainer">
      <el-row class="blockTitle">
        <span></span>
        项目简介
      </el-row>
      <MdPreview :modelValue="data.brief.toString()"></MdPreview>
    </div>
    <div class="blockContainer">
      <el-row class="blockTitle">
        <span></span>
        个人资料
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">姓名</el-col>
        <el-col :span="7">预览页面</el-col>
        <el-col :span="1">学院</el-col>
        <el-col :span="6">预览页面</el-col>
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">专业</el-col>
        <el-col :span="7">预览页面</el-col>
        <el-col :span="1">年级</el-col>
        <el-col :span="6">预览页面</el-col>
      </el-row>
      <br />
      <el-row class="blockTitle">
        <span></span>
        联系方式
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">校区</el-col>
        <el-col :span="7">预览页面</el-col>
        <el-col :span="1">电话</el-col>
        <el-col :span="6">预览页面</el-col>
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">邮箱</el-col>
        <el-col :span="7">预览页面</el-col>
      </el-row>
      <br />
      <el-row class="blockTitle">
        <span></span>
        申请信息
      </el-row>
      <div class="inforContainer">
        <div class="questTitle">1.请选择想报名的组别</div>
        <el-checkbox-group class="groupButtonContainer" v-model="groupSelect">
          <el-checkbox
            v-for="group in data.groups"
            :key="group.id"
            :label="group.label"
            :value="group.id"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="inforContainer">
        <div class="questTitle">2.{{ data.timeQuestTitle }}</div>
        <el-tabs type="border-card" class="time-tabs">
          <el-tab-pane
            v-if="
              data.timeQuestTime[0] +
              data.timeQuestTime[1] +
              data.timeQuestTime[2] +
              data.timeQuestTime[3] +
              data.timeQuestTime[4]
            "
            label="上午"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="data.timeQuestTime[index - 1]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 6 + ':00-' + (index + 7) + ':00'"
                      value="Value A"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
          <el-tab-pane
            v-if="
              data.timeQuestTime[5] +
              data.timeQuestTime[6] +
              data.timeQuestTime[7] +
              data.timeQuestTime[8] +
              data.timeQuestTime[9]
            "
            label="下午"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="data.timeQuestTime[index + 4]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 11 + ':00-' + (index + 12) + ':00'"
                      value="Value A"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
          <el-tab-pane
            v-if="
              data.timeQuestTime[10] +
              data.timeQuestTime[11] +
              data.timeQuestTime[12] +
              data.timeQuestTime[13] +
              data.timeQuestTime[14]
            "
            label="晚上"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="data.timeQuestTime[index + 9]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 16 + ':00-' + (index + 17) + ':00'"
                      value="Value A"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="inforContainer">
        <el-collapse class="groupCol">
          <div v-for="(group, groupindex) in data.groups" :key="group.id">
            <el-collapse-item
              :title="group.label + ' 问卷'"
              v-if="checkGroupSelect(group.id)"
            >
              <div class="questionContainer">
                <div
                  v-for="(item, index) in questions[groupindex]"
                  :key="index"
                >
                  <div class="questionTitle">
                    {{ item.title }}
                  </div>
                  <div v-if="item.type == 't'">
                    <el-input
                      v-model="answers[groupindex].quest[index].questionAnswer"
                      class="textInput"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea"
                      placeholder="请简述你的回答"
                    />
                  </div>
                  <div v-if="item.type == 's'">
                    <div class="selectInput">
                      <el-checkbox-group
                        v-model="
                          answers[groupindex].quest[index].questionAnswer
                        "
                        :min="item.optionDetail.minSelect"
                        :max="item.optionDetail.maxSelect"
                      >
                        <el-checkbox
                          v-for="option in item.optionDetail.options"
                          :key="option.id"
                          :label="option.label"
                          :value="option.id"
                        ></el-checkbox>
                      </el-checkbox-group>
                      最少选{{ item.optionDetail.minSelect }}项,最多选{{
                        item.optionDetail.maxSelect
                      }}项
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<style></style>
<style scoped>
.container {
  display: flex;
  align-items: center;
  padding: 26px 0;
  flex-direction: column;
  justify-content: center;
  background-color: v-bind(backColor);
  min-height: 100vh;
}
.warnDiv {
  width: 1200px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 10px;
  justify-content: center;
  align-content: center;
  font-size: 16px;
}
.warnDiv .el-icon {
  margin-top: 5px;
}
.avatar {
  width: 100px;
  height: 100px;
  margin: 23px 0;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 50%;
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("@/assets/logo.png");
}
.title {
  height: 30px;
  font-size: 24px;
  color: v-bind(titleColor);
  margin-bottom: 23px;
}
.blockContainer {
  width: 1200px;
  padding: 25px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 10px;
  margin-bottom: 24px;
  font-size: 14px;
}
.blockTitle {
  height: 20px;
  font-size: 18px;
  line-height: 20px;
  font-weight: 400;
  color: #444444;
  margin-bottom: 20px;
}
.blockTitle span {
  width: 6px;
  margin-right: 18px;
  background: v-bind(TWT);
}
.inforContainer {
  margin-left: 30px;
  font-size: 14px;
  margin-bottom: 15px;
}
.questTitle {
  height: 17px;
  font-size: 16px;
  color: v-bind(TWT);
}
.groupButtonContainer {
  margin-left: 10px;
  margin-top: 15px;
}
.time-tabs {
  margin: 20px 10px;
  width: 1128px;
}
:deep(.el-tabs__item) {
  width: 100%;
}
:deep(.el-tabs__nav) {
  width: 100%;
}

:deep(.el-tabs__content) {
  padding: 0;
}
.timeTab {
  width: 100%;
  border-radius: 5px;
  margin-left: 20px;
}
.timeTab .el-divider {
  margin: 0 -20px;
}
.groupCol {
  width: 1128px;
}
:deep(.el-collapse-item__header) {
  background-color: rgb(245, 247, 250);
  padding-left: 20px;
  margin-top: 20px;
}
:deep(.el-collapse-item__wrap) {
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 0 0 10px 10px;
  padding-top: 10px;
}
:deep(.el-collapse-item__content) {
  padding: 0;
  padding-bottom: 10px;
}
.questionContainer {
  margin-left: 20px;
}
.questionTitle {
  color: v-bind(TWT);
}
.textInput {
  margin: 10px 0 10px 15px;
  width: 1000px;
}
.selectInput {
  margin: 0 0 10px 15px;
  font-size: 10px;
}
.selectInput :deep(.el-checkbox__label) {
  font-size: 12px;
}
</style>
