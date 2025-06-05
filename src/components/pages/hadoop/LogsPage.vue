<script setup lang="ts">
import {useRoute,} from "vue-router";
import {onMounted, ref} from "vue";
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";
import axios from "axios";

let router = useRoute();
let logName = ref();
let logContent = ref("Loading...");
onMounted( async () => {
  logName.value = router.params["logsName"];
  console.log(logName.value);
  logContent.value = await getLog(logName.value);
  console.log(logContent.value);
})

const getLog = async (logName: string) => {
  console.log(logName);
  if (logName === undefined) {
    return (await hadoopFileSystemApi.getLogs("")).data;
  }
  if (logName !== "" || logName !== null) {
    return (await hadoopFileSystemApi.getLogs(logName)).data;
  }
}
</script>

<template>
  <div v-if="logName === undefined" v-html="logContent">
  </div>
  <div v-else>
    {{logContent}}
  </div>
</template>

<style scoped>

</style>