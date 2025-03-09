<script setup lang="ts">

import ThemeSwap from "../common/functional/ThemeController.vue";
import IconSingal from "@/components/icons/IconSingal.vue";
import FullScreenController from "../common/functional/FullScreenController.vue";
import {useI18n} from "vue-i18n";
import LanguageController from "@/components/common/functional/LanguageController.vue";

const { t, d, n, tm, locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="navbar p-1 h-10 bg-base-100 shadow-md">
    <div class="flex-none lg:hidden">
      <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-4 w-4 stroke-current">
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </label>
    </div>
    <div class="mx-2 flex-1 px-2"></div>
    <div class=" flex-none lg:block">
      <div class="flex">


        <full-screen-controller></full-screen-controller>
        <theme-swap></theme-swap>
        <language-controller></language-controller>
      </div>
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>

</style>