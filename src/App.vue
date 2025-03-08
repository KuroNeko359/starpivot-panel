<script setup lang="ts">
import MenuContainer from "@/components/container/MenuContainer.vue";
import NavBar from "@/components/navigation/NavBar.vue";
import MainContainer from "@/components/container/MainContainer.vue";
import Test from "@/components/Test.vue";
import FileSystemPage from "@/components/pages/file-system/FileSystemPage.vue";
import {useRoute} from "vue-router";
import {setupLanguage} from "@/i18n/language-utils.ts";

let route = useRoute();

setupLanguage()

</script>

<template>
  <!-- Sidebar content here -->

  <main-container>
    <!--菜单-->
    <template v-slot:sidebar>
      <menu-container>
      </menu-container>
    </template>

    <template v-slot:navbar>
      <nav-bar>
      </nav-bar>
    </template>
    <template v-slot:content>
      <div class="flex-1 overflow-y-auto py-3 px-3 bg-base-200">
        <router-view :key="route.fullPath"></router-view>

      </div>
    </template>

  </main-container>

</template>

<style scoped>

</style>
