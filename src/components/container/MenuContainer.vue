<script setup lang="ts">

import LogoButton from "@/components/common/button/LogoButton.vue";
import CollapsibleSubmenu from "@/components/navigation/menu/CollapsibleSubmenu.vue";
import JoinComponent from "@/components/layout/JoinComponent.vue";
import MenuItem from "@/components/navigation/menu/MenuItem.vue";
import MenuDirectory from "@/components/navigation/menu/MenuDirectory.vue";
import NodeManagerList from "@/components/navigation/menu/NodeManagerList.vue";
</script>

<template>

  <ul class="menu bg-base-100 min-h-full w-54 p-4">
    <logo-button/>
    <join-component>
      <collapsible-submenu title="首页">
        <menu-item title="主页" route="/home">
        </menu-item>
        <menu-directory title="集群资源">
          <menu-item title="资源面板" route="/resource">
          </menu-item>
          <node-manager-list></node-manager-list>
          <menu-item title="文件系统" route="/explore"></menu-item>
        </menu-directory>
      </collapsible-submenu>
      <collapsible-submenu title="管理">
      </collapsible-submenu>
    </join-component>
  </ul>
</template>

<style scoped>

</style>