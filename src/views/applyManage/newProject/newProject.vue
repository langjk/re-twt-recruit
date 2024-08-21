<script setup lang="ts">
import { inject, ref, onMounted } from "vue";
import sideBar from "@/components/applyManage/sideBar.vue";
import timeGroup from "@/components/applyManage/questions/time.vue";
import textQuest from "@/components/applyManage/questions/text.vue";
import selectQuest from "@/components/applyManage/questions/select.vue";
import describeQuest from "@/components/applyManage/questions/describe.vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";
import { VueDraggableNext } from "vue-draggable-next";
import * as Types from "./newProjectType";
import { getDepartments } from "./newProjectApi";
import { useRouter } from "vue-router";
import http from "@/utils/http";
const router = useRouter();
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
const coverUrl = ref(" ");
const backUrl = ref(" ");
const titleColor = ref("#FFFFFF");
const backColor = ref("#00a1e9");
const pageMethod = ref("25%");
const circleMethod = ref("repeat");
const lockMethod = ref("fixed");
const addDialogVisible = ref(false);
const newQuestionType = ref("t");
const Questions = ref<any[]>([]);
const groups = ref([{ label: "默认组别", id: 0 }]);
const groupsIdCount = ref(1);
const gradeSelectStart = ref("");
const gradeSelectEnd = ref("");
const timeQuest = ref<Types.timeQ>({
  title: "您倾向于什么时间参加面试",
  time: [],
});
const campus = ref([]);
const identity = ref([]);
const allDepartments = ref<Types.Department[]>([]);
const backCache = ref("");
const coverCache = ref("");
var baseurl = import.meta.env.VITE_API_URL;
onMounted(async () => {
  try {
    const departments = await getDepartments();
    allDepartments.value = departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
});
const departmentSelect = ref([]);
const beforeUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isJPG) {
    ElMessage.error("上传图片只能是 JPG/PNG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 10MB!");
  }
  return isJPG && isLt2M;
};
const handleCoverUpload = (response: any) => {
  coverUrl.value = import.meta.env.VITE_API_URL + response.result;
  coverCache.value = response.result;
};
const handleBackUpload = (response: any) => {
  backUrl.value = import.meta.env.VITE_API_URL + response.result;
  backCache.value = response.result;
};
const addGroup = () => {
  let newGroup = { label: "", id: groupsIdCount.value };
  groups.value.push(newGroup);
  groupsIdCount.value++;
};

const questionRefs = ref<Types.QuestionInstance[]>([]);

const deleteGroup = (index: number) => {
  if (groups.value.length == 1) {
    ElMessage.warning("必须保留一个组别！");
    return;
  } else {
    groups.value.splice(index - 1, 1);
    questionRefs.value.forEach((ref) => {
      if (ref) {
        ref.clearSelect();
      }
    });
  }
};
const addNewQuestion = () => {
  switch (newQuestionType.value) {
    case "d":
      let d: Types.describeQ = {
        type: "d",
        title: "",
        required: false,
        groups: [],
      };
      Questions.value.push(d);
      addDialogVisible.value = false;
      return;
    case "t":
      let t: Types.textQ = {
        type: "t",
        title: "",
        required: false,
        groups: [],
      };
      Questions.value.push(t);
      addDialogVisible.value = false;
      return;
    case "s":
      let s: Types.selectQ = {
        type: "s",
        title: "",
        optionDetail: {
          options: [
            { label: "选项1", id: 0 },
            { label: "选项2", id: 1 },
          ],
          maxSelect: 2,
          minSelect: 1,
          optionsIdCount: 2,
        },
        required: false,
        groups: [],
      };
      Questions.value.push(s);
      addDialogVisible.value = false;
      return;
  }
};
const handleDelete = (serial: number) => {
  Questions.value.splice(serial, 1);
};
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};
const checkData = () => {
  //开始恐怖的整理项目格式和检查遗漏
  //检查空组
  console.log(Questions.value);
  if (title.value == "") {
    ElMessage.warning("项目标题为空！");
    return false;
  }
  groups.value.forEach((group, index) => {
    if (group.label == "") {
      ElMessage.warning("第" + (index + 1) + "个组别名称为空！");
      return false;
    }
  });
  if (endTime.value == "") {
    ElMessage.warning("截止日期为空！");
    return false;
  }
  if (contact.value == "") {
    ElMessage.warning("联系方式为空！");
    return false;
  }
  if (brief.value == "") {
    ElMessage.warning("简介为空！");
    return false;
  }
  if (backColor.value == "") backColor.value = "#00a1e9";
  if (titleColor.value == "") titleColor.value = "#FFFFFF";
  let timeCheckFlag = true;
  for (let i = 0; i < timeQuest.value.time.length; i++) {
    if (timeQuest.value.time[i] == 1) timeCheckFlag = false;
  }
  if (timeCheckFlag) {
    ElMessage.warning("请选择面试时间！");
    return false;
  }

  let allSelected = true;
  Questions.value.forEach((e) => {
    if (!e.groups.length) {
      allSelected = false;
    }
  });
  if (!allSelected) {
    ElMessage.warning("请选择问题对应组别！");
  }
  return true;
};
const saveProject = async () => {
  if (!checkData()) {
    return;
  }
  let groupString = "";
  let questString = JSON.parse(JSON.stringify(Questions.value));
  for (let i = 0; i < groups.value.length; i++) {
    groupString = groupString + groups.value[i].label + ",";
  }
  groupString = groupString.slice(0, groupString.length - 1);
  await http
    .post("/v1/child/groups", {
      groups: groupString,
      clubId: 3,
    })
    .then((res: { code: number; result: any }) => {
      if (res.code == 200) {
        for (let j = 0; j < questString.length; j++) {
          for (let k = 0; k < questString[j].groups.length; k++)
            questString[j].groups[k] =
              res.result[questString[j].groups[k]].groupId;
        }
        groupString = "";
        for (let l = 0; l < res.result.length; l++)
          groupString = groupString + res.result[l].groupId + ",";
        groupString = groupString.slice(0, groupString.length - 1);
      }
    });

  let endTimeString = JSON.stringify(endTime.value).slice(1, 11);
  let ruleString = JSON.stringify(timeQuest.value);
  let scale = localStorage.getItem("scale");
  let clubId = localStorage.getItem("clubId");
  //默认封面
  if (coverCache.value == "") {
    coverCache.value = "/project.jpg";
  }
  http
    .post("/v1/child/project", {
      title: title.value,
      clubId: clubId,
      groups: groupString,
      covers: coverCache.value,
      backgrounds: backCache.value,
      scale: scale,
      questions: JSON.stringify(questString),
      brief: brief.value,
      contact: contact.value,
      filterMethod: filterMethod.value,
      titleColor: titleColor.value,
      backColor: backColor.value,
      pageMethod: pageMethod.value,
      circleMethod: circleMethod.value,
      slideLock: lockMethod.value,
      endTime: endTimeString,
      rules: ruleString,
    })
    .then((res: { code: number; message: any; result: any }) => {
      if (res.code == 200) {
        ElMessage.success("新建项目成功！");
        router.push("/applymanage/projectmanage");
      } else {
        ElMessage.warning(res.message);
      }
    });
};

const gotoPreview = () => {
  const data = {
    title: title.value,
    brief: brief.value,
    groups: groups.value,
    timeQuestTitle: timeQuest.value.title,
    timeQuestTime: timeQuest.value.time,
    titleColor: titleColor.value,
    backColor: backColor.value,
    Questions: Questions.value,
  };
  const url = router.resolve({
    name: "projectPreview",
    params: {
      data: JSON.stringify(data),
    },
  }).href;
  window.open(url, "_blank");
};
</script>

<template>
  <el-container>
    <el-aside>
      <sideBar></sideBar>
    </el-aside>
    <el-main style="padding: 0; overflow: hidden">
      <div class="blockContainer">
        <el-row class="blockTitle">
          <span></span>
          项目设定
        </el-row>
        <el-form label-position="left" class="blockForm">
          <el-space direction="vertical" alignment="left" class="space">
            <el-form-item label="标题">
              <el-input
                class="blockInput"
                v-model="title"
                placeholder="请输入招募标题"
              />
            </el-form-item>
            <el-form-item label="组别">
              <div class="groupForm">
                <VueDraggableNext
                  :list="groups"
                  group="name"
                  animation="500"
                  handle=".groupOptionButtonSort"
                >
                  <transition-group>
                    <el-row
                      class="groupOption"
                      v-for="i in groups.length"
                      :key="i"
                    >
                      <el-col :span="19">
                        <el-input
                          :placeholder="'组别' + i"
                          v-model="groups[i - 1].label"
                        />
                      </el-col>
                      <el-col :span="5" class="buttonGroup">
                        <el-button
                          class="groupOptionButton"
                          type="danger"
                          plain
                          icon="Delete"
                          @click="deleteGroup(i)"
                        />
                        <el-button
                          class="groupOptionButtonSort"
                          type="primary"
                          plain
                          icon="Sort"
                        />
                      </el-col>
                    </el-row>
                  </transition-group>
                </VueDraggableNext>
                <el-button class="addButton" @click="addGroup()">
                  新增组别
                </el-button>
                <el-row class="warning">
                  <el-icon class="icon"><Warning /></el-icon>
                  <div>
                    如您删除了一个组别，需要重新设置申请表单中问题组别
                    如项目只有一个组别，在表单中将不显示组别选项，直接选中组别
                  </div>
                </el-row>
              </div>
            </el-form-item>
            <!-- <el-form-item label="筛选方式">
                            <div class="filterMethod">
                                <el-radio-group v-model="filterMethod">
                                    <el-radio label="0" size="default">按照第一志愿筛选</el-radio>
                                    <el-radio label="1" size="default">按照多组别筛选</el-radio>
                                    <el-popover
                                        placement="right"
                                        :width="200"
                                        trigger="hover"
                                    >
                                        <template #reference>
                                        <div class="questButton">?</div>
                                        </template>
                                        <div>
                                            <b>按第一志愿筛选：</b>申请表仅投递至第一志愿组别,由第一志愿组别决定是否通过<br>     
                                            <b>多组别分别筛选：</b>申请表分为多个副本同时投递至报名组
                                        </div>
                                    </el-popover>
                                </el-radio-group>
                                <el-row class="warning">
                                    <el-icon class="icon"><Warning /></el-icon>
                                    <div>组别和筛选方式在项目公开后不可更改</div>
                                </el-row>
                            </div>
                        </el-form-item> -->
            <el-form-item label="招募截止时间">
              <div class="datePicker">
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="请选择截止日期"
                  :disabled-date="disabledDate"
                />
                <el-row class="warning">
                  <el-icon class="icon"><Warning /></el-icon>
                  <div>招募时间将截止到您选择日期当日24:00</div>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input
                class="contactInput"
                v-model="contact"
                placeholder="请输入联系方式"
              />
              <el-popover placement="right" :width="200" trigger="hover">
                <template #reference>
                  <div class="questButton">?</div>
                </template>
                <div>
                  请填写本项目的相关联系方式，此内容将提供给申请者，以便在需要时与项目负责人取得联系
                </div>
              </el-popover>
            </el-form-item>
          </el-space>
        </el-form>
      </div>
      <div class="blockContainer">
        <el-row class="blockTitle">
          <span></span>
          项目简介
        </el-row>
        <div class="mdEditor">
          <MdEditor v-model="brief" class="editor"> </MdEditor>
          <el-row class="warning">
            <el-icon class="icon"><Warning /></el-icon>
            <div>图片最大尺寸1280*1280px,支持Markdown语法</div>
          </el-row>
        </div>
      </div>
      <div class="blockContainer">
        <el-row class="blockTitle">
          <span></span>
          样式设定
        </el-row>
        <el-form label-position="left" class="blockForm">
          <el-space direction="vertical" alignment="left" class="space">
            <el-form-item label="封面图">
              <div class="imgUploadContainer">
                <el-upload
                  :action="baseurl + '/v1/user/img'"
                  accept="image/jpeg,image/png"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  multiple
                  :on-success="handleCoverUpload"
                  class="imgUpload"
                >
                  <el-image
                    :src="coverUrl"
                    fit="contain"
                    style="height: 100%; width: 100%"
                  >
                    <template #error>
                      <div class="uploadHint">
                        <el-icon><CirclePlus /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </el-upload>
                <el-row class="warning">
                  <el-icon class="icon"><Warning /></el-icon>
                  <div>最大尺寸600*400px,推荐比例3:2</div>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="报名页设定">
              <div class="styleDefaultMethod">
                <el-radio-group v-model="filterMethod">
                  <el-radio value="0" size="default">默认样式</el-radio>
                  <el-radio value="1" size="default">自定义格式</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="标题色">
              <el-row class="colorPicker">
                <el-color-picker v-model="titleColor" :popper-class="'hex'" />
                <div>{{ titleColor }}</div>
              </el-row>
            </el-form-item>
            <el-form-item label="背景色">
              <el-row class="colorPicker">
                <el-color-picker v-model="backColor" :popper-class="'hex'" />
                <div>{{ backColor }}</div>
              </el-row>
            </el-form-item>
            <el-form-item label="背景图">
              <div class="imgUploadContainer">
                <el-upload
                  :action="baseurl + '/v1/user/img'"
                  accept="image/jpeg,image/png"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  multiple
                  :on-success="handleBackUpload"
                  class="imgUpload"
                >
                  <el-image
                    :src="backUrl"
                    fit="contain"
                    style="height: 100%; width: 100%"
                  >
                    <template #error>
                      <div class="uploadHint">
                        <el-icon><CirclePlus /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </el-upload>
                <el-row class="warning">
                  <el-icon class="icon"><Warning /></el-icon>
                  <div>最大尺寸1920*1080px</div>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item label="背景图设定">
              <div class="styleDefaultMethod">
                <el-radio-group v-model="pageMethod">
                  <el-radio value="25%" size="default">保持原始尺寸</el-radio>
                  <el-radio value="cover" size="default">填充</el-radio>
                  <el-radio value="contain" size="default">适应</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="循环方式">
              <div class="filterMethod">
                <el-radio-group v-model="circleMethod">
                  <el-radio value="repeat" size="default">循环</el-radio>
                  <el-radio value="repeat-x" size="default">横向循环</el-radio>
                  <el-radio value="repeat-y" size="default">纵向循环</el-radio>
                  <el-radio value="no-repeat" size="default">不循环</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="滑动锁定">
              <div class="filterMethod">
                <el-radio-group v-model="lockMethod">
                  <el-radio value="fixed" size="default">锁定</el-radio>
                  <el-radio value="scroll" size="default">不锁定</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="背景预览">
              <div
                class="previewDiv"
                :style="
                  lockMethod == 'fixed'
                    ? 'background-image:url(' + backUrl + ')'
                    : ''
                "
              >
                <!--如果背景图片位于父div，则不会滚动 解决了background-attachment问题-->
                <div
                  class="previewContainer"
                  :style="
                    lockMethod != 'fixed'
                      ? 'background-image:url(' + backUrl + ')'
                      : 'background-color:#ffffff00'
                  "
                >
                  <div class="title">我好想做嘉然小姐的狗啊</div>
                  <div class="content">
                    可是嘉然小姐说她喜欢的是猫，我哭了。
                    我知道既不是狗也不是猫的我为什么要哭的。因为我其实是一只老鼠。
                    我从没奢望嘉然小姐能喜欢自己。我明白的，所有人都喜欢理解余裕上手天才打钱的萌萌的狗狗或者猫猫，没有人会喜欢阴湿带病的老鼠。
                    但我还是问了嘉然小姐:“我能不能做你的狗？”
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-space>
        </el-form>
      </div>
      <div class="blockContainer">
        <el-row class="blockTitle">
          <span></span>
          申请表单
        </el-row>
        <el-form label-position="left" class="blockForm">
          <el-space direction="vertical" alignment="left" class="space">
            <timeGroup v-model="timeQuest"></timeGroup>
            <VueDraggableNext
              :list="Questions"
              group="name"
              animation="500"
              handle=".questionSort"
            >
              <transition-group>
                <div v-for="(item, index) in Questions" :key="index">
                  <textQuest
                    v-if="item.type == 't'"
                    :serial="index + 2"
                    :groups="groups"
                    v-model="Questions[index]"
                    ref="questionRefs"
                    @deleteQ="handleDelete"
                  />
                  <selectQuest
                    v-if="item.type == 's'"
                    :serial="index + 2"
                    :groups="groups"
                    v-model="Questions[index]"
                    ref="questionRefs"
                    @deleteQ="handleDelete"
                  />
                  <describeQuest
                    v-if="item.type == 'd'"
                    :serial="index + 2"
                    :groups="groups"
                    v-model="Questions[index]"
                    ref="questionRefs"
                    @deleteQ="handleDelete"
                  />
                </div>
              </transition-group>
            </VueDraggableNext>
          </el-space>
          <el-button class="newQuestionButton" @click="addDialogVisible = true"
            >新增问题</el-button
          >
          <el-dialog
            v-model="addDialogVisible"
            title="请选择新增问题类型"
            width="450"
          >
            <div style="display: flex; justify-content: center">
              <el-radio-group v-model="newQuestionType" size="large">
                <el-radio-button value="t">多行文本题</el-radio-button>
                <el-radio-button value="d">文本描述</el-radio-button>
                <el-radio-button value="s">单选多选题</el-radio-button>
              </el-radio-group>
            </div>
            <div class="newQuestionHint">
              <div v-if="newQuestionType == 't'">
                申请人使用简答方式回答问题
              </div>
              <div v-if="newQuestionType == 's'">
                申请人使用选择方式回答问题
              </div>
              <div v-if="newQuestionType == 'd'">在问题之间插入的文本描述</div>
            </div>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addNewQuestion()">
                  添加
                </el-button>
              </div>
            </template>
          </el-dialog>
        </el-form>
      </div>
      <div class="blockContainer">
        <el-row class="blockTitle">
          <span></span>
          限制条件
        </el-row>
        <el-row class="warning" style="margin-bottom: 20px">
          <el-icon class="icon"><Warning /></el-icon>
          <div>对不符合条件的申请者只会做出提示而不会拒绝提交申请</div>
        </el-row>
        <el-form label-position="left" class="blockForm">
          <el-space direction="vertical" alignment="left" class="space">
            <el-form-item label="学院">
              <el-select
                class="departmentSelector"
                v-model="departmentSelect"
                placeholder="请选择学院"
                size="large"
                multiple
              >
                <el-option
                  v-for="item in allDepartments"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年级">
              <div class="gradePickerL">
                <el-date-picker v-model="gradeSelectStart" type="year" />
              </div>
              至
              <div class="gradePickerR">
                <el-date-picker v-model="gradeSelectEnd" type="year" />
              </div>
            </el-form-item>
            <el-form-item label="校区">
              <el-checkbox-group v-model="campus" class="campusSelector">
                <el-checkbox label="卫津路校区" value="1" />
                <el-checkbox label="北洋园校区" value="2" />
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="身份">
              <el-checkbox-group v-model="identity" class="campusSelector">
                <el-checkbox label="本科生" value="1" />
                <el-checkbox label="硕士生" value="2" />
                <el-checkbox label="博士生" value="3" />
                <el-checkbox label="教职工" value="4" />
              </el-checkbox-group>
            </el-form-item>
          </el-space>
        </el-form>
      </div>
      <el-row style="justify-content: space-evenly">
        <el-button
          class="PreAndSaveButton"
          type="primary"
          @click="gotoPreview()"
          >表单预览</el-button
        >
        <el-button
          class="PreAndSaveButton"
          type="primary"
          @click="saveProject()"
          >保存</el-button
        >
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.blockContainer {
  width: 950px;
  padding: 25px;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
  border-radius: 10px;
  margin-bottom: 24px;
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
.space {
  gap: 10px 0px !important;
}
.blockInput {
  width: 330px;
  margin-left: 70px;
}
.blockForm {
  margin-left: 47px;
}
.groupTitle {
  width: 530px;
  background: #f6f6f6;
  border-radius: 2px;
  flex-wrap: nowrap;
  color: #727272;
  font-size: 14px;
  text-align: center;
}
.groupTitle #space {
  margin-right: 25px;
}
.groupForm {
  padding-left: 70px;
}
.groupOption {
  margin-bottom: 20px;
  width: 330px;
}
.buttonGroup {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
}
.groupOptionButton {
  width: 23px;
  height: 23px;
  margin: 0;
  margin-left: 7px;
  padding: 0;
  font-size: 13px;
  border: 0.05vw solid #b2b2b2;
}
.groupOptionButtonSort {
  width: 23px;
  height: 23px;
  margin: 0;
  margin-left: 7px;
  padding: 0;
  font-size: 13px;
  border: 0.05vw solid #b2b2b2;
}
.filterMethod {
  margin-left: 38px;
  font-size: 18px;
}
.addButton {
  background-color: v-bind(TWT);
  color: white;
  width: 330px;
}
.warning {
  display: flex;
  color: #eaabaa;
  width: 330px;
  flex-wrap: nowrap;
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
}
.warning .icon {
  margin-top: 2px;
}
.warning div {
  font-size: 12px;
  margin-left: 10px;
}
.datePicker {
  margin-left: 6px;
}
.contactInput {
  width: 330px;
  margin: 0 38px;
}
.questButton {
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 13px;
  text-align: center;
  margin: 0;
  padding: 0;
  border: 0.05vw solid v-bind(TWT);
  color: v-bind(TWT);
  border-radius: 20px;
}
.mdEditor {
  margin: 15px 48px;
  width: 792px;
}
.editor {
  height: 300px;
  box-shadow: 0;
  border: 0.05vw solid #d4d4d4;
  border-radius: 5px;
}
.imgUpload {
  width: 193px;
  height: 128px;
  background: #f6f6f6;
  display: flex;
  justify-content: space-evenly;
}
.uploadHint {
  width: 193px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: v-bind(TWT);
}
.imgUploadContainer {
  width: 193px;
  height: 128px;
  margin-left: 54px;
  display: flex;
  flex-direction: column;
}
.styleDefaultMethod {
  margin-left: 22px;
  font-size: 18px;
}
.colorPicker {
  margin-left: 54px;
}
.colorPicker div {
  margin-left: 5px;
}
.previewDiv {
  width: 500px;
  height: 300px;
  margin-left: 38px;
  font-size: 20px;
  overflow-y: scroll;
  background-size: v-bind(pageMethod);
  background-repeat: v-bind(circleMethod);
  background-color: v-bind(backColor);
}
.previewContainer {
  background-size: v-bind(pageMethod);
  background-repeat: v-bind(circleMethod);
  background-color: v-bind(backColor);
  height: 700px;
  width: 500px;
  padding: 20px 0;
}
.previewContainer .title {
  color: v-bind(titleColor);
  text-align: center;
  margin: 40px auto;
  font-weight: 700;
  font-size: 30px;
}
.previewContainer .content {
  text-indent: 2em;
  background-color: white;
  border-radius: 5px;
  width: 260px;
  height: 450px;
  padding: 30px 20px;
  line-height: 40px;
  margin: 0 auto;
}
.newQuestionButton {
  background-color: v-bind(TWT);
  color: white;
  width: 150px;
  margin-left: 320px;
}
.newQuestionHint {
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}
.gradePickerL :deep(.el-date-editor.el-input) {
  width: 100px !important;
}
.gradePickerR :deep(.el-date-editor.el-input) {
  width: 100px !important;
}
:deep(.el-date-editor.el-input) {
  width: 330px !important;
}
.gradePickerL {
  margin: 0 20px 0 60px;
}
.gradePickerR {
  margin: 0 20px 0 20px;
}
.departmentSelector {
  margin-left: 60px;
  width: 500px;
}
.campusSelector {
  margin-left: 60px;
}
.PreAndSaveButton {
  width: 264px;
  margin-bottom: 100px;
}
</style>
