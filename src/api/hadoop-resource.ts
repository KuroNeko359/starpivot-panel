import apiClient from "./index.ts";

const hadoopResourceApi = {
    getNodeManagerNodes(){
        return apiClient.get('/nodemanager/alive');
    },

}

export default hadoopResourceApi;