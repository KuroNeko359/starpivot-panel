<script setup lang="ts">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

let props = defineProps({
  xAxis: {
    type: Array<string>,
    required: true
  },
  series: {
    type: Array<number>,
  }
});

let chartRef = ref<HTMLElement | null>(null);

const option = ref({
  xAxis: {
    type: 'category',
    data: props.xAxis,
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.series,
      type: 'bar'
    }
  ]
});

const initChart = () => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    chart.setOption(option.value);
  }
}

onMounted(() => {
  initChart();
})

</script>

<template>
  <div class="chart-container h-100 w-full" ref="chartRef">

  </div>
</template>

<style scoped>

</style>