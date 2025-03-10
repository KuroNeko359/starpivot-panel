<script setup lang="ts">
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";
import {onMounted, ref} from "vue";
import Breadcurmbs from "@/components/navigation/breadcurmbs/Breadcurmbs.vue";
import FileSystemPagination from "@/components/pages/file-system/FileSystemPagination.vue";
import UploadButton from "@/components/pages/file-system/button/UploadButton.vue";
import CreateFolderButton from "@/components/pages/file-system/button/CreateFolderButton.vue";
import FileTable from "@/components/pages/file-system/view/FileTable.vue";
import type {IFile} from "@/components/pages/file-system/ts/file-system.ts";
import UploadModal from "@/components/pages/file-system/modal/UploadModal.vue";

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
  <div>
    <!-- 面包屑导航 -->
    <div class="w-full max-w-full grid grid-cols-6 gap-4">
      <div class="pr-2 border-color-gray rounded-sm border-1 border-base-content col-span-5 px-2">
        <breadcurmbs :path="props.path"></breadcurmbs>
      </div>
      <div class="basis-1/6 col-span-1">
        <div class="flex justify-end">
          <upload-button></upload-button>
          <create-folder-button></create-folder-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <file-table :paginationProps="paginationProps" :files="files"/>
    </div>

    <!-- 分页组件 -->
    <div class="grid grid-cols-6 gap-4 border-t-1 border-color-gray pt-2">
      <div class="col-span-2">
        <div class="flex justify-start">
          <!--TODO 未完成文件数显示-->
          <!--Showing 1 to 10 of 97 results-->
        </div>
      </div>
      <div class="col-span-4 flex justify-end">
        <file-system-pagination
            @update:current-page="updateCurrentPage"
            v-model="paginationProps.currentPage"
            :pagination-props="paginationProps"/>
      </div>
    </div>
  </div>

  <!--Modal框-->
  <!--  上传文件-->
  <upload-modal :path="props.path"></upload-modal>
</template>

<style scoped>
.border-color-gray {
  border-color: var(--input-color);
  --input-color: color-mix(in oklab, var(--color-base-content) 20%, #0000);
}
</style>
