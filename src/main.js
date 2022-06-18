import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局导入vant
import Vant from 'vant';
// 懒加载
import { Lazyload } from 'vant';
import 'vant/lib/index.css';

createApp(App).use(store).use(router).use(Vant).use(Lazyload,{
    lazyComponent: true
}).mount('#app')
