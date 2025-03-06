<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isFullScreen = ref(true);

/**
 * 这个函数用于切换浏览器的全屏与最小化
 */
const toggleFullScreen = () => {
  if (!isFullScreen.value) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  toggleScreenStatus();
};

/**
 * 生命周期钩子，在组件挂载后执行。
 * 调用 setFullScreenStatus 函数来从保存的配置中切换网站的显示状态（全屏/非全屏）。
 */
onMounted(() => {
  isFullScreen.value = false;
});



/**
 * 切换全屏状态的函数。
 * 切换 isFullScreen 的值，
 * 并将新的全屏状态信息保存到 localStorage 中。
 */
const toggleScreenStatus = () => {
  isFullScreen.value = !isFullScreen.value;
  const newStatus = isFullScreen.value ? 'true' : 'false';
  localStorage.setItem('is-full-screen', newStatus);
  console.log(`FullScreen status changed to: ${newStatus}`);
};
</script>

<template>
  <label class="swap p-2" data-tip="Signal">
    <input type="checkbox" @click="toggleFullScreen" />

    <!-- 全屏图标 -->
    <svg class="swap-off h-10 w-10"
         width="25" stroke="currentColor" height="25" viewBox="0 0 48 48" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L16 15.8995" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 41.8995L16 32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.0001 41.8995L32.1006 32" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M41.8995 6L32 15.8995" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M33 6H42V15" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 33V42H33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 42H6V33" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 15V6H15" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <!-- 缩小图标 -->
    <svg class="swap-on h-10 w-10" stroke="currentColor" width="25" height="25" viewBox="0 0 48 48" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L16 15.8995" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 41.8995L16 32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.0001 41.8995L32.1006 32" stroke-width="4" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M41.8995 6L32 15.8995" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 7V16H41" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 7V16H7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 41V32H7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 41V32H40.8995" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </label>
</template>

<style scoped>
/* 你可以在这里添加样式 */
</style>