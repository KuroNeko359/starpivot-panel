import apiClient from "./index.ts";
import api from "./index.ts";
// 在上传文件时 200-599 都视为成功
const validateStatus = (status: number) => {
    return status >= 200 && status < 600;
}

const formDataConfig = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    maxBodyLength: 117003161 * 2, // 100MB
    validateStatus
}

const hadoopFileSystemApi = {
    /**
     * 上传文件
     * @param file 关于文件的FormData
     */
    uploadFile(file: FormData) {
        return apiClient.post('/hdfs/upload-file', file, formDataConfig);
    },
    /**
     * 创建文件夹
     * @param currentPath 当前目录
     * @param directoryName 文件夹名
     */
    mkdir(currentPath: string, directoryName: string) {

        let params = new FormData();
        let directoryPath = currentPath === '/' ? `/${directoryName}` : `${currentPath}/${directoryName}`;
        params.append("path", directoryPath);
        console.log(params);
        return apiClient.post('/hdfs/mkdir', params, formDataConfig);
    },
    /**
     * 从HDFS获取文件列表
     * @param path HDFS中的文件路径
     */
    getFiles(path: string) {
        let formData = new FormData();
        formData.append("path", path);
        return apiClient.post('/hdfs/files', formData);
    },
    /**
     * 获取文件头
     * @param path HDFS中文件路径
     */
    getFileHead(path: string) {
        const params = {"path": path};
        return apiClient.get('/hdfs/file-head', {params});
    },
    /**
     * 获取文件尾
     * @param path HDFS中文件路径
     */
    getFileTail(path: string) {
        const params = {"path": path};
        return apiClient.get('/hdfs/file-tail', {params});
    },
    /**
     * 获取文件内容
     * @param path HDFS中文件路径
     */
    getFileContent(path: string) {
        const params = {"path": path};
        return apiClient.get('/hdfs/file-content', {params});
    },
    /**
     * 删除文件
     */
    //TODO 暂时没有删除文件夹的接口
    deleteFile(path: string) {
        const params = new FormData();
        params.append("path", path)
        console.log(params)
        return apiClient.post('/hdfs/delete-file', params, formDataConfig);
    },
    //TODO 未实现
    deleteDirectory(path: string) {
        const params = new FormData();
        params.append("path", path)
        return apiClient.post('/hdfs/delete-directory', params, formDataConfig);
    },
    fileExist(path: string) {
        const params = {'path': path};
        return apiClient.get('/hdfs/file-exist' , { params });
    },
    getLogs(logName: string) {
        return apiClient.get(`/logs/${logName}`);
    }

}

export default hadoopFileSystemApi;