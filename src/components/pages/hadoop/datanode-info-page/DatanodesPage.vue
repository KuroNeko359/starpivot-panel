<script setup lang="ts">

import OverviewMap from "@/components/pages/hadoop/overview-page/overview-map/OverviewMap.vue";
import OverviewTitle from "@/components/pages/hadoop/overview-page/OverviewTitle.vue";
import DatanodesTitle from "@/components/pages/hadoop/datanode-info-page/DatanodesTitle.vue";
import Bar from "@/components/charts/Bar.vue";
</script>

<template>
  <div class="grid grid-flow-row-dense grid-cols-6 grid-rows-6">
    <div class="col-span-1">
    </div>
    <div class="col-span-4">
      <datanodes-title content="Datanode Information" :size="4"></datanodes-title>
      <datanodes-title content="Datanode usage histogram" :size="2"></datanodes-title>
      <div class="w-full">
        <bar :series="[120, 200, 150, 80, 70, 110, 130]" :x-axis="['1','2','3','4','5','6','7']"></bar>
      </div>
    </div>
    <div class="col-span-1"></div>
  </div>

</template>

<style scoped>

</style>