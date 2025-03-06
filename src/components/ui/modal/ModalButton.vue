<script setup lang="ts">
let props = defineProps({
  name: {
    type: String,
    required: true
  },

});
</script>

<template>
  <label :for="props.name" class="btn">open modal</label>
</template>

<style scoped>

</style>