<script setup lang="ts">

let props = defineProps({
  title: {
    type:String,
    required:true
  },
  content: {
    type: String,
    required: false,
  }
});

</script>

<template>
  <div class="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4"/>
    <div class="collapse-title font-semibold">{{ props.title}}</div>
    <div class="collapse-content text-sm">
      {{props.content}}
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>