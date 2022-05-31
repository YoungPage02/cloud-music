import axios from 'axios'
let service = axios.create({
  baseURL: 'https://cloud-music-api-black.vercel.app/',
  timeout: 1000
})
export default service