<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IconMaximization from "@/components/icons/window-controller-icon/IconMaximization.vue";
import IconReduction from "@/components/icons/window-controller-icon/IconReduction.vue";

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
    <icon-maximization></icon-maximization>
    <!-- 缩小图标 -->
    <icon-reduction></icon-reduction>
  </label>
</template>

<style scoped>
/* 你可以在这里添加样式 */
</style>