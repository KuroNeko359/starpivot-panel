<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import memoryApi from "../../../../api/memory.ts";
import Shield from "../../../ui/icon/Shield.vue";
import {SystemMemory, JVMMemory, Memory, MemoryUsageRate} from "./Memory.ts";
import {getT} from "@/i18n/language-utils.ts";

/**
 * 用于存储圆圈的颜色类名，初始值为 "text-success"。
 * 颜色类名用于动态改变圆圈的颜色，以反映内存使用状态。
 */
const circleColor = ref("text-success");

/**
 * 用于存储内存信息，类型为 Memory 或 null。
 * 初始值为 null，在获取到内存信息后更新。
 */
let memory = ref<Memory | null>(null);
/**
 * 用于存储内存使用率，初始值为 0。
 * 使用率取值范围为 0 到 1，后续根据内存使用情况更新。
 */
let usedMemoryRate = ref(0);

/**
 * 定义组件的 props，接收一个 type 属性，类型为 string。
 * type 属性用于指定是显示 JVM 内存还是系统内存的信息。
 */
const props = defineProps<{
  type: string;
  pieName: string;
}>();

let t = getT();

/**
 * 异步函数，用于获取内存状态。
 * 调用 memoryApi 的 getMemory 方法获取内存信息，并将结果赋值给 memory 变量。
 * @returns 返回存储内存信息的 ref 变量 memory。
 */
async function getMemoryStatus() {
  memory.value = (await memoryApi.getMemory()).data as Memory;
  return memory;
}

/**
 * 函数用于更新圆圈的颜色和提示信息。
 * 根据传入的 type 属性（"jvm" 或 "system"）计算相应的内存使用率，
 * 并根据使用率的不同范围更新圆圈的颜色和提示信息。
 */
const updateColor = () => {
  let memoryUsageRate = calculateMemoryUsageRate();

  if (props.type === "jvm") {
    usedMemoryRate.value = memoryUsageRate.jvmMemoryUsageRate;
  } else if (props.type === "system") {
    usedMemoryRate.value = memoryUsageRate.systemMemoryUsedRate;
  } else {
    usedMemoryRate.value = 0;
  }

  // 检查 memoryUsageRate 是否为有效的数字
  if (usedMemoryRate.value > 0.85) {
    circleColor.value = "text-error";
  } else if (usedMemoryRate.value > 0.6) {
    circleColor.value = "text-warning";
  } else {
    // 如果 memoryUsageRate 小于等于 0.5，恢复默认颜色
    circleColor.value = "text-success";
  }
};

/**
 * 函数用于计算内存使用率。
 * 如果 memory 变量为空，则创建一个默认的 Memory 实例，
 * 然后使用 MemoryUsageRate 类计算内存使用率。
 * @returns 返回一个 MemoryUsageRate 实例，包含 JVM 内存使用率和系统内存使用率。
 */
const calculateMemoryUsageRate = () => {
  return new MemoryUsageRate(
      memory.value
      || new Memory(
          new SystemMemory(0, 0, 0),
          new JVMMemory(0, 0, 0)
      )
  );
}

/**
 * 生命周期钩子，在组件挂载后执行。
 * 调用 getMemoryStatus 函数获取内存状态，
 * 并调用 updateColor 函数初始化圆圈的颜色和提示信息。
 */
onMounted(async () => {
  await getMemoryStatus();
  updateColor();
});

/**
 * 点击事件处理函数，当仪表盘被点击时触发。
 * 目前仅在控制台输出 "onClick"，可根据需求扩展功能。
 */
const onClick = () => {
  console.log("onClick");
}


/**
 * 获取Prompt的内容
 */
const getPrompt = () => {
  // 检查 memoryUsageRate 是否为有效的数字
  if (usedMemoryRate.value > 0.85) {
    return t('memory-status.high-risk')
  } else if (usedMemoryRate.value > 0.6) {
    return t('memory-status.medium-risk')
  } else {
    // 如果 memoryUsageRate 小于等于 0.5，恢复默认颜色
    return t('memory-status.low-risk')
  }
}

</script>

<template>
  <!-- 布局容器，用于将内容右对齐 -->
  <div class="flex justify-end">
    <!-- 左侧容器，占总宽度的 5/6 -->
    <div class="flex w-5/6">
      <!-- 引入 Shield 组件，传递颜色和提示信息 -->
      <shield :color="circleColor" :prompt="getPrompt()"></shield>
    </div>
    <!-- 带有提示信息的容器，鼠标悬停时显示 "打开仪表盘" -->
    <!-- label :for 控制了打开Modal-->
    <label :for="props.pieName">
      <div class="tooltip" :data-tip="t('memory-ring-prompt.open-panel')">
        <!-- 横向布局容器 -->
        <div class="flex flex-row">
          <!-- 空容器，用于占位 -->
          <div class="flex justify-start">
          </div>
          <!-- 径向进度条，用于显示内存使用率 -->
          <div
              class="radial-progress dashboard-interaction-style"
              :class="circleColor"
              :style="`--value:${usedMemoryRate * 100};
            --size:8rem; --thickness: 1rem;`"
              aria-valuenow="70"
              role="progressbar"
              @click="onClick"
          >
            <!-- 显示内存使用率的百分比，保留两位小数 -->
            {{ (usedMemoryRate * 100).toFixed(2) }}%
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<style scoped>
/* 仪表盘交互样式类 */
/* 为仪表盘添加鼠标指针样式和禁止文本选择功能 */
.dashboard-interaction-style {
  cursor: pointer;
  user-select: none;
}
</style>