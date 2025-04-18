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

// 文件上传 用于控制是否进行文件上传
const uploadFile = async () => {
  let isFileExist = await verifyFileExist();
  console.log(isFileExist)
  if (!isFileExist) {
    console.log("Updating file..")
    await handleUploadFile();
  }
}
// TODO 解决一下文件长度是1024整数倍的问题
const verifyFileExist = async () => {
  console.log(selectedFile.value?.name)
  const separator = props.path.endsWith('/') ? '' : '/';
  const fullPath = `${props.path}${separator}${selectedFile.value?.name}`;
  let fileExistResponse = await hadoopFileSystemApi.fileExist(fullPath);
  if (fileExistResponse.data.statusCode === 200) {
    console.log(fileExistResponse.data)
    fileSystemStore.updateStore(fileExistResponse);
    return true;
  }
  return false;
}

// 处理文件上传的方法
const handleUploadFile = async () => {
  if (!selectedFile.value) {
    console.error('No file selected');
    return;
  }

  //防止双击
  if (isUploading.value) return;
  isUploading.value = true;

  try {

    let chunks = fileSlice(selectedFile.value, 1024 * 1024 * 10);
    for (const chunk of chunks) {
      const formData = new FormData()
      // formData.append('file', selectedFile.value)
      formData.append('path', props.path)
      formData.append('fileName', selectedFile.value?.name)
      formData.append('file', chunk)
      console.log("chunk.size:"+chunk.size)
      const response = await hadoopFileSystemApi.uploadFile(formData)
      //更新store
      fileSystemStore.updateStore(response)
    }
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

// 文件切片
const fileSlice = (file: File, partSize: number) => {
  let start = 0;
  let chunks = [];
  while (start < file.size) {
    // 动态计算end位置，防止超出文件范围
    const end = Math.min(start + partSize, file.size);
    chunks.push(file.slice(start, end));
    start = end; // 移动start到下一个分片起始位置
  }
  return chunks;
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