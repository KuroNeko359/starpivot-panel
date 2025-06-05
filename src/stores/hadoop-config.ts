import {defineStore} from 'pinia'
import {ref} from "vue";
import type {Property} from "@/entity/entity.ts";


export const useHadoopConfigStore = defineStore('hadoop-config', () => {
    const commonHdfsSite: string[] = ['hadoop.tmp.dir',
        "hadoop.security.authentication",'fs.defaultFS','hadoop.log.dir'];
    const commonYarnSite: string[] = [];
    const commonCoreSite: string[] = [];
    const commonMapredSite: string[] = [];
    let hdfsSite = ref<Property[]>();
    let coreSite = ref<Property[]>();
    let yarnSite = ref<Property[]>();
    let mapredSite = ref<Property[]>();
    let isShowAllOptions = ref<boolean>(false);

    const getHdfsSite = () => {
        if (isShowAllOptions) {
            return hdfsSite.value;
        } else {
            let list = hdfsSite.value?.filter(item =>
                commonHdfsSite.some(commonItem => commonItem === item.name)
            ) ?? [];
            console.log(list);
            return list;
        }
    }

    return {
        hdfsSite,
        coreSite,
        yarnSite,
        mapredSite,
        isShowAllOptions,
        getHdfsSite,
        commonCoreSite,
        commonYarnSite,
        commonHdfsSite,
        commonMapredSite
    }
})