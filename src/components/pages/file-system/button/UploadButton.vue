<script setup lang="ts">

import Modal from "@/components/common/modal/Modal.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconCommunity from "@/components/icons/IconCommunity.vue";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";
import IconEcosystem from "@/components/icons/IconEcosystem.vue";
</script>

<template>
  <div>
    <!-- 上传按钮 -->
    <label
        class="inline-flex items-center rounded-md px-2 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
        for="upload-file"
    >
      <div>
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <path
              d="M40 35v6H8v-6M14.93 17.071L24.001 8l9.071 9.071M24.002 33.142v-25"
              stroke="#4E5969"
              stroke-width="4"
          />
        </svg>
      </div>
    </label>
  </div>
  <modal name="upload-file" title="上传文件">

  </modal>
</template>

<style scoped>

</style>