import apiClient from "./index.ts";

const hadoopResourceApi = {
    /**
     * 获取存活节点
     */
    getNodeManagerNodes(){
        return apiClient.get('/nodemanager/alive');
    },

}

export default hadoopResourceApi;