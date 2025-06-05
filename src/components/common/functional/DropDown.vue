<script setup lang="ts">

import {Language} from "@/i18n";
import IconLanguage from "@/components/icons/language-controller-icon/IconLanguage.vue";
</script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end">
    <div tabindex="0" role="button">
      <slot name="icon"></slot>
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>

<style scoped>

</style>