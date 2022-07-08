import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant';
// 请求拦截器
/* axios.interceptors.request.use((config) => {
  store.commit('loading',false)
  return config
}) */
// 响应拦截器
/* axios.interceptors.response.use((response) => {
  store.commit('loading',false)
  return response.data
}) */
let service = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://cloud-music-api-liard.vercel.app/',
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  store.commit('changeLoading',true)
  return config
})
// 响应拦截器
service.interceptors.response.use((res) => {
  store.commit('changeLoading',false)
  return res
})
export default service