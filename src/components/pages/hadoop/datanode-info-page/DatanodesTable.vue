<script setup lang="ts">
import {computed, onMounted, type PropType, watch} from "vue";
import type {ValueAndType} from "@/components/pages/hadoop/overview-page/overview-map/overview-map.ts";
import type {DataNodeResource} from "@/components/pages/hadoop/ts/response/response.ts";

let props = defineProps( {
  nameNodeInfo: {
    type: Object as PropType<Record<string, DataNodeResource>>,
    required: true
  }
});


let nameNodeInfo = computed( () => Object.values(props.nameNodeInfo));
let nodes = computed( () => Object.keys(props.nameNodeInfo));
watch( nameNodeInfo , () => {
  console.log(nameNodeInfo.value);
})

</script>

<template>


  <div class="overflow-x-auto border border-base-content/5 bg-base-100">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th>Node</th>
        <th>Http Address</th>
        <th>Last<br>Contract</th>
        <th>Last<br>Block<br>Report</th>
        <th>Capacity</th>
        <th>Blocks</th>
        <th>Block<br> Pool<br>Used</th>
        <th>Version</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr v-for="(node,index) in nodes">
        <td>{{node}}</td>
        <td><a href="http://hadoop102:9864">http://{{ node }}</a></td>
        <td>{{nameNodeInfo[index]["lastContact"]}}</td>
        <td>{{ nameNodeInfo[index]["lastBlockReport"] }}m</td>
        <th>
          <progress class="progress progress-accent w-40"
                    :value="nameNodeInfo[index]['nonDfsUsedSpace']"
                    :max="nameNodeInfo[index]['capacity']">

          </progress>
        </th>
        <td>{{ nameNodeInfo[index]['numBlocks'] }}</td>
        <td>{{ (nameNodeInfo[index]['used']/1024/1024).toFixed(2) }} MB
        <br>{{(nameNodeInfo[index]['blockPoolUsedPercent']).toFixed(2)}}%</td>
        <td>3.1.3</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>