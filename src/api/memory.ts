import apiClient from "./index.ts";

const memoryApi = {
    getMemory() {
        return apiClient.get('/system/resource/memory');
    },

}

export default memoryApi;