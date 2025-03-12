<script setup lang="ts">

import IconDelete from "@/components/icons/IconDelete.vue";
import {useFileSystemStore} from "@/stores/file-system.ts";
let fileSystemStore = useFileSystemStore();

let props = defineProps({
  for: {
    type: String,
    required: true
  }
});

</script>

<template>
  <div>
    <label
        class="btn btn-ghost p-2 border-color-gray"
        :for="props.for"
    >
      <icon-delete></icon-delete>
    </label>
  </div>
</template>

<style scoped>

</style>