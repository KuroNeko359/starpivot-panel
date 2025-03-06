<template>

</template>

<script setup lang="ts">
import {} from "vue"
import { onBeforeRouteUpdate } from "vue-router";

onBeforeRouteUpdate( (to, from, next) => {
  // 在路由参数变化时处理逻辑
  // this.loadData();
  // next();
  console.log("路由发生变化")
})
</script>


<style scoped>

</style>