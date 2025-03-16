<script setup lang="ts">
import BreadcurmbsNode from "./BreadcurmbsNode.vue";
import {pathStringToList} from "@/utils/domain.ts";

let props = defineProps({
  path: {
    type: String,
    required: true,
  }
})

let filePathList = pathStringToList(props.path);

</script>

<template>
  <div class="breadcrumbs text-sm" >
    <ul class="">
      <!--      &lt;!&ndash;      根目录&ndash;&gt;-->
      <breadcurmbs-node
          title="/"
          :directory-index="0"
          :directory-list="['']"
      ></breadcurmbs-node>

      <!--      子目录-->
      <breadcurmbs-node
          :directory-list="filePathList"
          :directory-index="index"
          :title="filePathList[index]"
          :key="index"
          v-for="(_,index) in filePathList"
      ></breadcurmbs-node>

    </ul>
  </div>
</template>

<style scoped>

</style>