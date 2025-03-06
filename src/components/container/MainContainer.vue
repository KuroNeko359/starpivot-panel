<script setup lang="ts">

import ContentContainer from "./ContentContainer.vue";
</script>

<template>


  <div class="drawer lg:drawer-open h-[100%]">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle"/>

    <div class="drawer-content flex flex-col ">
      <content-container>
        <!-- Navbar -->
        <template v-slot:navbar>
          <slot name="navbar"></slot>
        </template>
        <!-- Page content here -->
        <template v-slot:content>
          <slot name="content"></slot>
        </template>

      </content-container>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>

        <!-- Sidebar content here -->
        <slot name="sidebar">

        </slot>

    </div>
  </div>
</template>

<style scoped>

</style>