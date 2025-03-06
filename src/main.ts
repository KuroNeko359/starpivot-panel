import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import i18n from "@/i18n";
import {useI18n} from "vue-i18n";

let app = createApp(App);
let pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n)
app.mount('#app');
