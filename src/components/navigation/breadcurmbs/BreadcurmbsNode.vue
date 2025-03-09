<script setup lang="ts">
import Folder from "@/components/icons/Folder.vue";
import {getPathBeforeFS, pathListToString} from "@/utils/domain.ts";

// 定义 props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "folder",
  },
  directoryList: {
    type: Array, // 更明确的类型声明
    required: true,
  },
  directoryIndex: {
    type: Number,
    required: true,
  },
});

// 构建跳转路径
const jumpToFolder = (pathList: string[], index: number): string => {
  // 你可以根据 index 选择目录路径的子集
  const currentPath = pathList.slice(0, index + 1); // 获取当前目录之前的路径
  return pathListToString(currentPath); // 返回格式化后的路径
}
</script>

<template>
  <li>

    <RouterLink
        class="text-left"
        :to="{ path: '/explore', query: { path: jumpToFolder(props.directoryList as string[], props.directoryIndex) } }">
      <Folder></Folder>
      {{ props.title }}
    </RouterLink>
  </li>
</template>

<style scoped>
</style>
