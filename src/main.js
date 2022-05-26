import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(store).use(router).use(Vant).mount('#app')
