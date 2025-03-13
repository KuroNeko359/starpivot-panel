<script setup lang="ts">
let props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default:""
  }
});
</script>

<template>
  <input type="checkbox" :id="props.name" class="modal-toggle"/>
  <div class="modal" role="dialog">
    <div class="modal-box">
      <h2 class="card-title">{{ props.title }}</h2>
      <slot>

      </slot>
    </div>
    <label class="modal-backdrop" :for="props.name"></label>
  </div>
</template>

<style scoped>

</style>