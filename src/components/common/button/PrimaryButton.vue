<script setup lang="ts">
var props = defineProps( {
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <button class="btn btn-primary">{{ props.title }}</button>
</template>

<style scoped>

</style>