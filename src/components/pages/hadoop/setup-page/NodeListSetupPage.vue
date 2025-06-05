<script setup lang="ts">

import hadoopConfigureApi from "@/api/hadoop-configure.ts";
import type {Property} from "@/entity/entity.ts";
import ListItem from "@/components/pages/hadoop/setup-page/ListItem.vue";
import {useHadoopConfigStore} from "@/stores/hadoop-config.ts";
import {onMounted, ref} from "vue";
import {ConfigMode} from "@/components/pages/hadoop/setup-page/install.ts";

let props = defineProps({
  mode: {
    required: true,
  }
});

let properties = ref<Property[]>([])



onMounted(() => {
  properties.value = hadoopConfigStore.coreSite || [];
  commonOptions.value = getCommandOptions() || [];
  console.log(commonOptions.value);
})

let hadoopConfigStore = useHadoopConfigStore();

let commonOptions = ref<string[]>([]);

const getCommandOptions = () => {
  switch (props.mode) {
    case ConfigMode.CORE:
      return hadoopConfigStore.commonCoreSite;
    case ConfigMode.YARN:
      return hadoopConfigStore.commonYarnSite;
    case ConfigMode.MAPRED:
      return hadoopConfigStore.commonMapredSite;
    case ConfigMode.HDFS:
      return hadoopConfigStore.commonHdfsSite;
  }
}

</script>

<template>
  <div class="join join-vertical bg-base-100">
    <list-item v-for="(item,index) in hadoopConfigStore.coreSite?.filter((item) => {
      return commonOptions.includes(item.name)
    })"
               :key="index"
               :title="item.name">
      <input type="text" placeholder="Type here" class="input" v-model="item.value"/>
    </list-item>
  </div>
</template>

<style scoped>

</style>