<script setup lang="ts">

let props = defineProps( {
  isShow: {
    type: Boolean,
    default: true
  },
  content: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: false,
  }
});

</script>

<template>
    <div
        role="alert"
        v-show="props.isShow"
        class="alert"
        :class="props.mode || ''"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-6 w-6 shrink-0"
          :class="props.mode ? 'stroke-current' : 'stroke-info'"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ props.content }}</span>
    </div>
</template>

<style scoped>

</style>