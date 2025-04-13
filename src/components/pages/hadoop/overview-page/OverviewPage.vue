<script setup lang="ts">
import hadoopNativeServiceApi from "@/api/hadoop-native-service.ts";
import {onMounted, type Ref, ref} from "vue";
import OverviewTitle from "@/components/pages/hadoop/overview-page/OverviewTitle.vue";
import OverviewMap from "@/components/pages/hadoop/overview-page/OverviewMap.vue";
import type {AxiosResponse} from "axios";

let overviewInfo = ref<Record<string, any>>({});
let overviewTableData = ref<Record<string, any>>({});
let summaryTableData = ref<Record<string, any>>({});

interface ResponseData {
  beans: Array<Record<string, any>>;
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

const getProperty = (response: ResponseData, propertyName: string) => {
  return response["beans"][0][propertyName];
}

const getJmx = async () => {
  let responses = await sendRequest();
  console.log(responses.nameNodeInfoResponse);
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
  overviewInfo.value["HostAndPort"] = getProperty(response.nameNodeStatusResponse, "HostAndPort");
  overviewInfo.value["NameNodeStatus"] = getProperty(response.nameNodeStatusResponse, "State");
}

const updateOverviewData = (overviewTableData: Ref<Record<string, any>>, response: IResponse) => {
  overviewTableData.value["Started"] =
      getProperty(response.nameNodeInfoResponse, "NNStartedTimeInMillis");
  overviewTableData.value["Version"] =
      getProperty(response.nameNodeInfoResponse, "Version");
  overviewTableData.value["Compiled"] =
      getProperty(response.nameNodeInfoResponse, "CompileInfo");
  overviewTableData.value["Cluster ID"] =
      getProperty(response.nameNodeInfoResponse, "ClusterId");
  overviewTableData.value["Block Pool ID"] =
      getProperty(response.nameNodeInfoResponse, "BlockPoolId");
}

const updateSummaryData = (summaryTableData: Ref<Record<string, any>>, response: IResponse) => {
  summaryTableData.value["Security"] =
      getProperty(response.nameNodeStatusResponse, "SecurityEnabled");
  summaryTableData.value["Safemode"] =
      getProperty(response.nameNodeInfoResponse, "Safemode");
  summaryTableData.value["Files and Directories"] =
      getProperty(response.fsNamesystemResponse, "FilesTotal");
  summaryTableData.value["Blocks"] =
      getProperty(response.fsNamesystemResponse, "BlocksTotal");
  let memoryUsage: MemoryUsage = getProperty(response.memoryResponse, "HeapMemoryUsage");
  summaryTableData.value["Head Memory Used"] = memoryUsage.used;
  summaryTableData.value["Head Memory Total"] = memoryUsage.committed;


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
            '{{ overviewInfo["HostAndPort"] }}' ({{ overviewInfo["NameNodeStatus"] }})
          </span>
      </overview-title>

      <overview-map :data="overviewTableData"></overview-map>

      <overview-title content="Summary"/>

    </div>
    <div class="col-span-1"></div>
  </div>

</template>

<style scoped>

</style>