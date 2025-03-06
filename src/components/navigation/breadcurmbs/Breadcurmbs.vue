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

console.log(filePathList)
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
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


      <!--      <li>-->
      <!--      <span class="inline-flex items-center gap-2">-->
      <!--        <svg-->
      <!--            xmlns="http://www.w3.org/2000/svg"-->
      <!--            fill="none"-->
      <!--            viewBox="0 0 24 24"-->
      <!--            class="h-4 w-4 stroke-current">-->
      <!--          <path-->
      <!--              stroke-linecap="round"-->
      <!--              stroke-linejoin="round"-->
      <!--              stroke-width="2"-->
      <!--              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>-->
      <!--        </svg>-->
      <!--        Add Document-->
      <!--      </span>-->
      <!--      </li>-->
    </ul>
  </div>
</template>

<style scoped>

</style>