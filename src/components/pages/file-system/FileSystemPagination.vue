<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';
import IconRight from "@/components/icons/pagination-icon/IconRight.vue";
import IconLeft from "@/components/icons/pagination-icon/IconLeft.vue";

const props = defineProps({
  paginationProps: {
    type: Object,
    required: true,
  },
});

/**
 * 定义更新当前页面的emit
 */
const emit = defineEmits<{
  (e: 'update:currentPage', pageNumber: number): void;
}>();

/**
 * 设置当前页面
 * @param pageNumber 新的页面编号
 */
const setCurrentPage = (pageNumber: number) => {
  emit('update:currentPage', pageNumber); // 发出事件来更新 currentPage
  console.log('pageNumber', pageNumber);
}

/**
 * 设置当前页面为旧的页面编号-1
 */
const addCurrentPage = () => {
  let currentPage = props.paginationProps.currentPage;
  if (currentPage < props.paginationProps.pageNumber) {
    setCurrentPage(currentPage + 1);
  }
}

/**
 * 设置当前页面为旧的页面编号+1
 */
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
    <button class="join-item btn p-2" @click="reduceCurrentPage">
      <icon-left></icon-left>
    </button>
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
    <button class="join-item btn p-2" @click="addCurrentPage">
      <icon-right></icon-right>
    </button>
  </div>
</template>

<style scoped>
</style>
