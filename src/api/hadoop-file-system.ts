import apiClient from "./index.ts";
import api from "./index.ts";

const hadoopFileSystemApi = {
    /**
     * 上传文件
     * @param file 关于文件的FormData
     */
    uploadFile(file: FormData) {
        return apiClient.post('/hdfs/upload-file', file, {
            headers: {
                'Content-Type': 'multipart/form-data',  // 自动由 FormData 处理，但手动设置也可以
            },
        });
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
    deleteFile(path: string) {
        const params = new FormData();
        params.append("path", path)
        console.log(params)
        return apiClient.post('/hdfs/delete-file', params, {
            headers: {
                'Content-Type': 'multipart/form-data',  // 自动由 FormData 处理，但手动设置也可以
            },
        });
    }

}

export default hadoopFileSystemApi;