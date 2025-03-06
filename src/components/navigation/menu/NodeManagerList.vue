<script setup lang="ts">
import {ref, onMounted} from 'vue';
import MenuItem from "./MenuItem.vue";
import MenuDirectory from "./MenuDirectory.vue";
import hadoopResourceApi from "../../../api/hadoop-resource.ts";
import {useRouter} from "vue-router";


let router = useRouter();

const menuItems = ref<string[]>([]);

onMounted(async () => {

  try {
    const {data} = await hadoopResourceApi.getNodeManagerNodes();
    Object.keys(data).forEach(key => {
      menuItems.value.push(key)
    })
  } catch (error) {
    console.error('Failed to fetch node manager nodes:', error);
  }
});


function navigateTo(nodeName: string) {
  router.push({name: "NodeManagerInformation", query: {id: nodeName}});
}

</script>

<template>
  <menu-directory title="节点列表">
    <menu-item
        @click="navigateTo(nodeName)"
        v-for="nodeName in menuItems"
        :key="nodeName"
        :title="nodeName"
    ></menu-item>
  </menu-directory>
</template>


<style scoped>

</style>