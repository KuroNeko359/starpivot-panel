<!--
这个组件是一个通用的确认框
需要使用label的for属性控制modal的显示
-->

<script setup lang="ts">
let props = defineProps({
  // modal的id 用于label标签控制modal
  id: {
    type: String,
    required: true
  },
  // modal显示的标题
  title: {
    type: String,
    required: true
  },
  // modal显示的内容
  content: {
    type: String,
    required: true
  },
  // 回调函数 如果用户选择确认 那么则执行回调函数
  callback: {
    type: Function,
    required: true
  },
  refreshPageFunction: {
    type: Function,
    required: true
  }
});

/**
 * 确认事件
 * 如果用户点击确认 那么则执行回调函数
 */
const handleConfirm = () => {
  props.callback()
  props.refreshPageFunction()
}
</script>

<template>

  <input type="checkbox" :id="props.id" :ref="props.id" class="modal-toggle"/>
  <div class="modal" role="dialog">
    <div class="modal-box">
      <div>
        <p class="text-lg font-bold flex">{{ props.title }}</p>
      </div>
      <div>
        <p class="py-4 text-lg flex">{{ props.content }}</p>
      </div>
      <div class="modal-action">
        <label :for="props.id" class="btn">Cancel</label>
        <label :for="props.id" class="btn btn-primary"
               @click="handleConfirm">Confirm</label>
      </div>
    </div>
    <label class="modal-backdrop" :for="props.id"></label>
  </div>
</template>

<style scoped>

</style>