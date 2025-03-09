/**
* 文件列表组件
*
* 该组件用于展示文件系统中的文件列表，并支持分页。
*
* @component
* @example
*
<FileTable :files="files" :paginationProps="paginationProps"/>
*
* @prop {File[][]} files - 多维数组，每个子数组代表一个分页的文件列表。
* @prop {Object} paginationProps - 分页相关属性。
* @prop {number} paginationProps.pageNumber - 总页数。
* @prop {number} paginationProps.numberPerPage - 每页文件数。
* @prop {number} paginationProps.currentPage - 当前页码。
*/

<script setup lang="ts">
import {defineProps, ref, watch} from 'vue';
import type {IFile} from "../ts/file-system.ts";
import router from "../../../../router";
import FileDetail from "./FileDetail.vue";
import Alert from "../../../common/alert/Alert.vue";
import {getT} from "@/i18n/language-utils.ts";

interface PaginationProps {
  pageNumber: number;
  numberPerPage: number;
  currentPage: number;
}

const props = defineProps<{
  files: IFile[][];
  paginationProps: PaginationProps;
}>();

// 当前页面索引
const currentPage = ref(props.paginationProps.currentPage);

// 当前页面的文件列表
const currentFiles = ref(props.files[currentPage.value - 1] || []);

// 监听文件列表变化，更新当前页数据
watch(() => props.files, (newFiles) => {
  currentFiles.value = newFiles[currentPage.value - 1] || [];
});

// 监听分页信息变化，更新当前页和文件列表
watch(() => props.paginationProps.currentPage, (newPage) => {
  currentPage.value = newPage;
  currentFiles.value = props.files[newPage - 1] || [];
});

/**
 * 处理文件名点击事件
 * 判断对象是文件还是目录
 * 如果是文件执行fileOnClick
 * 如果是目录执行directoryOnClick
 * @param {string} fileName - 被点击的文件名
 */
// const fileNameOnClick = (fileName: File) => {
//   console.log(fileName);
//   console.log(props.files);
//
//   if (fileName.dir) {
//     directoryOnClick(fileName.name);
//   } else {
//     fileOnClick(fileName.name);
//   }
// };

/**
 * 处理文件被点击的事件
 * @param fileName
 */
const fileOnClick = (fileName: string) => {
  console.log(fileName, "is a file");
  alert("是文件");

  // TODO 弹出Modal来显示文档的详情界面
};

/**
 * 处理文件夹被点击的事件
 * @param directoryName
 */
const directoryOnClick = (directoryName: string) => {
  console.log(directoryName, "is a directory");
  // TODO 需要做跳转目录的逻辑
  router.push({path: '/fs', query: {path: '/' + directoryName}});
};

/**
 * 根据文件名查找当前页面的文件
 * @param {string} fileName - 要查找的文件名
 */
const getFileFromCurrentFiles = (fileName: string) => {
  return currentFiles.value.filter((file) => file.name === fileName)[0];
};

/**
 * 从Url中提取出HDFS中的Path
 * @param {string} url URL
 */
const getPathFromUrl = (url: string) => {
  return new URL(url).pathname;
}

/**
 * 从时间戳格式化为时间字符串
 * @param timestamp 时间戳(精确到毫秒)
 */
const timestampToDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
}

/**
 *
 */
const addComponent = () => {
  console.log("添加组件")
}

let showDetail = ref(false);

var t = getT();
</script>

<template>

  <div class="overflow-x-auto">
    <alert :is-show="currentFiles.length == 0" content="Nothing in directory."></alert>
    <table class="table table-xs">
      <thead>
      <tr>
        <th></th>
        <th>{{t('file-table-column.permission')}}</th>
        <th>{{t('file-table-column.owner')}}</th>
        <th>{{t('file-table-column.group')}}</th>
        <th>{{t('file-table-column.size')}}</th>
        <th>{{t('file-table-column.last-modified')}}</th>
        <th>{{t('file-table-column.replication')}}</th>
        <th>{{t('file-table-column.block-size')}}</th>
        <th>{{t('file-table-column.name')}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(file, index) in currentFiles" :key="file.name">
        <th class="text-s">{{ index + 1 }}</th>
        <td class="text-base">{{ file.permission }}</td>
        <td class="text-base">{{ file.owner }}</td>
        <td class="text-base">{{ file.group }}</td>
        <td class="text-base">{{ file.length }} B</td>
        <td class="text-base">{{ timestampToDate(file.modificationTime) }}</td>
        <td class="text-base">{{ file.blockReplication }}</td>
        <td class="text-base">{{ (file.blockSize / 1024 / 1024).toFixed(2) }} Mb</td>
        <td class="text-base">
          <!--点击文件夹逻辑-->
          <router-link v-if="file.dir" class="link link-primary"
                       :to="{path: '/explore', query: {path: encodeURIComponent(file.path)}}">
            {{ file.name }}
          </router-link>
          <!--点击文件逻辑-->
          <label
              v-else
              class="link link-primary"
              :for="file.path"
              @click="showDetail = true"
          >
            {{ file.name }}
          </label>
          <!--在label被点击时才会生成组件-->
          <file-detail
              v-if="showDetail"
              :file="file"
          ></file-detail>

        </td>
      </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped>
</style>