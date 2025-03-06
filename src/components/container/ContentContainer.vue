<script setup lang="ts">
</script>

<template>
  <div class="flex h-full overflow-hidden border-l border-base-300">
    <div class="flex-1 flex flex-col">
      <div class="border-b border-base-300 border-opacity-50">
        <slot name="navbar"></slot>
      </div>

      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
</style>