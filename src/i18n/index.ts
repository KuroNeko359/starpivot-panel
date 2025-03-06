import {createI18n} from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'
import {onMounted} from "vue";

export enum Language {
    EN = 'en',
    ZH = 'zh',
}

const messages = {
    en,
    zh
}

onMounted(() => {
    //TODO 挂载组件时 自动读取设置的语言
})


const i18n = createI18n({
    legacy: false, // 使用 Composition API
    locale: "zh", // 默认语言
    fallbackLocale: "en", // 回退语言
    messages
})

export default {i18n, Language}