<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: false,
    default: ""
  }
});
</script>

<template>
  <li>
    <router-link class="text-left" :to="props.route">
      {{ props.title }}
    </router-link>
  </li>
</template>

<style scoped>

</style>