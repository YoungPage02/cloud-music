import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局导入vant
import Vant from 'vant';
// 懒加载
import { Lazyload } from 'vant';
//Loading加载
import { Loading } from 'vant';
import 'vant/lib/index.css';

createApp(App).use(store).use(router).use(Vant).use(Loading).use(Lazyload,{
    lazyComponent: true,
    loading: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F691cd592bc5176b916e9a0771236d39627108ed8.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658199325&t=d4118b798c3a9db69e1845effcef3cc4',
    error: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F8c17a4498c9d6c73c9fff5e8b744ef67f32bcd65.png&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658199658&t=1816d3d46c1b83412816e6503ee13390'
}).mount('#app')
