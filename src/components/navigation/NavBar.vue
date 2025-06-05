<script setup lang="ts">

import ThemeSwap from "../common/functional/ThemeController.vue";
import IconSingal from "@/components/icons/IconSingal.vue";
import FullScreenController from "../common/functional/FullScreenController.vue";
import {useI18n} from "vue-i18n";
import LanguageController from "@/components/common/functional/LanguageController.vue";
import LogoButton from "@/components/common/button/LogoButton.vue";
import DropDown from "@/components/common/functional/DropDown.vue";

const { t, d, n, tm, locale } = useI18n({ useScope: 'global' })

let props = defineProps({
  isLogin: {
    type: Boolean,
    required: false,
    default: true
  },
  isShowTitle: {
    type: Boolean,
    required: false,
    default: false
  }
});
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
    <logo-button v-if="props.isShowTitle"/>
    <div class="mx-2 flex-1 px-2"></div>
    <div class=" flex-none lg:block">
      <div class="flex">
        <full-screen-controller></full-screen-controller>
        <theme-swap></theme-swap>
        <language-controller></language-controller>

        <drop-down>
          <template v-slot:icon>
            <div class="w-12 h-12 p-1 mr-4" v-if="props.isLogin">
              <div class="avatar avatar-online">
                <div class="rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                </div>
              </div>
            </div>
          </template>
          <template v-slot:dropdown>
            <li>
              <button>Logout</button>
            </li>
          </template>
        </drop-down>
      </div>
      <slot></slot>
    </div>
  </div>

</template>

<style scoped>

</style>