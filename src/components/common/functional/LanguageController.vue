<script setup lang="ts">
import IconLanguage from "@/components/icons/language-controller-icon/IconLanguage.vue";
import {Language} from "@/i18n";
import {getLocale, setLocalStorageLanguage} from "@/i18n/language-utils.ts";

let locale = getLocale();

const changeLanguage = (language: Language) => {
  switch (language) {
    case Language.EN:
      locale.value = language;
      setLocalStorageLanguage(Language.EN);
      break;
    case Language.ZH:
      locale.value = language;
      setLocalStorageLanguage(Language.ZH);
      break;
  }
}

</script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end p-2">
    <div tabindex="0" role="button">
      <icon-language></icon-language>
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li>
        <a @click="changeLanguage(Language.EN)">
          <span class="pe-4 font-mono text-[.5625rem] font-bold tracking-[0.09375rem] opacity-40">EN</span>
          English
        </a>
      </li>
      <li>
        <a @click="changeLanguage(Language.ZH)">
          <span class="pe-4 font-mono text-[.5625rem] font-bold tracking-[0.09375rem] opacity-40">ZH</span>
          简体中文
        </a>

      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>