<script setup lang="ts">
import type {IFile, IFileContent} from "../ts/file-system.ts";
import {defineProps, ref, watch} from "vue";
import {config} from "../../../../../public/config.ts";
import {getT} from "@/i18n/language-utils.ts";
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";

/**
 * 从父组件传参来的参数
 * file IFile 接口 包含了文件的信息
 */
const props = defineProps<{
  file: IFile;
}>();

/**
 * 文件内容文本域的内容
 */
let fileContent = ref("");

/**
 * i18n的t函数
 */
let t = getT();

/**
 * 用于获取文件头部的32KB
 *
 */
const getFileHead = async (path: string) => {
  let response = (await hadoopFileSystemApi.getFileHead(path)).data as IFileContent;
  let content = response.content.toString();
  console.log(content);
  return content;
}

/**
 * 文件内容获取模式的枚举，
 * 用于判断使用哪个模式来获取文件内容
 */
enum FileContentMode {
  CONTENT,
  HEAD,
  TAIL
}

/**
 * 获取文件内容
 * @param path 文件路径
 * @param mode 获取模式（完整内容、头部或尾部）
 * @returns 文件内容字符串
 * @throws {Error} 当获取文件内容失败时抛出异常
 */
const getFileContent = async (path: string, mode: FileContentMode): Promise<string> => {
  try {
    const apiMethods = {
      [FileContentMode.CONTENT]: hadoopFileSystemApi.getFileContent,
      [FileContentMode.HEAD]: hadoopFileSystemApi.getFileHead,
      [FileContentMode.TAIL]: hadoopFileSystemApi.getFileTail
    };

    const apiMethod = apiMethods[mode];
    const response = await apiMethod(path);
    const fileContent = response.data as IFileContent;

    return fileContent.content.toString();
  } catch (error) {
    throw new Error(`Failed to get file content: ${error instanceof Error ? error.message : String(error)}`);
  }
};


const changeContent = (input: string) => {
  fileContent.value = input;
}

/**
 * 处理获取文件头按钮被点击的事件
 */
const handleHeadClick = async () => {
  let fileHead = await getFileHead(props.file.path);
  changeContent(fileHead);
}

/**
 * 处理获取文件尾按钮被点击的事件
 */
const handleGetContentClick = async (mode: FileContentMode) => {
  let fileTail = await getFileContent(props.file.path, mode);
  changeContent(fileTail);
}

console.log(props.file)

</script>

<template>
  <input type="checkbox" :id="props.file.path" class="modal-toggle"/>

  <div class="modal" role="dialog">

    <div class="modal-box">
      <label :for="props.file.path" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
      <div class="border-b-[1px] border-base-300 h-auto pb-4">
        <h3 class="text-2xl">{{ props.file.name }}</h3>
      </div>

      <div class="border-b-[1px] border-base-300 py-2">
        <div class="flex flex-row">
          <div class="flex-1/3">
            <a class="btn-ghost text-sm"
               :href="`${config.starpivot.baseURL}hdfs/download-file?path=${file.path}`"
               download
            >{{ t('file-detail.download') }}</a>
          </div>
          <div class="flex-1/3">
            <a class="btn-ghost text-sm flex-1/3" href="#"
               @click="handleGetContentClick(FileContentMode.HEAD)"
            >{{ t('file-detail.get-head') }}</a>
          </div>
          <div class="flex-1/3">
            <a class="btn-ghost text-sm flex-1/3" href="#"
               @click="handleGetContentClick(FileContentMode.TAIL)"
            >{{ t('file-detail.get-tail') }}</a>
          </div>


        </div>
      </div>
      <!--Activity-->
      <div class="border-b-[1px] border-base-300 py-2">
        <div>Size: {{file.locations[0].length}} B</div>
        <p class="text-base">Activity:</p>
        <div v-for="host in file.locations[0].hosts" class="flex flex-row pl-4">
          <div aria-label="success" class="m-1 status-md status status-success"></div>
          <p class="text-sm">
            {{ host }}
          </p>
        </div>
      </div>
      <!--BlockLocations-->
      <textarea class="w-full h-40 textarea textarea-border max-w-none resize-none"
                placeholder="Content...">{{fileContent}}</textarea>
    </div>
  </div>
</template>

<style scoped>

</style>