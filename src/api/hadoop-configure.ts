import apiClient from "./index.ts";
import type {Property} from "@/entity/entity.ts";


const hadoopConfigureApi = {
    setupCoreSite(properties: Property[]) {
        console.log(properties);
        return apiClient.post(`/hadoop-configure/core-site-configure`, properties);
    },
    setupHdfsSite(properties: Property[]) {
        console.log(properties);
        return apiClient.post(`/hadoop-configure/hdfs-site-configure`, properties);
    },
    setupYarnSite(properties: Property[]) {
        console.log(properties);
        return apiClient.post(`/hadoop-configure/yarn-site-configure`, properties);
    },
    setupMapredSite(properties: Property[]) {
        console.log(properties);
        return apiClient.post(`/hadoop-configure/mapred-site-configure`, properties);
    },
    getDefaultCoreSite() {
        return apiClient.get('/hadoop-configure/core-default-configurations')
    },
    getDefaultHdfsSite() {
        return apiClient.get(`/hadoop-configure/hdfs-default-configurations`)
    },
    getDefaultYarnSite() {
        return apiClient.get(`/hadoop-configure/yarn-default-configurations`)
    },
    getDefaultMapredSite() {
        return apiClient.get(`/hadoop-configure/mapred-default-configurations`)
    }
}

export default hadoopConfigureApi;