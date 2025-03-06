import apiClient from "./index.ts";

const hadoopFileSystemApi = {
    uploadFile(file: FormData) {
        return apiClient.post('/hdfs/upload-file', file, {
            headers: {
                'Content-Type': 'multipart/form-data',  // 自动由 FormData 处理，但手动设置也可以
            },
        });
    },
    getFiles(path: string) {
        let formData = new FormData();
        formData.append("path", path)
        return apiClient.post('/hdfs/files', formData);
    },
    // async downloadFile(path: string) {
    //     const params = {"path": path}
    //     let hdfs = await apiClient.get('/hdfs/download-file', {params});
    //     var blob = new Blob([hdfs.data]);
    //     console.log(hdfs.headers);
    //     return hdfs
    // },
    getFileHead(path: string) {
        const params = {"path": path}
        return apiClient.get('/hdfs/file-head', {params})
    }

}

export default hadoopFileSystemApi;