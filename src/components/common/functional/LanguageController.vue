<script setup lang="ts">
import {useI18n} from "vue-i18n";
import LanguageIcon from "@/components/icons/language-controller-icon/LanguageIcon.vue";
import {Language} from "@/i18n";

const {locale} = useI18n();



const changeLanguage = (language: Language) => {
  switch (language) {
    case Language.EN:
      locale.value = language;
      break;
    case Language.ZH:
      locale.value = language;
      break;
  }
}

</script>

<template>
  <div class="dropdown dropdown-bottom dropdown-end p-2">
    <div tabindex="0" role="button">
      <language-icon></language-icon>
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