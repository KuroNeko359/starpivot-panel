import {ref} from "vue";
import hadoopFileSystemApi from "@/api/hadoop-file-system.ts";

let file = ref<File | null>(null);

// 上传文件
const uploadFile = async () => {
    if (!file.value) {
        alert("请选择文件");
        return;
    }


    try {
        // let response;
        // for (let fileChunk of fileChunks) {
        //     const formData = new FormData();
        //     formData.append("file", fileChunk);
        //      response = await hadoopFileSystemApi.uploadFile(formData);
        // }
        let uploadFile = getOne(file.value);
        let formData = new FormData();
        formData.append("file",uploadFile);
        let response = await hadoopFileSystemApi.uploadFile(formData);
        console.log("上传成功:", response);
    } catch (error) {
        console.error("上传失败:", error);
    }
    // formData.append("file", file.value);
    let fileChunks = fileSlice(file.value, 1024 * 1024 * 10);
}

const getOne = (file: File) => {
    return file.slice(0,1024);
}

const fileSlice = (file: File,partSize: number) => {
    let end = partSize;
    let start = 0;
    let chunks = [];
    while (end < file.size) {
        let chunk = file.slice(start,end);
        chunks.push(chunk);
        start = end;
        end += partSize;
    }
    chunks.push(file.slice(start,file.size));
    return chunks;
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        file.value = target.files[0]; // Update the ref's value
        console.log("File selected:", file.value);
    }
}

export default {handleFileChange, uploadFile}
