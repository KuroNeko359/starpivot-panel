<script setup lang="ts">

import ContentContainer from "./ContentContainer.vue";
</script>

<template>


  <div class="drawer lg:drawer-open">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle"/>

    <div class="drawer-content">
      <content-container>
        <!-- 导航栏 -->
        <template v-slot:navbar>
          <slot name="navbar"></slot>
        </template>
        <!-- 页面内容 -->
        <template v-slot:content>
          <slot name="content"></slot>
        </template>

      </content-container>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>

        <!-- 侧边栏-->
        <slot name="sidebar">

        </slot>

    </div>
  </div>
</template>

<style scoped>

</style>