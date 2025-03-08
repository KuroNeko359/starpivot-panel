<script setup lang="ts">

import Card from "@/components/common/Card.vue";
import PrimaryButton from "@/components/common/button/PrimaryButton.vue";
import FileSystemPanel from "@/components/pages/file-system/FileSystemPanel.vue";
import Modal from "@/components/ui/modal/Modal.vue";
import upload from "@/components/pages/file-system/ts/upload.ts";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";

import FileSystemView from "./view/FileSystemView.vue";
import {getT} from "@/i18n/language-utils.ts";

const route = useRoute();

let filePath = ref<string>(route.query.path as string || '/');
console.log(filePath.value)
let t = getT();

</script>

<template>
  <!--  Page -> Panel -> -->

  <card :title="t('file-system')" class="w-full min-w-[50%]">

    <FileSystemPanel :path="filePath"></FileSystemPanel>

  </card>

<!--  <modal name="upload-file" title="上传文件">-->
<!--    <br>-->
<!--    <label class="input w-full">-->
<!--      Path-->
<!--      <input type="text" class="grow" placeholder="src/app/"/>-->
<!--      <span class="badge badge-neutral badge-xs">Optional</span>-->
<!--    </label>-->
<!--    <fieldset class="fieldset">-->
<!--      <input type="file" class="file-input w-full" @change="upload.handleFileChange"/>-->
<!--    </fieldset>-->
<!--    <primary-button @click="upload.uploadFile" title="Upload"></primary-button>-->
<!--  </modal>-->
<!--  &lt;!&ndash; The button to open modal &ndash;&gt;-->
<!--  <label for="my_modal_6" class="btn">open modal</label>-->

<!--  &lt;!&ndash; Put this part before </body> tag &ndash;&gt;-->
<!--  <input type="checkbox" id="my_modal_6" class="modal-toggle" />-->
<!--  <div class="modal" role="dialog">-->
<!--    <div class="modal-box">-->
<!--      <h3 class="text-lg font-bold">Hello!</h3>-->
<!--      <p class="py-4">This modal works with a hidden checkbox!</p>-->
<!--      <div class="modal-action">-->
<!--        <label for="my_modal_6" class="btn">Close!</label>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>

</style>