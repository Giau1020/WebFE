import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from './stores';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router/index';

const app = createApp(App);
app.use(pinia);
app.use(Antd);
app.use(router);
app.mount('#app');
