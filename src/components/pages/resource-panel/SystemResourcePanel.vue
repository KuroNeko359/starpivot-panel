<script setup lang="ts">

import Card from "../../common/Card.vue";
import MemoryCircle from "../../common/charts/MemoryRing";
import Modal from "@/components/common/modal/Modal.vue";
import MemoryPie from "../../common/charts/MemoryPie.vue";
import {getLocale, getT} from "@/i18n/language-utils.ts";

let t = getT();
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <Card :title="t('physical-memory-usage-rate')">
      <memory-circle type="system" pie-name="system"></memory-circle>
    </Card>

    <Card :title="t('jvm-memory-usage-rate')">
      <memory-circle type="jvm" pie-name="jvm"></memory-circle>
    </Card>

    <modal name="jvm" :title="t('jvm-memory-usage-rate')">
      <MemoryPie type="jvm" pie-name="jvm"></MemoryPie>
    </modal>
    <modal name="system" :title="t('physical-memory-usage-rate')">
      <MemoryPie type="system" pie-name="system"></MemoryPie>
    </modal>
  </div>
</template>

<style scoped>

</style>