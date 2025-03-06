<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from "vue";
import memoryApi from "../../../api/memory.ts";

const chartRef = ref<HTMLElement | null>(null);

const option = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
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
        { value: 100, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
});

const initChart = () => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    chart.setOption(option.value);
  }
};

onMounted(() => {
  initChart();
});


</script>

<template>
  <div class="chart-container h-100 w-full" ref="chartRef"></div>
</template>

<style scoped>
</style>
