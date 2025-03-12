<script setup lang="ts">
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";
import {onMounted, ref, watch} from "vue";
import Breadcurmbs from "@/components/navigation/breadcurmbs/Breadcurmbs.vue";
import FileSystemPagination from "@/components/pages/file-system/FileSystemPagination.vue";
import UploadButton from "@/components/pages/file-system/button/UploadButton.vue";
import CreateFolderButton from "@/components/pages/file-system/button/CreateFolderButton.vue";
import FileTable from "@/components/pages/file-system/view/FileTable.vue";
import type {IFile} from "@/components/pages/file-system/ts/file-system.ts";
import UploadModal from "@/components/pages/file-system/modal/UploadModal.vue";
import DeleteButton from "@/components/pages/file-system/button/DeleteButton.vue";
import ConfirmModal from "@/components/common/modal/ConfirmModal.vue";
import {useFileSystemStore} from "@/stores/file-system.ts";
import Modal from "@/components/common/modal/Modal.vue";
import Alert from "@/components/common/alert/Alert.vue";

let files = ref<IFile[][]>([]); // 修改为一维数组
let fileSystemStore = useFileSystemStore();
let checkedFilePathList = ref(fileSystemStore.checkedFilePathList ?? []);

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

/**
 * 按 numberPerPage 拆分数组 为一个二维数组
 * @param array 将要拆成二维数组的一维数组
 */
function splitArray(array: any[]): any[][] {
  let newArray: any[][] = [];
  let numberPerPage = paginationProps.value.numberPerPage;
  for (let i = 0; i < array.length; i += numberPerPage) {
    newArray.push(array.slice(i, i + numberPerPage));
  }
  return newArray;
}

/**
 * 更新当前页
 * @param pageNumber 新的页码
 */
const updateCurrentPage = (pageNumber: number) => {
  paginationProps.value.currentPage = pageNumber;
}


/**
 * 监控fileSystemStore.checkedFilePathList的变化
 * 如果变化 那么更新checkedFilePathList的属性
 */
watch(() => fileSystemStore.checkedFilePathList, (newVal) => {
  checkedFilePathList.value = newVal ?? [];
});

/**
 * 从服务器删除文件
 */
const confirmDelete = async () => {
  for (const file of checkedFilePathList.value) {
    let axiosResponse = await hadoopFileSystemApi.deleteFile(file);
    if (axiosResponse.status == 200) {
      alert("Deleting successfully!");
    }
  }
}



</script>

<template>
  <div>

    <alert content="警告" mode=""></alert>
    <!-- 面包屑导航 -->
    <div class="w-full max-w-full grid grid-cols-6 gap-4">
      <div class="pr-2 border-color-gray rounded-sm border-1 border-base-content col-span-5 px-2">
        <breadcurmbs :path="props.path"></breadcurmbs>
      </div>
      <div class="basis-1/6 col-span-1">
        <div class="flex justify-end join">
          <!--上传按钮-->
          <upload-button class="join-item"></upload-button>
          <!--创建文件夹按钮-->
          <create-folder-button class="join-item"></create-folder-button>
          <!--删除文件-->
          <delete-button class="join-item" for="delete"></delete-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div>
      <file-table
          :paginationProps="paginationProps"
          :files="files"/>
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
  <!--  删除文件的确认框-->
  <confirm-modal v-if="checkedFilePathList.length > 0" id="delete" title="Delete files"
                 content="Are you sure you want to delete there files?"
                 :callback="confirmDelete"></confirm-modal>


</template>

<style scoped>

</style>
