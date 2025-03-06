<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <ul class="menu rounded-box p-0 w-full min-w-full">
    <li class="menu-title text-left">{{ props.title }}</li>
    <slot>

    </slot>
  </ul>
</template>

<style scoped>

</style>