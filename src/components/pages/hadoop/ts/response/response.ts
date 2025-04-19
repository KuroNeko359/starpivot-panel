import {MapDataTypes} from "@/components/pages/hadoop/overview-page/overview-map/overview-map.ts";

export interface ResponseData {
    beans: Array<Record<string, any>>;
}

export interface StorageTypeStatsValue {
    blockPoolUsed: number,
    capacityNonDfsUsed: number,
    capacityRemaining: number,
    capacityTotal: number,
    capacityUsed: number,
    nodesInService: number
}

export interface StorageTypeStats {
    value: Array<Record<string, StorageTypeStatsValue>>;
}

export interface IResponse {
    nameNodeInfoResponse: ResponseData,
    nameNodeStatusResponse: ResponseData,
    fsNamesystemStateResponse: ResponseData,
    fsNamesystemResponse: ResponseData,
    replicatedBlocksStateResponse: ResponseData,
    ecBlockGroupsStateResponse: ResponseData,
    blockStatsResponse: ResponseData,
    memoryResponse: ResponseData,
}

export interface MemoryUsage {
    committed: number,
    init: number,
    max: number,
    used: number,
}

export interface DataNodeResource {
    infoAddr: string;
    infoSecureAddr: string;
    xferaddr: string;
    lastContact: number;
    usedSpace: number;
    adminState: string;
    nonDfsUsedSpace: number;
    capacity: number;
    numBlocks: number;
    version: string;
    used: number;
    remaining: number;
    blockScheduled: number;
    blockPoolUsed: number;
    blockPoolUsedPercent: number;
    volfails: number;
    lastBlockReport: number;
}

export function getProperty(response: ResponseData, propertyName: string, propertyType: MapDataTypes) {
    return {value: response["beans"][0][propertyName], type: propertyType};
}

