<script setup lang="ts">
import hadoopNativeServiceApi from "@/api/hadoop-native-service.ts";
import {onMounted, type Ref, ref} from "vue";
import OverviewTitle from "@/components/pages/hadoop/overview-page/OverviewTitle.vue";
import OverviewMap from "@/components/pages/hadoop/overview-page/overview-map/OverviewMap.vue";
import {
  getValueFormatByType,
  MapDataTypes,
  type ValueAndType
} from "@/components/pages/hadoop/overview-page/overview-map/overview-map.ts";

let overviewInfo = ref<Record<string, string>>({});
let overviewTableData = ref<Record<string, ValueAndType>>({});
let summaryTableData = ref<Record<string, ValueAndType>>({});

interface ResponseData {
  beans: Array<Record<string, any>>;
}

interface StorageTypeStatsValue {
  blockPoolUsed: number,
  capacityNonDfsUsed: number,
  capacityRemaining: number,
  capacityTotal: number,
  capacityUsed: number,
  nodesInService: number
}

interface StorageTypeStats {
  value: Array<Record<string, StorageTypeStatsValue>>;
}

interface IResponse {
  nameNodeInfoResponse: ResponseData,
  nameNodeStatusResponse: ResponseData,
  fsNamesystemStateResponse: ResponseData,
  fsNamesystemResponse: ResponseData,
  replicatedBlocksStateResponse: ResponseData,
  ecBlockGroupsStateResponse: ResponseData,
  blockStatsResponse: ResponseData,
  memoryResponse: ResponseData,
}

interface MemoryUsage {
  committed: number,
  init: number,
  max: number,
  used: number,
}

const getProperty = (response: ResponseData, propertyName: string, propertyType: MapDataTypes) => {
  return {value: response["beans"][0][propertyName], type: propertyType};
}

const getJmx = async () => {
  let responses = await sendRequest();
  updateOverviewInfo(overviewInfo, responses);
  updateOverviewData(overviewTableData, responses);
  updateSummaryData(summaryTableData, responses);
}

//集中发送请求
const sendRequest = async () => {
  ///jmx?qry=Hadoop:service=NameNode,name=NameNodeInfo
  let nameNodeInfoResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "NameNodeInfo")).data;
  ///jmx?qry=Hadoop:service=NameNode,name=NameNodeStatus
  let nameNodeStatusResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "NameNodeStatus")).data;
  ///jmx?qry=Hadoop:service=NameNode,name=FSNamesystemState
  let fsNamesystemStateResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "FSNamesystemState")).data;
  //http://hadoop102:9870/jmx?qry=Hadoop:service=NameNode,name=FSNamesystem
  let fsNamesystemResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "FSNamesystem")).data;
  console.log(fsNamesystemResponse);
  let replicatedBlocksStateResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "ReplicatedBlocksState")).data;
  let ecBlockGroupsStateResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "ECBlockGroupsState")).data;
  let blockStatsResponse = (await hadoopNativeServiceApi
      .getJmx("Hadoop:service=NameNode", null, "BlockStats")).data;
  let memoryResponse = (await hadoopNativeServiceApi
      .getJmx("java.lang:type=Memory", null, null)).data;
  let responses: IResponse = {
    nameNodeInfoResponse,
    nameNodeStatusResponse,
    fsNamesystemStateResponse,
    fsNamesystemResponse,
    replicatedBlocksStateResponse,
    ecBlockGroupsStateResponse,
    blockStatsResponse,
    memoryResponse
  };
  return responses;
}

const updateOverviewInfo = (overviewInfo: Ref<Record<string, any>>, response: IResponse) => {
  overviewInfo.value["HostAndPort"] = getProperty(response.nameNodeStatusResponse, "HostAndPort", MapDataTypes.STRING).value;
  overviewInfo.value["NameNodeStatus"] = getProperty(response.nameNodeStatusResponse, "State", MapDataTypes.STRING).value;
}

const updateOverviewData = (overviewTableData: Ref<Record<string, any>>, response: IResponse) => {
  overviewTableData.value["Started"] =
      getProperty(response.nameNodeInfoResponse, "NNStartedTimeInMillis", MapDataTypes.TIMESTAMP);
  overviewTableData.value["Version"] =
      getProperty(response.nameNodeInfoResponse, "Version", MapDataTypes.STRING);
  overviewTableData.value["Compiled"] =
      getProperty(response.nameNodeInfoResponse, "CompileInfo", MapDataTypes.STRING);
  overviewTableData.value["Cluster ID"] =
      getProperty(response.nameNodeInfoResponse, "ClusterId", MapDataTypes.STRING);
  overviewTableData.value["Block Pool ID"] =
      getProperty(response.nameNodeInfoResponse, "BlockPoolId", MapDataTypes.STRING);
}

const updateSummaryData = (summaryTableData: Ref<Record<string, any>>, response: IResponse) => {
  summaryTableData.value["Security"] =
      getProperty(response.nameNodeStatusResponse, "SecurityEnabled", MapDataTypes.MODE_BOOLEAN);
  summaryTableData.value["Safemode"] =
      getProperty(response.nameNodeInfoResponse, "Safemode", MapDataTypes.MODE_BOOLEAN);
  summaryTableData.value["Files and Directories"] =
      getProperty(response.fsNamesystemResponse, "FilesTotal", MapDataTypes.NUMBER);
  summaryTableData.value["Blocks"] =
      getProperty(response.fsNamesystemResponse, "BlocksTotal", MapDataTypes.NUMBER);



  let memoryUsage: MemoryUsage
      = getProperty(response.memoryResponse, "HeapMemoryUsage", MapDataTypes.OBJECT).value;
  summaryTableData.value["Head Memory Used"] = {value: memoryUsage.used, type: MapDataTypes.MB};
  summaryTableData.value["Head Memory Total"] = {value: memoryUsage.committed, type: MapDataTypes.MB};
  let nonHeapMemoryUsage: MemoryUsage
      = getProperty(response.memoryResponse, "NonHeapMemoryUsage", MapDataTypes.OBJECT).value;
  summaryTableData.value["Non Head Memory Used"] = {value: nonHeapMemoryUsage.used, type: MapDataTypes.MB};
  summaryTableData.value["Non Head Memory Total"] = {value: nonHeapMemoryUsage.committed, type: MapDataTypes.MB};
  console.log(memoryUsage);
  console.log(nonHeapMemoryUsage);
  summaryTableData.value["Total Capacity"]
      = getProperty(response.fsNamesystemResponse, "CapacityTotal", MapDataTypes.GB);
  summaryTableData.value["DFS Used"]
      = getProperty(response.fsNamesystemResponse, "CapacityUsed", MapDataTypes.GB);
  summaryTableData.value["Non DFS Used"]
      = getProperty(response.fsNamesystemResponse, "CapacityUsedNonDFS", MapDataTypes.GB);
  summaryTableData.value["DFS Remaining"]
      = getProperty(response.fsNamesystemResponse, "CapacityRemaining", MapDataTypes.GB);
  let storageTypeStatsValue: StorageTypeStatsValue
      = getProperty(response.blockStatsResponse, "StorageTypeStats",MapDataTypes.OBJECT).value[0]["value"];
  summaryTableData.value["Block Pool Used"] = {value: storageTypeStatsValue.blockPoolUsed, type: MapDataTypes.GB};

  //Live Nodes
  let liveNodes: Object = JSON.parse(getProperty(response.nameNodeInfoResponse, "LiveNodes",MapDataTypes.STRING).value);
  summaryTableData.value["Live Nodes"] = {value: Object.keys(liveNodes).length, type: MapDataTypes.NUMBER};
  //Dead Nodes
  let deadNodes: Object = JSON.parse(getProperty(response.nameNodeInfoResponse, "DeadNodes",MapDataTypes.STRING).value);
  summaryTableData.value["Dead Nodes"] = {value: Object.keys(deadNodes).length, type: MapDataTypes.NUMBER};
  //Decommissioning Nodes
  let decomNodes: Object = JSON.parse(getProperty(response.nameNodeInfoResponse, "DecomNodes",MapDataTypes.STRING).value);
  summaryTableData.value["Decommissioning Nodes"] = {value: Object.keys(decomNodes).length, type: MapDataTypes.NUMBER};
  //Entering Maintenance Nodes
  let enteringMaintenanceNodes: Object = JSON.parse(getProperty(response.nameNodeInfoResponse, "EnteringMaintenanceNodes",MapDataTypes.STRING).value);
  summaryTableData.value["Decommissioning Nodes"] = {value: Object.keys(enteringMaintenanceNodes).length, type: MapDataTypes.NUMBER};

  summaryTableData.value["Number of Under-Replicated Blocks"] = getProperty(response.replicatedBlocksStateResponse, "LowRedundancyReplicatedBlocks", MapDataTypes.NUMBER);

}

onMounted(() => {
  getJmx();
})

</script>

<template>
  <div class="grid grid-flow-row-dense grid-cols-6 grid-rows-6">
    <div class="col-span-1">
    </div>
    <div class="col-span-4">

      <overview-title content="Overview">
          <span class="text-sm">
            '{{ overviewInfo["HostAndPort"] }}'
            ({{ overviewInfo["NameNodeStatus"] }})
          </span>
      </overview-title>

      <overview-map :data="overviewTableData"></overview-map>

      <overview-title content="Summary"/>

      <overview-map :data="summaryTableData"></overview-map>
      <!--TODO 还有两个表格未完成-->
    </div>
    <div class="col-span-1"></div>
  </div>

</template>

<style scoped>

</style>