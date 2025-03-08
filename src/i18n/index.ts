import {createI18n, useI18n} from 'vue-i18n'
import en from './locales/en/en.ts'
import zh from './locales/zh/zh.ts'
import {onMounted} from "vue";


export enum Language {
    EN = 'en',
    ZH = 'zh',
}

const messages = {
    en,
    zh
}



const i18n = createI18n({
    legacy: false, // 使用 Composition API
    locale: Language.ZH, // 默认语言
    fallbackLocale: Language.EN, // 回退语言
    messages
})

export default i18n