<script setup lang="ts">
import {ref} from 'vue'
import Modal from '@/components/common/modal/Modal.vue'
import {getT} from '@/i18n/language-utils.ts'
import hadoopFileSystemApi from '@/api/hadoop-file-system.ts'
import {useFileSystemStore} from "@/stores/file-system.ts";
import type {AxiosResponse} from "axios";

// 类型定义
interface Props {
  path: string
  refreshPageFunction: () => void
}

// Props 定义
const props = defineProps<Props>()

// 状态
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isUploading = ref(false)
let fileSystemStore = useFileSystemStore();
const t = getT()

// 文件选择处理
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  selectedFile.value = target.files?.[0] ?? null
}

// 文件上传
const uploadFile = async () => {
  if (!selectedFile.value) {
    console.error('No file selected')
    return
  }

  if (isUploading.value) return

  isUploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('path', props.path)

    const response = await hadoopFileSystemApi.uploadFile(formData)
    console.log('Upload successful:', response)
    //更新store
    fileSystemStore.updateStore(response)
    // 重置状态
    resetForm()
    props.refreshPageFunction()
  } catch (error) {
    console.error('Upload failed:', error)
    throw error // 让调用者可以处理错误
  } finally {
    isUploading.value = false
  }
}



// 重置表单
const resetForm = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <modal name="upload-file" :title="t('upload-file.upload-file')">
    <div class="upload-container">
      <input
          ref="fileInput"
          type="file"
          class="file-input"
          :disabled="isUploading"
          @change="handleFileChange"
      />
      <button
          class="btn btn-primary"
          :disabled="!selectedFile || isUploading"
          @click="uploadFile"
      >
        {{ t('upload-file.upload') }}
      </button>
    </div>
  </modal>
</template>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.file-input {
  width: 100%;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>