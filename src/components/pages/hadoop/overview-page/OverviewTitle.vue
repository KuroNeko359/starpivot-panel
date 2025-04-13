<script setup lang="ts">
let props = defineProps({
  content: {
    required: true,
    type: String
  }
});
</script>

<template>
  <div class="justify-self-start py-4">
    <p class="text-4xl">{{ props.content }}
      <slot></slot>
    </p>
  </div>
  <div class="divider"></div>
</template>

<style scoped>

</style>