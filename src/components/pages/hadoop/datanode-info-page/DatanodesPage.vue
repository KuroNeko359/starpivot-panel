<script setup lang="ts">

import DatanodesTitle from "@/components/pages/hadoop/datanode-info-page/DatanodesTitle.vue";
import Bar from "@/components/charts/Bar.vue";
import hadoopNativeServiceApi from "@/api/hadoop-native-service.ts";
import {type DataNodeResource, getProperty, type ResponseData} from "@/components/pages/hadoop/ts/response/response.ts";
import {computed, onMounted, ref, watch} from "vue";

let dataSeries = ref<number[]>([]); // 初始化空数组

onMounted(async () => {
  let response: ResponseData = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "NameNodeInfo")).data;
  let json: Record<string, DataNodeResource> = JSON.parse(response.beans[0]["LiveNodes"] as string);

  const tempSeries = new Array(10).fill(0);

  for (const [nodeName, nodeInfo] of Object.entries(json)) {
    // 安全处理边界值
    const index = Math.min(Math.floor(nodeInfo.blockPoolUsedPercent / 10), 9);
    tempSeries[index] += 1;
  }

  dataSeries.value = tempSeries; // 直接赋值处理后的数组
})

</script>

<template>
  <div class="grid grid-flow-row-dense grid-cols-6 grid-rows-6">
    <div class="col-span-1">
    </div>
    <div class="col-span-4">
      <datanodes-title content="Datanode Information" :size="4"></datanodes-title>
      <datanodes-title content="Datanode usage histogram" :size="2"></datanodes-title>
      <div class="w-full">
        <bar :series="dataSeries"
             :x-axis-data="['0-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100']"></bar>
      </div>
    </div>
    <div class="col-span-1"></div>
  </div>

</template>

<style scoped>

</style>