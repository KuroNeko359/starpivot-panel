<script setup lang="ts">

import ModalButton from "../ui/modal/ModalButton.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<template>
  {{ t('greeting') }}
<!--  <div class="drawer drawer-end">-->
<!--    <input id="my-drawer-4" type="checkbox" class="drawer-toggle"/>-->
<!--    <div class="drawer-content">-->
<!--      &lt;!&ndash; Page content here &ndash;&gt;-->
<!--      <label for="my-drawer-4" class="drawer-button btn btn-primary">Open drawer</label>-->
<!--    </div>-->
<!--    <div class="drawer-side">-->
<!--      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>-->
<!--      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">-->
<!--        &lt;!&ndash; Sidebar content here &ndash;&gt;-->
<!--        <li><a>Sidebar Item 1</a></li>-->
<!--        <li><a>Sidebar Item 2</a></li>-->
<!--        <li><a>Sidebar Item 1</a></li>-->
<!--        <li><a>Sidebar Item 2</a></li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
<!--  <modal-button name="system"></modal-button>-->
</template>

<style scoped>

</style>