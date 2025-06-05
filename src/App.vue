<script setup lang="ts">
import MenuContainer from "@/components/container/MenuContainer.vue";
import NavBar from "@/components/navigation/NavBar.vue";
import MainContainer from "@/components/container/MainContainer.vue";
import Test from "@/components/Test.vue";
import FileSystemPage from "@/components/pages/file-system/FileSystemPage.vue";
import {useRoute} from "vue-router";
import {setupLanguage} from "@/i18n/language-utils.ts";
import {onMounted, ref} from "vue";
import hadoopNativeServiceApi from "@/api/hadoop-native-service.ts";
import type {Component} from "@/entity/entity.ts";
import InstallationPage from "@/components/pages/hadoop/setup-page/InstallationPage.vue";

let route = useRoute();

setupLanguage()

let isHadoopOnInstalled = ref(true);
let isLogin = ref(true);
//判断Hadoop是否安装
onMounted( async () => {
  let hadoop: Component = (await hadoopNativeServiceApi.getComponent("hadoop")).data;
  isHadoopOnInstalled.value = hadoop.isInstalled;
  console.log(isHadoopOnInstalled.value);
})
</script>

<template>
  <!-- Sidebar content here -->
  <main-container v-if="!isLogin">
    <!--菜单-->
    <template v-slot:sidebar>

    </template>

    <template v-slot:navbar>
      <nav-bar :is-login="false" :is-show-title="true">
      </nav-bar>
    </template>
    <template v-slot:content>
      <div class="flex-1 overflow-y-auto py-3 px-3 bg-base-200">
        <router-view></router-view>

      </div>
    </template>
  </main-container>
  <main-container v-else-if="isHadoopOnInstalled">
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
  <!-- Sidebar content here -->
  <main-container v-else>
    <!--菜单-->
    <template v-slot:sidebar>
    </template>

    <template v-slot:navbar>
      <nav-bar :is-show-title="true">
      </nav-bar>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>

  </main-container>

</template>

<style scoped>

</style>
