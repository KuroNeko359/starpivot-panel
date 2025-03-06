import config from "./config.ts";
import axios from "axios";

const apiClient = axios.create({
    baseURL: config.baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})

export default apiClient;
