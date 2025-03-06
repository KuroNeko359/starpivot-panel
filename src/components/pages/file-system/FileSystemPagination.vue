<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  paginationProps: {
    type: Object,
    required: true,
  },
});

// 定义update:currentPage事件
const emit = defineEmits<{
  (e: 'update:currentPage', pageNumber: number): void;
}>();

const setCurrentPage = (pageNumber: number) => {
  emit('update:currentPage', pageNumber); // 发出事件来更新 currentPage
  console.log('pageNumber', pageNumber);
}

const addCurrentPage = () => {
  let currentPage = props.paginationProps.currentPage;
  if (currentPage < props.paginationProps.pageNumber) {
    setCurrentPage(currentPage + 1);
  }
}

const reduceCurrentPage = () => {
  let currentPage = props.paginationProps.currentPage;
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
}
</script>

<template>
  <div class="join">
    <!-- 使用 v-for 来渲染分页按钮 -->
    <button class="join-item btn" @click="reduceCurrentPage">«</button>
    <button
        class="btn"
        v-for="i in props.paginationProps.pageNumber"
        :key="i"
        :class="{'btn-active': i === props.paginationProps.currentPage,
        // 'join-item': props.paginationProps.pageNumber > 1
        }"
        @click="setCurrentPage(i)"
    >
      {{ i }}
    </button>
    <button class="join-item btn" @click="addCurrentPage">»</button>
  </div>
</template>

<style scoped>
/* 你可以添加一些样式 */
</style>
