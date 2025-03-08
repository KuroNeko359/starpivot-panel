import { Language } from "@/i18n/index.ts";
import { useI18n } from "vue-i18n";

/**
 * 设置应用程序的语言环境。
 * 初始化时从本地存储中获取语言设置，如果没有设置，则默认使用英文（Language.EN）。
 */
export const setupLanguage = () => {
    let locale = getLocale();
    locale.value = getLocalStorageLanguage() ?? Language.EN;
};

/**
 * 将指定的语言保存到本地存储中。
 * @param {Language} language - 要设置的语言，来自 Language 枚举。
 */
export const setLocalStorageLanguage = (language: Language) => {
    localStorage.setItem("language", language);
};

/**
 * 从本地存储中获取当前设置的语言。
 * @returns {string | null} 返回本地存储中的语言值，如果未设置则返回 null。
 */
export const getLocalStorageLanguage = () => {
    return localStorage.getItem("language");
};

/**
 * 获取当前的国际化语言环境对象。
 * @returns {import("vue-i18n").WritableComputedRef<string>} 返回一个可写的计算属性，表示当前语言环境。
 */
export const getLocale = () => {
    return useI18n().locale;
};

/**
 * 获取翻译函数，用于根据当前语言环境翻译文本。
 * @returns {import("vue-i18n").TranslateFunction} 返回一个翻译函数，用于翻译国际化文本。
 */
export const getT = () => {
    return useI18n().t;
};