<script setup lang="ts">
import { ref } from 'vue';
import Modal from "@/components/common/modal/Modal.vue";
import { getT } from "@/i18n/language-utils.ts";
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";

const t = getT();

// 定义 props
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  refreshPageFunction: {
    type: Function,
    required: true,
  }
})

// 文件输入引用和选中的文件
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

// 处理文件选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

// 上传文件
const uploadFile = async () => {
  if (!selectedFile.value) {
    console.error('No file selected');
    return;
  }

  try {
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('path', props.path);

    // 调用 API 上传文件
    console.log(formData.get("file"));
    const response = await hadoopFileSystemApi.uploadFile(formData);
    console.log('Upload successful:', response);

    // 上传成功后重置
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    //重置后 调用refresh刷新Page
    props.refreshPageFunction();
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
</script>

<template>
  <modal name="upload-file" :title="t('upload-file.upload-file')">
    <div class="upload-container">
      <input
          ref="fileInput"
          type="file"
          class="file-input"
          @change="handleFileChange"
      />
      <label
          class="btn btn-primary"
          for="upload-file"
          @click="uploadFile"
      >
        {{ t('upload-file.upload') }}
      </label>

    </div>
  </modal>
</template>

<style scoped>

</style>