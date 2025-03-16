<script setup lang="ts">

import Card from "@/components/common/Card.vue";
import PrimaryButton from "@/components/common/button/PrimaryButton.vue";
import FileSystemPanel from "@/components/pages/file-system/FileSystemPanel.vue";
import Modal from "@/components/common/modal/Modal.vue";
import upload from "@/components/pages/file-system/ts/upload.ts";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";

import FileSystemView from "./view/FileSystemView.vue";
import {getT} from "@/i18n/language-utils.ts";

/**
 * 路由
 */
const route = useRoute();
/**
 * 编码的Path
 */
let encodeFilePath = ref<string>(route.query.path as string || '/');

/**
 * 对Path的解码
 */
let filePath = decodeURIComponent(encodeFilePath.value);

/**
 * 使用t进行i18n国际化
 */
let t = getT();

/**
 * 用于更新key来刷新组件
 */
let refreshKey = ref(0);
const refreshPanel = () => {
  refreshKey.value += 1;
}

</script>

<template>
  <card :title="t('file-system')" class="w-full">
    <FileSystemPanel :refreshFunction="refreshPanel" :key="refreshKey" :path="filePath"></FileSystemPanel>
  </card>
</template>

<style scoped>

</style>