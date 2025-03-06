<script setup lang="ts">
import type {IFile} from "../ts/file-system.ts";
import {defineProps} from "vue";
import {config} from "../../../../../public/config.ts";

const props = defineProps<{
  file: IFile;
}>();

// const downLoadFile = (filePath: string) => {
//    hadoopFileSystemApi.downloadFile(filePath);
//    console.log(filePath);
// }

// TODO 从文件路径 获取文件内容
</script>

<template>
  <input type="checkbox" :id="props.file.path" class="modal-toggle"/>
  <div class="modal" role="dialog">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ props.file.path }}</h3>
      <p class="py-4">This modal works with a hidden checkbox!</p>
      <div class="modal-action">
        <label :for="props.file.path" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
        <!--        <a class="btn" :href="props.file.url">下载</a>-->
        <!--        <router-link :to="{path: '/download-file', query: {path: file.path}}">下载</router-link>-->
        <a class="link"
           :href="`${config.starpivot.baseURL}hdfs/download-file?path=${file.path}`"
           download
        >
          下载
        </a>
      </div>
      <textarea class="textarea" placeholder="Bio"></textarea>
    </div>
  </div>
</template>

<style scoped>

</style>