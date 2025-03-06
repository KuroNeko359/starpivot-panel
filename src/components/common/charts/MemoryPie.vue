<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import memoryApi from "../../../api/memory.ts";
import type {Memory} from "./MemoryRing/Memory.ts";

const chartRef = ref<HTMLElement | null>(null);

// const red500 = getComputedStyle(document.documentElement)
//     .getPropertyValue('--tw-red-500');

const option = ref({
  tooltip: {
    // 触发类型，'item' 表示鼠标悬停在具体的数据项上触发
    trigger: 'item',
    // 提示框的显示内容格式
    formatter: '{b} : {c} MB ({d}%)',

  },
  legend: {
    top: '5%',
    left: 'center',
    selected: {
      'Memory Used': true,  // 保持默认选中状态
      'Memory Free': true   // 保持默认选中状态
    },
    selectedMode: false,  // 禁用图例的选择功能
    textStyle: {
      color: "#000000",
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {value: 0, name: 'Used Memory'},
        {value: 0, name: 'Free Memory'},
      ]
    }
  ]
});


const initChart = () => {
  if (chartRef.value) {
    echarts.dispose(chartRef.value);
    const chart = echarts.init(chartRef.value);
    chart.setOption(option.value, true);
  }
};

const setOptionWithRequest = async () => {
  let usedMemory: number, freeMemory: number;
  const data = (await memoryApi.getMemory()).data as Memory;
  if (props.type === "system") {
    usedMemory = toMB(data.systemMemory.usedMemory);
    freeMemory = toMB(data.systemMemory.freeMemory);
    setOption(usedMemory, freeMemory);
  } else if (props.type === "jvm") {
    usedMemory = toMB(data.jvmMemory.usedMemory);
    freeMemory = toMB(data.jvmMemory.freeMemory);
    setOption(usedMemory, freeMemory);
  }
};

function toMB(bytesNumber:number) {
  return Math.floor(bytesNumber/(1024*1024));
}

function setOption(usedMemory: number, freeMemory: number) {
  option.value.series[0].data[0].value = usedMemory;
  option.value.series[0].data[1].value = freeMemory;
}


const updateChart = async () => {
  await setOptionWithRequest();
  initChart()
}

onMounted(() => {
  updateChart();
  const tailwindColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary')
      .trim();
  console.log(tailwindColor);
});


let props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => ["system", "jvm"].includes(value),
  }
});
</script>

<template>
  <div class="chart-container h-60 w-full" ref="chartRef"></div>
  <a @click="updateChart" class="btn">
    Refresh
  </a>
</template>

<style scoped>
</style>
