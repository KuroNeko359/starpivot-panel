<script setup lang="ts">

import Card from "../container/Card.vue";
import MemoryCircle from "../common/charts/MemoryRing/MemoryRing.vue";
import Modal from "../ui/modal/Modal.vue";
import MemoryPie from "../common/charts/MemoryPie.vue";

</script>

<template>
  <div class="flex flex-row flex-wrap">
    <Card title="物理内存使用率">
      <memory-circle type="system" pie-name="system"></memory-circle>
    </Card>

    <Card title="JVM内存使用率">
      <memory-circle type="jvm" pie-name="jvm"></memory-circle>
    </Card>

    <modal name="jvm" title="JVM内存使用率">
      <MemoryPie type="jvm" pie-name="jvm"></MemoryPie>
    </modal>
    <modal name="system" title="系统内存使用率">
      <MemoryPie type="system" pie-name="system"></MemoryPie>
    </modal>
  </div>
</template>

<style scoped>

</style>