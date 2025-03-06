<script setup lang="ts">
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";
import {onMounted, ref} from "vue";
import Breadcurmbs from "@/components/navigation/breadcurmbs/Breadcurmbs.vue";
import FileSystemPagination from "@/components/pages/file-system/FileSystemPagination.vue";
import UploadButton from "@/components/pages/file-system/button/UploadButton.vue";
import CreateFolderButton from "@/components/pages/file-system/button/CreateFolderButton.vue";
import FileTable from "@/components/pages/file-system/view/FileTable.vue";
import type {IFile} from "@/components/pages/file-system/ts/file-system.ts";

let files = ref<IFile[][]>([]); // 修改为一维数组

let paginationProps = ref({
  pageNumber: 0,
  numberPerPage: 20,
  currentPage: 1,
});

let props = defineProps({
  path: {
    type: String,
    required: false,
    default: "/",
  },
});


onMounted(async () => {
  // 初次获取文件数据
  files.value = splitArray((await hadoopFileSystemApi.getFiles(props.path)).data);
  paginationProps.value.pageNumber = files.value.length;
  console.log(files.value);
});

// 按 numberPerPage 拆分数组 为一个二维数组
function splitArray(array: any[]): any[][] {
  let newArray: any[][] = [];
  let numberPerPage = paginationProps.value.numberPerPage;
  for (let i = 0; i < array.length; i += numberPerPage) {
    newArray.push(array.slice(i, i + numberPerPage));
  }
  return newArray;
}

const updateCurrentPage = (pageNumber: number) => {
  paginationProps.value.currentPage = pageNumber;
}

</script>

<template>
  <!-- 面包屑导航 -->
  <div class="flex w-full">
    <div class="max-w-[70%] pr-2">
      <breadcurmbs :path="props.path"></breadcurmbs>
    </div>
    <div class="max-w-[30%]">
      <upload-button></upload-button>
      <create-folder-button></create-folder-button>
    </div>
  </div>

  <!-- 表格 -->
  <file-table :paginationProps="paginationProps" :files="files">

  </file-table>
  <!-- 分页组件 -->
  <file-system-pagination
      @update:current-page="updateCurrentPage"
      v-model="paginationProps.currentPage"
      :pagination-props="paginationProps"></file-system-pagination>
</template>

<style scoped>
</style>
