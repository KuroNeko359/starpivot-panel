<script setup lang="ts">
let props = defineProps({
  content: {
    required: true,
    type: String
  },
  size: {
    required: false,
    type: Number,
    default: 4
  }
});
</script>

<template>
  <div class="justify-self-start py-4">
    <p :class="`text-${props.size}xl`">{{ props.content }}
    </p>
  </div>
  <div class="divider"></div>
</template>

<style scoped>

</style>