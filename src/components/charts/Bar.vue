<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { type ECharts } from 'echarts';

const props = defineProps({
  xAxisData: {
    type: Array as () => string[],
    required: true,
  },
  series: {
    type: Array as () => number[],
    required: true,
  },
  refresh: {
    type: Function,
  },
});

const chartRef = ref<HTMLElement | null>(null);
const chart = ref<ECharts>();
const dataSeries = ref<number[]>([]);

const option = ref({
  xAxis: {
    type: 'category',
    data: props.xAxisData,
    name: 'Usage Rate %',
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
  },
  series: [
    {
      data: props.series,
      type: 'bar',
    },
  ],
});

const initChart = () => {
  dataSeries.value = props.series;
  if (chartRef.value) {
    chart.value = echarts.init(chartRef.value, null, {
      renderer: 'svg',
    });
    chart.value.setOption(option.value);
  }
  window.addEventListener('resize', handleResize);
};

const handleResize = () => {
  if (chart.value) {
    chart.value.resize();
  }
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// 响应式更新图表数据
watch(() => props.series, (newSeries) => {
  dataSeries.value = newSeries;
  if (chart.value) {
    chart.value.setOption({
      series: [
        {
          ...option.value.series[0],
          data: newSeries,
        },
      ],
    });
  }
});

watch(() => props.xAxisData, (newXAxis) => {
  if (chart.value) {
    chart.value.setOption({
      xAxis: {
        ...option.value.xAxis,
        data: newXAxis,
      },
    });
  }
});
</script>

<template>
  <div class="chart-container h-100 w-full" ref="chartRef"></div>
</template>

<style scoped>

</style>
