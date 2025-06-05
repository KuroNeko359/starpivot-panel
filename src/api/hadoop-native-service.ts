import apiClient from "@/api/index.ts";

const hadoopNativeServiceApi = {
    getComponent(componentName: string) {
        return apiClient.get(`/components/${componentName}`);
    },
    getJmx(qry?: string | null, get?: string | null, name?: string | null) {
        let params: { [key: string]: string } = {};
        if (qry !== undefined && qry !== null) {
            params["qry"] = qry;
        }
        if (name !== undefined && name !== null) {
            params["name"] = name;
        }
        if (get !== undefined && get !== null) {
            params["get"] = get;
        }

        return apiClient.get("jmx", {params});
    }
}

export default hadoopNativeServiceApi;