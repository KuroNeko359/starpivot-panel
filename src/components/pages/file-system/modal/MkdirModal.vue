<script setup lang="ts">
import {ref, watch} from 'vue'
import Modal from '@/components/common/modal/Modal.vue'
import {getT} from '@/i18n/language-utils.ts'
import hadoopFileSystemApi from '@/api/hadoop-file-system.ts'
import {useFileSystemStore} from "@/stores/file-system.ts";

// 类型定义
interface Props {
  path: string
  refreshPageFunction: () => void
}

// Props 定义
const props = defineProps<Props>()

// 状态
const directoryName = ref<string>('');
const isUploading = ref(false)
let fileSystemStore = useFileSystemStore();
const t = getT()


// 创建文件夹
const createDirectory = async () => {
  if (directoryName.value === '') {
    console.error('Directory name is missing.')
    return
  }

  if (isUploading.value) return

  isUploading.value = true
  try {
    const response = await hadoopFileSystemApi.mkdir(props.path, directoryName.value)
    //更新store
    fileSystemStore.updateStore(response)
    // 重置状态
    props.refreshPageFunction()
  } catch (error) {
    console.error('Upload failed:', error)
    throw error // 让调用者可以处理错误
  } finally {
    isUploading.value = false
  }
}

watch(directoryName, () => {
  console.log(directoryName.value)
})
</script>

<template>
  <modal name="mkdir" :title="t('mkdir.create-directory')">
    <div class="upload-container">
      <div class="flex flex-col pt-4">
        <input class="input validator w-full" required v-model="directoryName" :placeholder="t('mkdir.placeholder')"
               pattern="^[a-zA-Z0-9_.\-]{1,255}$"
               :title="t('mkdir.placeholder')"/>
        <p class="validator-hint">{{ t('mkdir.alert') }}</p>
      </div>
      <button
          class="btn btn-primary"
          :disabled="(directoryName === '') || isUploading"
          @click="createDirectory"
      >
        {{ t('mkdir.confirm') }}
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