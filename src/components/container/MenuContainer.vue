<script setup lang="ts">
// 导入所需的组件和工具
import LogoButton from "@/components/common/button/LogoButton.vue"; // 导入带有Logo的按钮组件
import CollapsibleSubmenu from "@/components/navigation/menu/CollapsibleSubmenu.vue"; // 导入可折叠子菜单组件
import JoinComponent from "@/components/layout/JoinComponent.vue"; // 导入布局连接组件
import MenuItem from "@/components/navigation/menu/MenuItem.vue"; // 导入单个菜单项组件
import MenuDirectory from "@/components/navigation/menu/MenuDirectory.vue"; // 导入菜单目录组件
import NodeManagerList from "@/components/navigation/menu/NodeManagerList.vue"; // 导入节点管理列表组件
import {useI18n} from "vue-i18n"; // 导入国际化工具，用于多语言支持

// 初始化国际化功能，解构出 t 函数用于翻译
let {t} = useI18n();
</script>

<template>
  <!-- 主菜单容器，使用无序列表(ul)实现，应用基础样式和布局 -->
  <ul class="menu bg-base-100 min-h-full w-54 p-4">
    <!-- 顶部Logo按钮 -->
    <logo-button/>

    <!-- 布局连接组件，包裹主要的菜单内容 -->
    <join-component>
      <!-- 第一个可折叠子菜单，标题通过国际化获取 -->
      <collapsible-submenu :title="t('components.menu.index.title')">
        <!-- 主页菜单项，包含标题和路由 -->
        <menu-item
            :title="t('components.menu.index.home-page')"
            route="/home">
        </menu-item>

        <!-- 集群资源目录，包含嵌套的菜单项 -->
        <menu-directory
            :title="t('components.menu.index.cluster-resource.title')">
          <!-- 资源面板菜单项 -->
          <menu-item
              :title="t('components.menu.index.cluster-resource.resource-panel')"
              route="/resource">
          </menu-item>

          <!-- 节点管理列表组件 -->
          <menu-directory
              :title="t('components.menu.index.cluster-resource.node-list')">
            <node-manager-list></node-manager-list>
          </menu-directory>


          <!-- 文件系统菜单项 -->
          <menu-item
              :title="t('components.menu.index.cluster-resource.file-system')"
              route="/explore">
          </menu-item>
        </menu-directory>
      </collapsible-submenu>

      <!-- 第二个可折叠子菜单，用于管理功能，目前为空 -->
      <collapsible-submenu :title="t('components.menu.management.title')">
      </collapsible-submenu>
    </join-component>
  </ul>
</template>

<style scoped>
/* 这里可以添加特定于此组件的CSS样式，目前为空 */
</style>