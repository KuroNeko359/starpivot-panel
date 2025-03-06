<!--
  这是一个用于切换主题（亮色和暗色）的 Vue 3 组件。
  组件会根据 localStorage 中存储的主题信息来初始化主题，
  并提供一个开关按钮让用户可以随时切换主题。
-->

<script setup lang="ts">
import {ref, onMounted} from "vue";
import SunIcon from "@/components/icons/theme-controller-icon/SunIcon.vue";
import MoonIcon from "@/components/icons/theme-controller-icon/MoonIcon.vue";

/**
 * 响应式变量，用于存储当前主题模式。
 * false 表示亮色模式，true 表示暗色模式。
 */
const isDarkMode = ref(false);

/**
 * 生命周期钩子，在组件挂载后执行。
 * 调用 setTheme 函数来初始化主题。
 */
onMounted(() => {
  setTheme();
});

/**
 * 设置主题的函数。
 * 从 localStorage 中获取保存的主题信息，
 * 根据获取的信息设置 isDarkMode 的值和 body 元素的 data-theme 属性。
 */
const setTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkMode.value = true;
    document.body.setAttribute("data-theme", "dark");
  }
  if (savedTheme === "light") {
    isDarkMode.value = false;
    document.body.setAttribute("data-theme", "light");
  }
};

/**
 * 切换主题的函数。
 * 切换 isDarkMode 的值，更新 body 元素的 data-theme 属性，
 * 并将新的主题信息保存到 localStorage 中。
 */
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const newTheme = isDarkMode.value ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  console.log(`Theme changed to: ${newTheme}`);
};
</script>

<template>
  <!-- 自定义的主题切换开关 -->
  <label class="swap swap-rotate p-2">
    <!-- 隐藏的复选框，用于控制开关状态 -->
    <input
        type="checkbox"
        class="theme-controller"
        :checked="isDarkMode"
        @click="toggleTheme"
    />

    <!-- 太阳图标，代表亮色主题 -->
    <sun-icon></sun-icon>
    <!-- 月亮图标，代表暗色主题 -->
    <moon-icon></moon-icon>
  </label>
</template>


<style scoped>
</style>