<script lang="ts">
export default {
  name: "timeGroup",
};
</script>
<script setup lang="ts" name="timeGroup">
import { inject, ref, watch } from "vue";
import { timeQ } from "@/views/applyManage/newProject/newProjectType";
type gloVar = {
  TWT: string;
  lightTWT: string;
};
const globalVars: gloVar = inject<gloVar>("globalVars")!;
const TWT: string = globalVars.TWT;
// const timeGroupOptions = [
//     {
//         value:'0',
//         label:'半小时一组'
//     },
//     {
//         value:'1',
//         label:'一小时一组'
//     }
// ]
// const timeGroup = ref('0')  ----面试时间分组用 已经舍弃----
const timedivWidth = ref([0, 0, 0]);
const timedivLeft = ref([64, 64, 64]);
const timescounter = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const model = defineModel<timeQ>({
  default: { title: "您倾向于什么时间参加面试", time: [] },
});

watch(
  () => model.value,
  (val) => {
    //val为修改后的值,preVal为修改前的值
    timescounter.value = val.time;
  }
);
const TimeFlag = (Data: number) => {
  //大一怎么写出这两百行的b函数的
  if (timescounter.value[Data] == 0) {
    if (Data < 5) {
      for (let i = 0; i < 5; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            for (let j = Data; j <= i; j++) {
              timescounter.value.splice(j, 1, 1);
              for (let k = 4; k >= 0; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[0] = 40 + (k - Data) * 70;
                  timedivLeft.value[0] = 72 + 70 * Data;
                  break;
                }
              }
              timedivLeft.value[0] = 72 + 70 * Data;
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              timescounter.value.splice(j, 1, 1);
              timedivWidth.value[0] = 40 + (Data - i) * 70;
              timedivLeft.value[0] = 72 + 70 * i;
            }
            return;
          }
        }
        timescounter.value.splice(Data, 1, 1);
        timedivWidth.value[0] = 0;
      }
    } else if (Data > 4 && Data < 10) {
      for (let i = 5; i < 10; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            for (let j = Data; j <= i; j++) {
              timescounter.value.splice(j, 1, 1);
              for (let k = 9; k >= 5; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[1] = 40 + (k - Data) * 70;
                  timedivLeft.value[1] = 72 + 70 * (Data - 5);
                  break;
                }
              }
              timedivLeft.value[1] = 72 + 70 * (Data - 5);
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              timescounter.value.splice(j, 1, 1);
              timedivWidth.value[1] = 40 + (Data - i) * 70;
              timedivLeft.value[1] = 72 + 70 * (i - 5);
            }
            return;
          }
        }
        timescounter.value.splice(Data, 1, 1);
        timedivWidth.value[1] = 0;
      }
    } else if (Data > 9) {
      for (let i = 10; i < 15; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            for (let j = Data; j <= i; j++) {
              timescounter.value.splice(j, 1, 1);
              for (let k = 14; k >= 10; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[2] = 40 + (k - Data) * 70;
                  timedivLeft.value[2] = 72 + 70 * (Data - 10);
                  break;
                }
              }
              timedivLeft.value[2] = 72 + 70 * (Data - 10);
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              timescounter.value.splice(j, 1, 1);
              timedivWidth.value[2] = 40 + (Data - i) * 70;
              timedivLeft.value[2] = 72 + 70 * (i - 10);
            }
            return;
          }
        }
        timescounter.value.splice(Data, 1, 1);
        timedivWidth.value[2] = 0;
      }
    }
  } else if (timescounter.value[Data] == 1) {
    if (Data < 5) {
      for (let i = 0; i < 5; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            timescounter.value.splice(Data, 1, 0);
            for (let k = 4; k >= 0; k--) {
              if (timescounter.value[k] == 1) {
                timedivWidth.value[0] = 40 + (k - i) * 70;
                timedivLeft.value[0] = 72 + 70 * i;
                break;
              }
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              for (let k = 4; k >= 0; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[0] = 40 + (k - Data - 1) * 70;
                  timedivLeft.value[0] = 72 + 70 * (Data + 1);
                  if (k == Data) timedivWidth.value[0] = 0;
                  break;
                }
              }
              timescounter.value.splice(j, 1, 0);
            }
            return;
          }
          timescounter.value.splice(Data, 1, 0);
          timedivWidth.value[0] = 0;
        }
      }
    } else if (Data > 4 && Data < 10) {
      for (let i = 5; i < 10; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            timescounter.value.splice(Data, 1, 0);
            for (let k = 9; k >= 5; k--) {
              if (timescounter.value[k] == 1) {
                timedivWidth.value[1] = 40 + (k - i) * 70;
                timedivLeft.value[1] = 72 + 70 * (i - 5);
                break;
              }
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              for (let k = 9; k >= 5; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[1] = 40 + (k - Data - 1) * 70;
                  timedivLeft.value[1] = 72 + 70 * (Data + 1 - 5);
                  if (k == Data) timedivWidth.value[1] = 0;
                  break;
                }
              }
              timescounter.value.splice(j, 1, 0);
            }
            return;
          }
          timescounter.value.splice(Data, 1, 0);
          timedivWidth.value[1] = 0;
        }
      }
    } else if (Data > 9) {
      for (let i = 10; i < 15; i++) {
        if (timescounter.value[i] == 1) {
          if (i > Data) {
            timescounter.value.splice(Data, 1, 0);
            for (let k = 14; k >= 10; k--) {
              if (timescounter.value[k] == 1) {
                timedivWidth.value[2] = 40 + (k - i) * 70;
                timedivLeft.value[2] = 72 + 70 * (i - 10);
                break;
              }
            }
            return;
          } else if (i < Data) {
            for (let j = i; j <= Data; j++) {
              for (let k = 14; k >= 10; k--) {
                if (timescounter.value[k] == 1) {
                  timedivWidth.value[2] = 40 + (k - Data - 1) * 70;
                  timedivLeft.value[2] = 72 + 70 * (Data + 1 - 10);
                  if (k == Data) timedivWidth.value[2] = 0;
                  break;
                }
              }
              timescounter.value.splice(j, 1, 0);
            }
            return;
          }
          timescounter.value.splice(Data, 1, 0);
          timedivWidth.value[2] = 0;
        }
      }
    }
  }
  model.value.time = timescounter.value;
};
const cleartimes = () => {
  for (let i = 0; i < 20; i++) timescounter.value.splice(i, 1, 0);
  for (let j = 0; j < 3; j++) {
    timedivWidth.value[j] = 0;
  }
};
</script>
<template>
  <el-form-item>
    <el-row style="display: flex; align-items: flex-start">
      <div class="questionTitle">1.面试时间题</div>
      <el-row>
        <el-input
          placeholder="请输入问题描述"
          class="timeInput"
          v-model="model.title"
        ></el-input>
        <el-row class="timeSelectContainer">
          <div class="timeSelectTitle">面试时间范围选择</div>
          <div class="timeListBack0"></div>
          <div class="timeListBack1"></div>
          <div class="timeListBack2"></div>
          <div class="timeButtonGroup">
            <div class="timeButtonContainer">
              上午<el-button
                size="large"
                circle
                v-for="times in 5"
                :key="times + 4"
                @click="TimeFlag(times - 1)"
                :color="timescounter[times - 1] == 1 ? '#E3F5FD' : '#FFFFFF'"
                class="timeButton"
                >{{ times + 7 }}</el-button
              >
            </div>
            <div class="timeButtonContainer">
              下午<el-button
                size="large"
                circle
                v-for="times in 5"
                :key="times + 4"
                @click="TimeFlag(times + 4)"
                :color="timescounter[times + 4] == 1 ? '#E3F5FD' : '#FFFFFF'"
                class="timeButton"
                >{{ times + 12 }}</el-button
              >
            </div>
            <div class="timeButtonContainer">
              晚上<el-button
                size="large"
                circle
                v-for="times in 5"
                :key="times + 4"
                @click="TimeFlag(times + 9)"
                :color="timescounter[times + 9] == 1 ? '#E3F5FD' : '#FFFFFF'"
                class="timeButton"
                >{{ times + 17 }}</el-button
              >
            </div>
            <div>
              <el-button type="danger" plain @click="cleartimes()"
                ><el-icon><Delete /></el-icon>清空</el-button
              >
            </div>
          </div>
        </el-row>
      </el-row>
    </el-row>
  </el-form-item>
</template>
<style scoped>
.timeButtonGroup {
  background: #ffffff;
  padding: 10px 10px 10px 10px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  box-shadow: 0px 1px 4px 0px rgba(92, 92, 92, 0.12);
}
.timeButtonGroup .el-button {
  border: none !important;
}
.timeListBack0 {
  position: absolute;
  height: 40px;
  width: v-bind("timedivWidth[0]/19.2 + 'vw'");
  background: #e3f5fd;
  margin: 50px auto auto 56px;
  margin-left: v-bind("timedivLeft[0]/19.2 +'vw'");
  border-radius: 20px;
  z-index: 0;
}
.timeListBack1 {
  position: absolute;
  height: 40px;
  width: v-bind("timedivWidth[1]/19.2 + 'vw'");
  background: #e3f5fd;
  margin: 100px auto auto 56px;
  margin-left: v-bind("timedivLeft[1]/19.2 +'vw'");
  border-radius: 20px;
  z-index: 0;
}
.timeListBack2 {
  position: absolute;
  height: 40px;
  width: v-bind("timedivWidth[2]/19.2 + 'vw'");
  background: #e3f5fd;
  margin: 150px auto auto 56px;
  margin-left: v-bind("timedivLeft[2]/19.2 + 'vw'");
  border-radius: 20px;
  z-index: 0;
}
.timeButtonContainer {
  margin-top: 10px;
  width: 500px;
  z-index: 2;
}
.timeButton {
  margin-left: 30px;
  font-size: 16px;
}
.timeSelectTitle {
  width: 425px;
  text-align: center;
  height: 30px;
  background: v-bind(TWT);
  font-size: 14px;
  color: #ffffff;
  line-height: 30px;
  border-radius: 5px;
}
.questionTitle {
  font-size: 18px;
  color: v-bind(TWT);
  margin-right: 60px;
}
.timeInput {
  width: 500px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.timeGroupSelector {
  width: 119px;
  border-radius: 3px;
}
.timeSelectContainer {
  flex-direction: column;
  margin-left: 10px;
  width: 500px;
}
</style>
