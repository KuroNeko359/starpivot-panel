<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import type {AxiosResponse} from "axios";
import hadoopFileSystemApi from "@/api/hadoop-file-system";
import {useFileSystemStore} from "@/stores/file-system";
import type {FileInfo} from "@/components/pages/file-system/ts/file-system";
import Breadcurmbs from "@/components/navigation/breadcurmbs/Breadcurmbs.vue";
import FileSystemPagination from "@/components/pages/file-system/FileSystemPagination.vue";
import UploadButton from "@/components/pages/file-system/button/UploadButton.vue";
import CreateFolderButton from "@/components/pages/file-system/button/CreateFolderButton.vue";
import DeleteButton from "@/components/pages/file-system/button/DeleteButton.vue";
import FileTable from "@/components/pages/file-system/view/table/FileTable.vue";
import UploadModal from "@/components/pages/file-system/modal/UploadModal.vue";
import ConfirmModal from "@/components/common/modal/ConfirmModal.vue";
import Alert from "@/components/common/alert/Alert.vue";
import MkdirModal from "@/components/pages/file-system/modal/MkdirModal.vue";

// 定义 props 类型
const props = defineProps<{
  path?: string;
  refreshFunction: () => void;
}>();

// 默认值处理
const currentPath = props.path ?? "/";

// 响应式状态
const files = ref<FileInfo[][]>([]);
const fileSystemStore = useFileSystemStore();
const checkedFilePathList = ref<FileInfo[]>(fileSystemStore.checkedFilePathList ?? []);
const paginationProps = ref({
  pageNumber: 0,
  numberPerPage: 20,
  currentPage: 1,
});

// 工具函数：按分页大小拆分数组
const splitArray = (array: FileInfo[]): FileInfo[][] => {
  const {numberPerPage} = paginationProps.value;
  const result: FileInfo[][] = [];
  for (let i = 0; i < array.length; i += numberPerPage) {
    result.push(array.slice(i, i + numberPerPage));
  }
  return result;
};

// 获取文件数据
const fetchFiles = async () => {
  try {
    const response = await hadoopFileSystemApi.getFiles(currentPath);
    files.value = splitArray(response.data);
    paginationProps.value.pageNumber = files.value.length;
  } catch (error) {
    console.error("Failed to fetch files:", error);
    // 可添加错误处理逻辑，例如显示错误提示
  }
};

// 初始化加载
onMounted(fetchFiles);

// 更新当前页码
const updateCurrentPage = (pageNumber: number) => {
  paginationProps.value.currentPage = pageNumber;
};

// 监听 checkedFilePathList 变化
watch(
    () => fileSystemStore.checkedFilePathList,
    (newVal) => {
      console.log(fileSystemStore.checkedFilePathList);
      checkedFilePathList.value = newVal ?? [];
    }
);

// 删除文件
const confirmDelete = async () => {

  const deletePromises = checkedFilePathList.value.map((file) => {
    if (!file.directory) {
      return hadoopFileSystemApi.deleteFile(file.pathInHdfs)
    }
    return hadoopFileSystemApi.deleteDirectory(file.pathInHdfs);
  });

  try {
    const response = await Promise.all(deletePromises);

    response.forEach((res) => {
      if (res.status !== 200) {
        console.warn(`Failed to delete a file, status: ${res.status}`);
      }
      fileSystemStore.updateStore(res);
    });
    await fetchFiles();

  } catch (error) {
    console.error("Delete operation failed:", error);
  }
};

// 刷新页面
const refreshTable = () => {
  // props.refreshFunction();
  fetchFiles();
};

const isRequestSuccess = () => {
  console.log(fileSystemStore.response)
}

// const showAlert = () => {
//   fileSystemStore.isAlertShow = true;
// }


</script>

<template>

  <Alert
      :is-show="fileSystemStore.isAlertShow"
      :content="fileSystemStore.alertContent ?? 'Error' "
      :mode="fileSystemStore.alertMode"
  />
  <div>
    <!-- 面包屑导航和操作按钮 -->
    <div class="grid w-full max-w-full grid-cols-6 gap-4">
      <div class="col-span-5 rounded-sm border border-color-gray px-2 pr-2">
        <Breadcurmbs :path="currentPath"/>
      </div>
      <div class="col-span-1 grid grid-cols-3 justify-self-end">
        <div class="col-span-1"><UploadButton class="join-item"/></div>
        <div class="col-span-1"><CreateFolderButton class="join-item"/></div>
        <div class="col-span-1"><DeleteButton class="join-item" for="delete"/></div>
      </div>
    </div>

    <!-- 文件表格 -->
    <div>
      <FileTable :pagination-props="paginationProps" :files="files"/>
    </div>

    <!-- 分页组件 -->
    <div class="grid grid-cols-6 gap-4 border-t border-color-gray pt-2">
      <div class="col-span-2">
        <div class="flex justify-start">
          <!-- TODO: 显示文件总数 -->
        </div>
      </div>
      <div class="col-span-4 flex justify-end">
        <FileSystemPagination
            v-model="paginationProps.currentPage"
            :pagination-props="paginationProps"
            @update:current-page="updateCurrentPage"
        />
      </div>
    </div>

    <!-- Modal -->
    <UploadModal :path="currentPath" :refresh-page-function="refreshTable"/>
    <MkdirModal :path="currentPath" :refresh-page-function="refreshTable"/>
    <ConfirmModal
        v-if="checkedFilePathList.length > 0"
        id="delete"
        title="Delete files"
        content="Are you sure you want to delete these files?"
        :callback="confirmDelete"
        :refresh-page-function="refreshTable"
    />
  </div>
</template>

<style scoped>
</style>