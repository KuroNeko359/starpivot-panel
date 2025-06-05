<script setup lang="ts">

import {onMounted, ref} from "vue";
import NodeListSetupPage from "@/components/pages/hadoop/setup-page/NodeListSetupPage.vue";
import hadoopConfigureApi from "@/api/hadoop-configure.ts";
import {useHadoopConfigStore} from "@/stores/hadoop-config.ts";
import type {Property} from "@/entity/entity.ts";
import {ConfigMode} from "@/components/pages/hadoop/setup-page/install.ts";
//TODO 改为从服务器获取安装列表
let steps = ref<string[]>(["Setting node list",
  "Setting core-site.xml",
  "Setting hdfs-site.xml",
  "Setting yarn-site.xml",
  "Setting mapred-site.xml"]);


let currentStep = ref(1);

let hadoopConfigStore = useHadoopConfigStore();
let properties = ref<Property[]>([]);


onMounted(() => {

  initStore();
})

let commit = () => {
  console.log(hadoopConfigStore.getHdfsSite())
  toNextStep();
}

let initStore = async () => {
  hadoopConfigStore.coreSite = (await hadoopConfigureApi.getDefaultCoreSite()).data;
  hadoopConfigStore.hdfsSite = (await hadoopConfigureApi.getDefaultHdfsSite()).data;
  hadoopConfigStore.yarnSite = (await hadoopConfigureApi.getDefaultYarnSite()).data;
  hadoopConfigStore.mapredSite = (await hadoopConfigureApi.getDefaultMapredSite()).data;
}

let toNextStep = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value += 1;
  }
}

let setupHadoopConfig = (mode: ConfigMode) => {
  switch (mode) {
    case ConfigMode.CORE:
      hadoopConfigureApi.setupCoreSite(hadoopConfigStore.coreSite || [])
      break;
    case ConfigMode.HDFS:
      hadoopConfigureApi.setupHdfsSite(hadoopConfigStore.hdfsSite || []);
      break;
    case ConfigMode.YARN:
      hadoopConfigureApi.setupYarnSite(hadoopConfigStore.yarnSite || []);
      break;
    case ConfigMode.MAPRED:
      hadoopConfigureApi.setupMapredSite(hadoopConfigStore.mapredSite || []);
      break;
  }
}

</script>

<template>
  <div class="grid grid-cols-6 overflow-y-auto py-3 px-3 bg-base-200 h-full">
    <div></div>
    <div class="col-span-4">
      <div class="card card-side bg-base-100 shadow-sm">
        <div class="p-10">
          <ul class="steps steps-vertical">
            <li
                v-for="(step,index) in steps"
                :key="index"
                :class="['step', { 'step-primary': index < currentStep }]">{{ step }}
            </li>
          </ul>
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ steps[currentStep - 1] }}</h2>
          <div class="w-full h-[50vh] list">
            <NodeListSetupPage :mode="ConfigMode.HDFS"></NodeListSetupPage>
          </div>

          <label class="label">
            <input type="checkbox"
                   :checked="hadoopConfigStore.isShowAllOptions"
                   @change='hadoopConfigStore.isShowAllOptions = !hadoopConfigStore.isShowAllOptions'
                   class="toggle"/>
            显示所有选项
          </label>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="commit">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list { /* 容器高度 */
  overflow: auto; /* 关键属性：自动显示滚动条 */
}
</style>