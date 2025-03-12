import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {IFile} from "@/components/pages/file-system/ts/file-system.ts";

/**
 * 创建一个fileSystemStore
 * 用于对于复杂的filesystem组件中的组件传参
 */
export const useFileSystemStore = defineStore('file-system-store', () => {
    /**
     * 被选中的文件列表
     */
    const checkedFilePathList = ref<string[]>()

    return { checkedFilePathList }
})
