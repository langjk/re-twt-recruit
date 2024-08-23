<script lang="ts" setup>
import { inject, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import { ElMessage } from "element-plus";
import "md-editor-v3/lib/style.css";
import http from "@/utils/http";
const route = useRoute();
type gloVar = {
  TWT: string;
  lightTWT: string;
};
const globalVars: gloVar = inject<gloVar>("globalVars")!;
const TWT: string = globalVars.TWT;
const title = ref("");
const filterMethod = ref("0");
const endTime = ref("");
const contact = ref("");
const brief = ref("");
const backUrl = ref("");
const titleColor = ref("#FFFFFF");
const backColor = ref("#00a1e9");
const pageMethod = ref("25%");
const circleMethod = ref("repeat");
const lockMethod = ref("fixed");
const groups = ref<any[]>([]);
// const selectDate = ref("");
var startTime = new Date();
var tmpDate = new Date();
const dateString = ref("");
const timeQuest = ref({ title: "", time: [] });
const baseurl = import.meta.env.VITE_API_URL;
// 设置所有折叠面展开
const open = ref<any[]>([]);

var projectId = route.params.projectId;
type Answer = {
  questionId: number;
  questionAnswer: any;
  required: boolean;
  minSelect: number;
};
type uploadAnswer = {
  groupId: number;
  quest: Answer[];
};
const answers = ref<uploadAnswer[]>([]);
const questions: any = ref([]);
const formatDate = (date: any) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const fetchDetail = async () => {
  await http
    .get("/v1/user/project", { projectId: projectId })
    .then((res: { code: number; result: any }) => {
      if (res.code == 200) {
        title.value = res.result.title;
        filterMethod.value = res.result.filterMethod;
        endTime.value = res.result.endTime;
        contact.value = res.result.contact;
        brief.value = res.result.brief;
        backUrl.value = "url(" + baseurl + res.result.background + ")";
        titleColor.value = res.result.titleColor;
        backColor.value = res.result.backColor;
        pageMethod.value = res.result.pageMethod;
        circleMethod.value = res.result.circleMethod;
        lockMethod.value = res.result.slideLock;
        groups.value = res.result.groups;
        timeQuest.value = JSON.parse(res.result.rules);
        startTime = new Date(res.result.startTime);
        tmpDate = new Date(startTime);
        dateString.value = formatDate(startTime);
      }
    });
  for (let i = 0; i < groups.value.length; i++) {
    let uploadAnswer: uploadAnswer = {
      groupId: groups.value[i].groupId,
      quest: [],
    };
    questions.value.push([]);
    for (let j = 0; j < groups.value[i].questions.length; j++) {
      if (JSON.parse(groups.value[i].questions[j].questionContent).type == "s")
        uploadAnswer.quest.push({
          questionId: groups.value[i].questions[j].questionId,
          questionAnswer: [],
          required: JSON.parse(groups.value[i].questions[j].questionContent)
            .required,
          minSelect: JSON.parse(groups.value[i].questions[j].questionContent)
            .optionDetail.minSelect,
        });
      else
        uploadAnswer.quest.push({
          questionId: groups.value[i].questions[j].questionId,
          questionAnswer: "",
          required: JSON.parse(groups.value[i].questions[j].questionContent)
            .required,
          minSelect: 0,
        });
      var handleQuest: any = groups.value[i].questions[j];
      handleQuest.questionContent = JSON.parse(handleQuest.questionContent);
      questions.value[i].push(handleQuest);
    }
    answers.value.push(uploadAnswer);
    //折叠面板自动展开
    open.value.push(i);
  }
};
const groupSelect = ref<string[]>([]);
const checkGroupSelect = (label: string) => {
  return groupSelect.value.includes(label);
};
onMounted(async () => {
  try {
    fetchDetail();
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
});
const timeSelect = ref([]);
const checkData = () => {
  //开始恐怖的整理项目格式和检查遗漏
  //检查空组

  if (!userContact.value.telephone) {
    ElMessage.warning("电话为空！");
    return false;
  }
  if (!userContact.value.email) {
    ElMessage.warning("邮箱为空！");
    return false;
  }
  if (groupSelect.value.length == 0) {
    ElMessage.warning("报名组别为空！");
    return false;
  }
  if (timeSelect.value.length == 0) {
    ElMessage.warning("请选择面试时间！");
    return false;
  }

  //检查答题
  for (let i = 0; i < answers.value.length; i++) {
    for (let j = 0; j < groupSelect.value.length; j++) {
      if (answers.value[i].groupId.toString() == groupSelect.value[j])
        for (let k = 0; k < answers.value[i].quest.length; k++) {
          if (answers.value[i].quest[k].required) {
            //必答题都检查

            if (answers.value[i].quest[k].questionAnswer instanceof Array) {
              //多选/单选题
              if (
                answers.value[i].quest[k].questionAnswer.length <
                answers.value[i].quest[k].minSelect
              ) {
                ElMessage.warning("请检查选择题答题情况！");
                return false;
              }
            } else if (!answers.value[i].quest[k].questionAnswer) {
              //简述题
              ElMessage.warning("请检查简述题答题情况！");
              return false;
            }
          } else {
            //非必答题仅检查单选多选是否合规
            if (answers.value[i].quest[k].questionAnswer instanceof Array) {
              //多选/单选题
              if (
                answers.value[i].quest[k].questionAnswer.length &&
                answers.value[i].quest[k].questionAnswer.length <
                  answers.value[i].quest[k].minSelect
              ) {
                ElMessage.warning("请检查选择题答题情况！");
                return false;
              }
            }
          }
        }
    }
  }

  return true;
};
const uploadApplication = () => {
  if (!checkData()) {
    return;
  }
  let timeString = "";
  let groupString = "";
  for (let i = 0; i < timeSelect.value.length; i++) {
    timeString =
      timeString + formatDate(startTime) + " " + timeSelect.value[i] + ",";
  }
  timeString = timeString.slice(0, timeString.length - 1);
  groupString = JSON.stringify(groupSelect.value);
  groupString = groupString.slice(1, groupString.length - 1);
  http
    .post("/v1/user/application", {
      applicationUid: userDetail.uid,
      applicationName: userDetail.name,
      projectId: projectId,
      applicationContact: userContact.value.telephone,
      applicationCampus: userContact.value.campus,
      wantedGroupIds: groupString,
      answers: JSON.stringify(answers.value),
      dateTimes: timeString,
    })
    .then((res: { code: any; message: any; result: any }) => {
      if (res.code == 200) {
        ElMessage.success(res.result);
      } else {
        ElMessage.warning(res.message);
      }
    });
};
const userDetail = {
  name: localStorage.getItem("nickname"),
  major: localStorage.getItem("major"),
  grade: localStorage.getItem("grade"),
  uid: localStorage.getItem("uid"),
  department: localStorage.getItem("department"),
};
type contact = {
  campus: any;
  telephone: any;
  email: any;
};
const userContact = ref<contact>({
  campus: "",
  telephone: "",
  email: "",
});
(userContact.value.campus = localStorage.getItem("campus")),
  (userContact.value.telephone = localStorage.getItem("telephone")),
  (userContact.value.email = localStorage.getItem("email"));
const campusOption = ["卫津路校区", "北洋园校区"];
</script>
<template>
  <div class="container">
    <div class="avatar" />
    <div class="title">{{ title }}</div>
    <div class="blockContainer">
      <el-row class="blockTitle">
        <span></span>
        项目简介
      </el-row>
      <MdPreview :modelValue="brief.toString()"></MdPreview>
    </div>
    <div class="blockContainer">
      <el-row class="blockTitle">
        <span></span>
        个人资料
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">姓名</el-col>
        <el-col :span="7">{{ userDetail.name }}</el-col>
        <el-col :span="1">学院</el-col>
        <el-col :span="6">{{ userDetail.department }}</el-col>
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">专业</el-col>
        <el-col :span="7">{{ userDetail.major }}</el-col>
        <el-col :span="1">年级</el-col>
        <el-col :span="6">{{ userDetail.grade }}</el-col>
      </el-row>
      <br />
      <el-row class="blockTitle">
        <span></span>
        联系方式
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">校区</el-col>
        <el-col :span="7">
          <el-select v-model="userContact.campus" class="input">
            <el-option
              v-for="item in campusOption"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-col>
        <el-col :span="1">电话</el-col>
        <el-col :span="6">
          <el-input class="input" v-model="userContact.telephone" />
        </el-col>
      </el-row>
      <el-row class="inforContainer">
        <el-col :span="1">邮箱</el-col>
        <el-col :span="7">
          <el-input class="input" v-model="userContact.email" />
        </el-col>
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
            v-for="group in groups"
            :key="group.groupId"
            :value="group.groupId"
            >{{ group.groupName }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <div class="inforContainer">
        <div class="questTitle">2.{{ timeQuest.title }}</div>
        <!-- <div class="datePicker">
          <el-date-picker
            v-model="selectDate"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
            @change="console.log(selectDate)"
          />
        </div> -->
        <!-- <el-row class="warning">
          <el-icon class="icon"><Warning /></el-icon>
          <div>面试从 {{ dateString }} 开始，为期三天</div>
        </el-row> -->
        <el-tabs type="border-card" class="time-tabs">
          <el-tab-pane
            v-if="
              timeQuest.time[0] +
              timeQuest.time[1] +
              timeQuest.time[2] +
              timeQuest.time[3] +
              timeQuest.time[4]
            "
            :label="`${formatDate(tmpDate)} 上午`"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="timeQuest.time[index - 1]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 6 + ':00-' + (index + 7) + ':00'"
                      :value="index + 6 + ':00-' + (index + 7) + ':00'"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
          <el-tab-pane
            v-if="
              timeQuest.time[5] +
              timeQuest.time[6] +
              timeQuest.time[7] +
              timeQuest.time[8] +
              timeQuest.time[9]
            "
            :label="`${formatDate(tmpDate)} 中午`"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="timeQuest.time[index + 4]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 11 + ':00-' + (index + 12) + ':00'"
                      :value="index + 11 + ':00-' + (index + 12) + ':00'"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
          <el-tab-pane
            v-if="
              timeQuest.time[10] +
              timeQuest.time[11] +
              timeQuest.time[12] +
              timeQuest.time[13] +
              timeQuest.time[14]
            "
            :label="`${formatDate(tmpDate)} 晚上`"
          >
            <slot>
              <el-checkbox-group v-model="timeSelect">
                <div v-for="index in 5" :key="index" class="timeTab">
                  <div v-if="timeQuest.time[index + 9]">
                    <el-divider></el-divider>
                    <el-checkbox
                      style="width: 100%"
                      :label="index + 16 + ':00-' + (index + 17) + ':00'"
                      :value="index + 16 + ':00-' + (index + 17) + ':00'"
                    />
                  </div>
                </div>
              </el-checkbox-group>
            </slot>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="inforContainer">
        <el-collapse class="groupCol" v-model="open">
          <div v-for="(group, groupindex) in groups" :key="group.id">
            <el-collapse-item
              :title="group.groupName + ' 问卷'"
              v-if="checkGroupSelect(group.groupId)"
              :name="groupindex"
            >
              <div class="questionContainer">
                <div
                  v-for="(item, index) in questions[groupindex]"
                  :key="index"
                >
                  <div class="questionTitle">
                    {{
                      item.questionContent.required
                        ? "【必填】"
                        : "【非必填】" + item.questionContent.title
                    }}
                  </div>
                  <div v-if="item.questionContent.type == 't'">
                    <el-input
                      v-model="answers[groupindex].quest[index].questionAnswer"
                      class="textInput"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea"
                      placeholder="请简述你的回答"
                    />
                  </div>
                  <div v-if="item.questionContent.type == 's'">
                    <div class="selectInput">
                      <el-checkbox-group
                        v-model="
                          answers[groupindex].quest[index].questionAnswer
                        "
                        :max="item.questionContent.optionDetail.maxSelect"
                      >
                        <el-checkbox
                          v-for="option in item.questionContent.optionDetail
                            .options"
                          :key="option.id"
                          :label="option.label"
                          :value="option.id"
                        ></el-checkbox>
                      </el-checkbox-group>
                      最少选{{
                        item.questionContent.optionDetail.minSelect
                      }}项,最多选{{
                        item.questionContent.optionDetail.maxSelect
                      }}项
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <el-row style="justify-content: space-evenly">
        <el-button
          class="PreAndSaveButton"
          type="primary"
          @click="uploadApplication()"
          >提交问卷</el-button
        >
      </el-row>
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
  background-image: v-bind(backUrl);
  background-attachment: v-bind(lockMethod);
  background-repeat: v-bind(circleMethod);
  background-size: v-bind(pageMethod);
  min-height: 100vh;
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
  align-items: center;
}
.datePicker {
  margin: 10px;
  margin-top: 20px;
}
.questTitle {
  height: 17px;
  font-size: 16px;
  color: v-bind(TWT);
}
.warning {
  display: flex;
  color: #eaabaa;
  width: 330px;
  flex-wrap: nowrap;
  font-size: 14px;
  line-height: 16px;
  margin-top: 15px;
  margin-left: 10px;
}
.warning .icon {
  margin-top: 2px;
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
.PreAndSaveButton {
  width: 264px;
  margin-bottom: 100px;
}
.input {
  width: 250px;
}
</style>
