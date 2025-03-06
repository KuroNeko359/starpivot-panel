import {ref} from "vue";
import hadoopFileSystemApi from "../../../../api/hadoop-file-system.ts";

let file = ref<File | null>(null);

// 上传文件
const uploadFile = async () => {
    if (!file.value) {
        alert("请选择文件");
        return;
    }

    const formData = new FormData();
    formData.append("file", file.value);

    try {
        // 这里假设你的 API 需要 FormData 进行上传
        const response = await hadoopFileSystemApi.uploadFile(formData);
        console.log("上传成功:", response);
    } catch (error) {
        console.error("上传失败:", error);
    }
}

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        file.value = target.files[0]; // Update the ref's value
        console.log("File selected:", file.value);
    }
}

export default {handleFileChange, uploadFile}
