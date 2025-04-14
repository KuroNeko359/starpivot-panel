<script setup lang="ts">
import {computed, type PropType} from "vue";
import {
  getValueFormatByType,
  type ValueAndType,
  MapDataTypes
} from "@/components/pages/hadoop/overview-page/overview-map/overview-map.ts";


let props = defineProps({
  data: {
    type: Object as PropType<Record<string, ValueAndType>>,
    required: true,
  }
});


const keys = computed(() => Object.keys(props.data));

console.log(props.data)


</script>

<template>
  <div class="overflow-x-auto  border border-base-content/5 bg-base-100">
    <table class="table">
      <tbody>
      <tr v-if="keys.length > 0" v-for="key in keys" :key="key">
        <th>{{ key }}:</th>
        <td>{{ getValueFormatByType(props.data[key]) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>