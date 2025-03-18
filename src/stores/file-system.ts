import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {AxiosResponse} from "axios";
import type {FileInfo} from "@/components/pages/file-system/ts/file-system.ts";

interface Response {
    data: string,
    statusCode: number
}

/**
 * 创建一个fileSystemStore
 * 用于对于复杂的filesystem组件中的组件传参
 */
export const useFileSystemStore = defineStore('file-system-store', () => {
    /**
     * 被选中的文件列表
     */
    const checkedFilePathList = ref<FileInfo[]>()
// Define a default AxiosResponse-like object
    const defaultResponse: AxiosResponse<any, any> = {
        data: new Response(), // or some default data like an empty object: {}
        status: 0,
        statusText: '',
        headers: {},
        config: {} as any,
    };

    /**
     * 发送请求返回的response
     */
    let response = ref<AxiosResponse<any, any>>(defaultResponse);

    /**
     * 显示状态栏
     */
    let isAlertShow = computed(() => {
        return response.value.status !== 0;
    })

    /**
     *
     */
    const getResponseData = () => {
        return response.value.data
    }

    /**
     * 根据请求计算Alert框的内容
     */
    const alertContent = computed(() => {
        return getResponseData().data;
    })

    /**
     * 根据请求计算Alert的颜色
     */
    const alertMode = computed(() => {
        if (getResponseData().statusCode == 200) {
            return "alert-success";
        }
        return "alert-error";
    })

    /**
     * 更新Store中的Response
     */
    const updateStore = (inputResponse: AxiosResponse) => {
        response.value = inputResponse;
        // isAlertShow.value = true;
    }

    /**
     * 重置Store
     */
    const resetStore = () => {
        response.value = defaultResponse;
    }

    return {
        checkedFilePathList,
        response,
        isAlertShow,
        alertContent,
        alertMode,
        updateStore,
        resetStore
    }
})
