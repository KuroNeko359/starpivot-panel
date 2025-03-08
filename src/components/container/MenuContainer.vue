<script setup lang="ts">
import LogoButton from "@/components/common/button/LogoButton.vue";
import CollapsibleSubmenu from "@/components/navigation/menu/CollapsibleSubmenu.vue";
import JoinComponent from "@/components/layout/JoinComponent.vue";
import MenuDirectory from "@/components/navigation/menu/MenuDirectory.vue";
import NodeManagerList from "@/components/navigation/menu/NodeManagerList.vue";
import MenuItem from "@/components/navigation/menu/MenuItem.vue";
import {useI18n} from "vue-i18n";


let {t} = useI18n();
</script>

<template>
  <!-- 主菜单容器 -->
  <ul class="menu bg-base-100 min-h-full w-54 p-4">
    <!-- 顶部Logo按钮 -->
    <logo-button/>

    <!-- 布局连接组件，包裹主要的菜单内容 -->
    <join-component>
      <!-- 第一个可折叠子菜单，标题通过国际化获取 -->
      <collapsible-submenu :title="t('menu.index.title')">
        <!-- 主页菜单项，包含标题和路由 -->
        <menu-item
            :title="t('menu.index.home-page')"
            route="/home">
        </menu-item>

        <!-- 集群资源目录，包含嵌套的菜单项 -->
        <menu-directory
            :title="t('menu.index.cluster-resource.title')">
          <!-- 资源面板菜单项 -->
          <menu-item
              :title="t('menu.index.cluster-resource.resource-panel')"
              route="/resource">
          </menu-item>

          <!-- 节点管理列表组件 -->
          <menu-directory
              :title="t('menu.index.cluster-resource.node-list')">
            <node-manager-list></node-manager-list>
          </menu-directory>


          <!-- 文件系统菜单项 -->
          <menu-item
              :title="t('menu.index.cluster-resource.file-system')"
              route="/explore">
          </menu-item>
        </menu-directory>
      </collapsible-submenu>

      <!-- 第二个可折叠子菜单，用于管理功能，目前为空 -->
      <collapsible-submenu :title="t('menu.management.title')">
      </collapsible-submenu>
    </join-component>
  </ul>
</template>

<style scoped>
/* 这里可以添加特定于此组件的CSS样式，目前为空 */
</style>