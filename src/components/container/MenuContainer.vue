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
      <!-- 第一个可折叠子菜单-->
      <collapsible-submenu :title="t('menu.index.title')">
        <!-- 组件页 TODO国际化-->
        <menu-directory title="组件">
          <menu-item title="Hadoop" route="/setup/hadoop">
          </menu-item>
          <menu-item title="HBase" route="/setup/hbase">
          </menu-item>
          <menu-item title="Flink" route="/setup/flink">
          </menu-item>
        </menu-directory>
        <!-- 主页菜单项，包含标题和路由 -->
        <menu-item
            :title="t('menu.index.home-page')"
            route="/home">
        </menu-item>

        <!-- 集群资源目录，包含嵌套的菜单项 -->
        <menu-directory
            :title="t('menu.index.cluster-resource.title')">
          <!--Hadoop菜单-->
          <menu-directory title="Hadoop">
            <menu-item
                title="Overview"
                route="/hadoop/overview">
            </menu-item>
            <menu-item
                title="Datanodes"
                route="/hadoop/datanodes">
            </menu-item>
            <menu-item
                title="Datanode Volume Failures"
                route="/hadoop/datanode-volume-failures">
            </menu-item>
            <menu-item
                title="Snapshot"
                route="/hadoop/snapshot">
            </menu-item>
            <menu-item
                title="Startup Progress"
                route="/hadoop/startup-progress">
            </menu-item>
            <menu-directory title="Utilities">
              <menu-item
                  title="Browse the file system"
                  route="/explore">
              </menu-item>
              <!--TODO除了文件系统，其他功能暂未实现-->
              <menu-item
                  title="Logs"
                  route="/">
              </menu-item>
              <menu-item
                  title="Log level"
                  route="/">
              </menu-item>
              <menu-item
                  title="Log level"
                  route="/">
              </menu-item>
              <menu-item
                  title="Metrics"
                  route="/">
              </menu-item>
              <menu-item
                  title="Process Thead Dump"
                  route="/">
              </menu-item>
            </menu-directory>
          </menu-directory>

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