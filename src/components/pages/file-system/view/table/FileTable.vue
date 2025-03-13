/**
* 文件列表组件
* 用于展示文件系统中的文件列表，支持分页展示和文件操作。
*
* @component
* @example
* <FileTable :files="files" :pagination-props="paginationProps" />
*
* @prop {IFile[][]} files - 分页文件列表的多维数组
* @prop {PaginationProps} pagination-props - 分页配置对象
*/

<script setup lang="ts">
import { defineProps, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { IFile } from '@/components/pages/file-system/ts/file-system.ts'
import FileDetail from '@/components/pages/file-system/view/FileDetail.vue'
import Alert from '@/components/common/alert/Alert.vue'
import { getT } from '@/i18n/language-utils.ts'
import { useFileSystemStore } from '@/stores/file-system.ts'

interface PaginationProps {
  pageNumber: number    // 总页数
  numberPerPage: number // 每页数量
  currentPage: number   // 当前页码
}

defineEmits(['delete-files'])

const props = defineProps<{
  files: IFile[][]
  paginationProps: PaginationProps
}>()

const router = useRouter()
const fileSystemStore = useFileSystemStore()
const t = getT()

// 状态管理
const currentPage = ref(props.paginationProps.currentPage)
const isCheckedAll = ref(false)
const checkedFilePathList = ref<string[]>([])
const showDetails = ref<Record<string, boolean>>({})
const alertIsShow = ref(false)

// 计算属性：当前页文件列表
const currentFiles = computed(() =>
    props.files[currentPage.value - 1] || []
)

// 监听分页和文件变化
watch(() => props.paginationProps.currentPage, (newPage) => {
  currentPage.value = newPage
})

watch(checkedFilePathList, (newPaths) => {
  fileSystemStore.checkedFilePathList = newPaths
})

// 文件操作函数
const handleFileClick = (file: IFile) => {
  if (file.dir) {
    router.push({
      path: '/explore',
      query: { path: encodeURIComponent(file.path) }
    })
  } else {
    showDetails.value[file.name] = true
  }
}

const toggleAllCheckboxes = () => {
  isCheckedAll.value = !isCheckedAll.value
  checkedFilePathList.value = isCheckedAll.value
      ? currentFiles.value.map(file => file.path)
      : []
}

// 工具函数
const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleString()

const formatBlockSize = (bytes: number): string =>
    `${(bytes / 1024 / 1024).toFixed(2)} MB`

const showAlert = () => {
  alertIsShow.value = true
}
</script>

<template>
  <div class="overflow-x-auto">
    <button class="btn" @click="showAlert">Show Alert</button>

    <Alert
        :is-show="alertIsShow"
        content="Upload successful"
        mode="alert-success"
    />

    <Alert
        :is-show="currentFiles.length === 0"
        content="Nothing in directory"
    />

    <table class="table table-xs">
      <thead>
      <tr>
        <th class="w-12">
          <input
              type="checkbox"
              v-model="isCheckedAll"
              class="checkbox"
              @change="toggleAllCheckboxes"
          />
        </th>
        <th>{{ t('file-table-column.permission') }}</th>
        <th>{{ t('file-table-column.owner') }}</th>
        <th>{{ t('file-table-column.group') }}</th>
        <th>{{ t('file-table-column.size') }}</th>
        <th>{{ t('file-table-column.last-modified') }}</th>
        <th>{{ t('file-table-column.replication') }}</th>
        <th>{{ t('file-table-column.block-size') }}</th>
        <th>{{ t('file-table-column.name') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="file in currentFiles" :key="file.path">
        <td>
          <input
              type="checkbox"
              class="checkbox"
              v-model="checkedFilePathList"
              :value="file.path"
          />
        </td>
        <td class="text-base">{{ file.permission }}</td>
        <td class="text-base">{{ file.owner }}</td>
        <td class="text-base">{{ file.group }}</td>
        <td class="text-base">{{ file.length }} B</td>
        <td class="text-base">{{ formatDate(file.modificationTime) }}</td>
        <td class="text-base">{{ file.blockReplication }}</td>
        <td class="text-base">{{ formatBlockSize(file.blockSize) }}</td>
        <td class="text-base">
          <component
              :is="file.dir ? 'router-link' : 'label'"
              :to="file.dir ? { path: '/explore', query: { path: encodeURIComponent(file.path) } } : undefined"
              :for="!file.dir ? file.path : undefined"
              class="link link-primary"
              @click="!file.dir && handleFileClick(file)"
          >
            {{ file.name }}
          </component>

          <FileDetail
              v-if="showDetails[file.name]"
              :file="file"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>