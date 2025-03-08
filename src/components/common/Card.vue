<script setup lang="ts">

import MemoryPie from "./charts/MemoryPie.vue";
import Pie from "./charts/Pie.vue";
import {ref} from "vue";

let paragraph = ref("");

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: false,
    default: ""
  }
});
</script>

<template>
  <div class="card w-96 bg-base-100 card-sm shadow-sm m-1">
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p>{{ props.paragraph }}</p>
      <slot></slot>

    </div>
  </div>
</template>

<style scoped>

</style>