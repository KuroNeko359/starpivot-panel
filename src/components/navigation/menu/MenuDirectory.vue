<script setup lang="ts">
let props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    Boolean,
    default: false,
  }
});
</script>

<template>
  <li>
    <details :open="isOpen">
      <summary>{{ props.title }}</summary>
      <ul>
        <slot></slot>
      </ul>
    </details>
  </li>
</template>

<style scoped>

</style>